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
├── angular.json
├── proxy.conf.json
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

### Production / deployed (single origin)
Build the Angular client, then start the server — it serves both the UI and the API on one port:
```
npm install
npm run build
npm start
```
Open `http://<server-host>:3001`. The port and bind address are configurable:
```
PORT=8080 HOST=0.0.0.0 npm start
```
The client calls the API using the relative path `/api/convert`, so it always talks to whatever
host/port it was served from. No server IP is hardcoded in the frontend.

### Local development (two terminals)
Start the Node.js API in one terminal:
```
npm run server
```

Start Angular in another terminal:
```
npm run client
```

Open `http://localhost:4200` in a browser. For example, `HELLO WORLD` becomes `hello world`.
`ng serve` proxies `/api` to `http://localhost:3001` via `proxy.conf.json`.

## Contributing
Feel free to submit issues and pull requests for any improvements or bug fixes.

## License
This project is licensed under the MIT License.