const uuid = require("uuid");

class BaseExpression {
  default_number_regex = /{{\s*number_[0-9]+\s*}}/g;
  default_string_regex = /{{\s*string_[0-9]+\s*}}/g;
  default_alpha_number_regex = /{{\s*alpha_number_[0-9]+\s*}}/g;
  default_uuid_regex = /{{\s*uuid\s*}}/g;

  constructor(complete_expression) {
    this.complete_expression = complete_expression;
    this.setParsedToEmpty();
    this.setRegex();
  }

  setParsedToEmpty() {
    this.strings = [];
    this.numbers = [];
    this.alphaNumbers = [];
    this.uuids = [];
  }

  setRegex(number_regex, string_regex, alpha_number_regex, uuid_regex) {
    this.number_regex = number_regex;
    this.string_regex = string_regex;
    this.alpha_number_regex = alpha_number_regex;
    this.uuid_regex = uuid_regex;
    if (!number_regex) {
      this.number_regex = this.default_number_regex;
    }
    if (!string_regex) {
      this.string_regex = this.default_string_regex;
    }
    if (!alpha_number_regex) {
      this.alpha_number_regex = this.default_alpha_number_regex;
    }
    if (!uuid_regex) {
      this.uuid_regex = this.default_uuid_regex;
    }
  }

  parse() {
    this.numbers = this.complete_expression.match(this.number_regex);
    if (!this.numbers) this.numbers = [];
    this.strings = this.complete_expression.match(this.string_regex);
    if (!this.strings) this.strings = [];
    this.alphaNumbers = this.complete_expression.match(this.alpha_number_regex);
    if (!this.alphaNumbers) this.alphaNumbers = [];
    this.uuids = this.complete_expression.match(this.uuid_regex);
    if (!this.uuids) this.uuids = [];
  }

  get _numbers() {
    return this.numbers;
  }

  get _strings() {
    return this.strings;
  }

  get _alphaNumbers() {
    return this.alphaNumbers;
  }

  get _uuids() {
    return this.uuids;
  }

  printParsed() {
    console.log(`numbers: ${this.numbers}`);
    console.log(`strings: ${this.strings}`);
    console.log(`alphaNumbers: ${this.alphaNumbers}`);
    console.log(`uuids: ${this.uuids}`);
  }
}

class Expression extends BaseExpression {
  // defaults
  default_number_get_regex = /[0-9]+/g;

  default_lower_bound_char_char = "A";
  default_lower_bound_char_number = 65;
  default_upper_bound_char_char = "Z";
  // 65 + 26 -1
  default_upper_bound_char_number = 90;

  constructor(expression) {
    super(expression);
    this.finalExpression = null;
    // to override if wanted
    // this.number_regex = /{{\s*num_[0-9]+\s*}}/g;
    this.parse();
  }

  getCountValue(parsedExpression) {
    var defaultCount = 0;
    try {
      let countVal = 0;

      let counts = parsedExpression.match(this.default_number_get_regex);
      if (!counts.length) {
        return defaultCount;
      }
      countVal = counts[0];
      countVal = parseInt(countVal);

      return countVal;
    } catch (err) {
      console.error(err);
      return defaultCount;
    }
  }

  setCharBoundsFromChars(lowerBoundChar, upperBoundChar) {
    this.lowerBoundChar = lowerBoundChar;
    this.upperBoundChar = upperBoundChar;
    if (!lowerBoundChar) {
      this.lowerBoundChar = this.default_lower_bound_char_char;
    }
    if (!upperBoundChar) {
      this.upperBoundChar = this.default_upper_bound_char_char;
    }
  }

  getUuid() {
    return uuid.v4();
  }

  getAlphaNumber(numOfChars) {
    var alphaNum = "";
    for (let i = 0; i < numOfChars; i++) {
      let char = this.getNumberOrCharacterRandom();
      alphaNum += char;
    }
    return alphaNum;
  }

  getNumberOrCharacterRandom() {
    let random = this.getRandomNumber(0, 2); // gets 1 or 0 (2 is not included in the call)
    if (random) {
      return this.getRandomNumber();
    } else {
      return this.getRandomChar(this.lowerBoundChar, this.upperBoundChar);
    }
  }

  getNumber(numOfDigits) {
    var number = "";
    for (let i = 0; i < numOfDigits; i++) {
      let num = this.getRandomNumber();
      // console.log(`num: ${num}`);
      num = num.toString();
      number += num;
    }
    if (number) {
      number = parseInt(number);
    } else {
      number = null;
    }

    return number;
  }

  getString(numOfChars) {
    var string = "";
    for (let i = 0; i < numOfChars; i++) {
      let char = this.getRandomChar(this.lowerBoundChar, this.upperBoundChar);
      // console.log(`char: ${char}`);
      string += char;
    }
    if (string.trim()) {
      return string;
    } else {
      return null;
    }
  }

  getRandomChar(min = "A", max = "Z") {
    let min_num = min.charCodeAt(0); //65
    let max_num = max.charCodeAt(0); //90
    let random_num_in_range = this.getRandomNumber(min_num, max_num + 1);
    // console.log(`random_num_in_range: ${random_num_in_range}`);
    let random_char = String.fromCharCode(random_num_in_range);

    return random_char;
  }

  getRandomNumber(min = 1, max = 10) {
    // return Math.floor(Math.random() * 9 + 1);
    // random between 1 and 10
    // between min and max where min is included

    let num = Math.random() * (max - min) + min;
    return Math.floor(num);
  }
}

class IdGenerator extends Expression {
  constructor(expression) {
    super(expression);

    this.setCharBoundsFromChars("A", "D");
  }

  getFinalExpression() {
    var finalExpression = this.complete_expression;

    if (this.numbers.length) {
      for (let i = 0; i < this.numbers.length; i++) {
        let numberExpression = this.numbers[i];
        let count = this.getCountValue(numberExpression);
        let numberValue = this.getNumber(count);
        finalExpression = finalExpression.replace(
          numberExpression,
          numberValue
        );
      }
    }

    if (this.strings.length) {
      for (let i = 0; i < this.strings.length; i++) {
        let stringExpression = this.strings[i];
        let count = this.getCountValue(stringExpression);
        let stringValue = this.getString(count);
        finalExpression = finalExpression.replace(
          stringExpression,
          stringValue
        );
      }
    }

    if (this.alphaNumbers.length) {
      for (let i = 0; i < this.alphaNumbers.length; i++) {
        let alphaNumberExpression = this.alphaNumbers[i];
        let count = this.getCountValue(alphaNumberExpression);
        let alphaNumberValue = this.getAlphaNumber(count);
        finalExpression = finalExpression.replace(
          alphaNumberExpression,
          alphaNumberValue
        );
      }
    }

    if (this.uuids.length) {
      for (let i = 0; i < this.uuids.length; i++) {
        let uuidExpression = this.uuids[i];
        let uuidValue = this.getUuid();
        finalExpression = finalExpression.replace(uuidExpression, uuidValue);
      }
    }

    this.finalExpression = finalExpression;

    return this.finalExpression;
  }
}

module.exports = {
  Expression,
  IdGenerator,
};
