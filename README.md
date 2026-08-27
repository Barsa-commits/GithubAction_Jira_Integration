# GITHUB ACTION DEMO

## Overview
This is a small word case converter sample built with an Angular client and a Node.js API.

It supports:
- Converting capital letters in a word or sentence into small letters
- Keeping already lowercase text unchanged

## Project Structure
```
GITHUB ACTION DEMO
├── client
│   └── src
│       ├── app.component.ts
│       ├── main.ts
│       └── styles.css
├── server
│   └── index.js
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd "Github Testing"
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
Install dependencies:
```
npm install
```

Start the Node.js API in one terminal:
```
npm run server
```

Start Angular in another terminal:
```
npm run client
```

Open `http://localhost:4200` in a browser. For example, `HELLO WORLD` becomes `hello world`. The Angular app sends conversion requests to `http://localhost:3001/api/convert`.

## Contributing
Feel free to submit issues and pull requests for any improvements or bug fixes.

## License
This project is licensed under the MIT License.