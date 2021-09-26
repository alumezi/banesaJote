##Production
https://banesajote.herokuapp.com/

# Setup

## Available Scripts

Set up development env

### `npm install`

Start dev server

### `npm start`

Start backend

### `json-server --watch db.json`

## Important links

- [Follow this guide to setup style linting for tailwind](https://stackoverflow.com/a/63784195/7525907)
- [Learn how to use json-server](https://www.npmjs.com/package/json-server)

## VSCode Extensions needed

- ESLint - dbaeumer.vscode-eslint
- Stylelint - stylelint.vscode-stylelint
- Prettier - esbenp.prettier-vscode
- Prettier ESLint - rvest.vs-code-prettier-eslint
- Tailwind CSS IntelliSense - bradlc.vscode-tailwindcss
- REST Client - humao.rest-client (optional, you can also use postman)

## Software documentation

**lib** -
_is a folder where we add self-contained components that we can use in other components and in other projects,
we plan to extract this as a library in the future for quickly developing other projects._

**Plan**
-Lib builds subcomponents. Subcomponents build components. Components build pages.
