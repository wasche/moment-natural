# moment.natural

A moment.js plugin to parse natural language date/time strings.

## Installation

Install using [npm](https://www.npmjs.org/) for node.js:
```
npm install --save moment-natural
```

## Usage

```javascript
var date = moment.natural('noon yesterday');

date.natural('-1 week');
```

### Supported terms

* yesterday / tomorrow
* midnight / noon
* 3pm / 8a
* 2:30p / 14:30
* 1 hour ago / 3 minutes ago
* -1h / -4d

## License

MIT