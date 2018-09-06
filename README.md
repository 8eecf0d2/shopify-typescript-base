<h1 align="center">shopify-product-sync</h1>

<p align="center">Shopify product sync utility written in Typescript.</p>

### Usage

Install dependencies
```bash
yarn
```

Build source files
```bash
yarn run build
```

Watch source files
```bash
yarn run watch
```

Run server
```bash
yarn run start
```

Monitor server (`nodemon`)
```bash
yarn run monitor
```

Top level scripts use `:dev` or `:prod` environment modifiers for scripts
```bash
yarn run build:<env>
yarn run build:client
yarn run build:server

yarn run watch:<env>
yarn run watch:client
yarn run watch:server

yarn run start:<env>

yarn run monitor:<env>
```

| Service      | Endpoint      |
| ------------ | ------------- |
| Shopify App  | [`http://localhost:2010/shopify`](http://localhost:2010/shopify) |
| API Endpoint | [`http://localhost:2010/api`](http://localhost:2010/api) |
