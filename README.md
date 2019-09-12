# JSON Populate

JSON Populate is a Figma plugin that allows you to link to a JSON file to use it and replace text layers of your Figma document with actual data.

## Installation

Installing the plugin can be done through Figma's Plugin store. To run the code you have to run `npm install` first and make sure you have [TypeScript](https://www.typescriptlang.org/) installed globally on your machine. Then to run the plugin:

```bash
npm run start
npm run scss
```

## Usage

Your JSON should use the following structure:

```javascript

{
   "categoryA": ["itemA", "itemB"],
   "categoryB": ["itemC", "itemD"]
}
```

## Roadmap
* Better documentation
* More error handeling
* Support for more JSON structures
* Use local JSON/Paste JSON

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

