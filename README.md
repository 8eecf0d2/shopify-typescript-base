<h1 align="center">shopify-typescript-base</h1>

<p align="center">Simple Shopify App foundation written in Typescript</p>

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

Top level scripts support `:dev` or `:prod` environment modifiers
```bash
yarn run build<:env>
yarn run build:client
yarn run build:server

yarn run watch<:env>
yarn run watch:client
yarn run watch:server

yarn run start<:env>

yarn run monitor<:env>
```

| Service           | Endpoint      |
| ----------------- | ------------- |
| Shopify App       | [`http://localhost:2010/shopify`](http://localhost:2010/shopify) |
| Shopify Install   | [`http://localhost:2010/shopify/install?shop=<shopify_store_url>`](http://localhost:2010/shopify/install?shop=<shopify_store_url>) |
| Shopify Callback  | [`http://localhost:2010/shopify/callback`](http://localhost:2010/shopify/callback) |
| Shopify API Proxy | [`http://localhost:2010/api/shopify`](http://localhost:2010/api/shopify) |
| API Endpoint      | [`http://localhost:2010/api`](http://localhost:2010/api) |
