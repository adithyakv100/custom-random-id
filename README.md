# custom-random-id

A highly customizable JavaScript library that generates random IDs based on the required format. It uses the `{{id_specification}}` format to generate the kind of ID with varying length number or string or alpha-numeric string

> Solves the problem of writing custom algorithms for generating random IDs of numbers or strings or alpha-numeric string. You can even generate a random phone number like `+1-541-754-3010` or random anything in your desired format!

## Installation

`npm install custom-random-id`

- **Small in size.**
- **Fast.** Better performance than most of the other ID generators.
- **URL safe characters.** it uses only URL safe characters as it uses only numbers or capital letters or uuids to generate the IDs.
- **Client & Server.** Can be used in client side and server side JavaScript applications.

## Usage

```javascript
const { IdGenerator } = require("custom-random-id");
// To generate a 5 digit random number
const ID = new IdGenerator("{{ number_5 }}");
let id = ID.getFinalExpression();
console.log(id); // => 56412

// To generate a 10 character random string
const ID = new IdGenerator("{{ string_10 }}");
let id = ID.getFinalExpression(); // => HYIOMNTRSJ

// To generate a 8 character random alpha numeric
const ID = new IdGenerator("{{ alpha_number_10 }}");
let id = ID.getFinalExpression(); // => JU78BH98

// To generate a uuid
const ID = new IdGenerator("{{ uuid }}");
let id = ID.getFinalExpression(); // => 5bc787b8-00ac-49ea-a970-2fca9ec737af
```

## Format

> Format: `"{{ type_count }}"` where `type` and `count` are 2 separate entities. The whole expression has to be provided in string format only. Eg: `"{{ number_10 }}"`

- **type**

  - **string:** Generates a string of the specified length.
  - **number:** Generates a number (integer) of a specified length.
  - **alpha_number:** Generates an alpha-numeric string (string of numbers and characters in caps) of a specified length.
  - **uuid:** Generates an uuid.

- **count:** An integer number for the number of digits/characters to be present in the generated string.

##### Examples:

```javascript
"{{ string_10 }}";
// output: VVMTINCMBC
```

```javascript
"{{ string_50 }}";
// output: OTXITFCVIPNFTIERWXPOURNUSMDOFPCAUHJBIVZFWPEQWTMMPW
```

```javascript
"{{ string_1 }}";
// output: K
// Single random Char
```

```javascript
"{{ number_15 }}";
// output: 234112942672429
```

```javascript
"{{ number_1 }}";
// output: 4
// This can be used to get a single random number
```

```javascript
"{{ alpha_number_10 }}";
// output: KHT5N52J36
// To get a string having upper case characters and integer numbers
```

```javascript
"{{ alpha_number_10 }}";
// output: KHT5N52J36
// To get a string having upper case characters and integer numbers
```

```javascript
"{{ uuid }}";
// output: 43a629cf-661b-4d4c-b66e-16e6714f8732
// To get an unique string every time.
```

### Creative Usage

Unlock your creativity by using the custom-random-id generator to generate strings of any required format by using multiple expressions in a string.

###### Generate an American Phone number

```javascript
"+1 {{number_3}}-{{number_3}}-{{number_4}}";
// output: +1 941-626-2929
```

###### Generate phone numbers starting with only '7'

```javascript
"+1 7{{number_2}}-{{number_3}}-{{number_4}}";
// output: +1 785-587-6616
```

###### Generate a string with 5 characters in the start and 5 numbers in the end

```javascript
"{{string_5}}{{number_5}}";
// output: LPDZW86423
```

###### Generate a string like a gun name

```javascript
"AK-{{number_2}}";
// output: AK-35
// output: AK-87
// output: AK-47
// .. etc
```

###### Generate a string with alternating character, number of length 5

```javascript
"{{string_1}}{{number_1}}{{string_1}}{{number_1}}{{string_1}}";
// output: X9K5L
// output: E6S4W
```

###### Or any random combination like

```javascript
"{{uuid}}---{{number_5}}---{{string_10}}";
// output: c1ed245a-18cb-4e8b-ad2f-db67f8fa4e09---68864---ULXCAKACQE
```
