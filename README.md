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

Create SSL certificates (`localhost`)
```bash
yarn run certificates
```

Run server
```bash
yarn run start
```

Monitor server (`nodemon`)
```bash
yarn run monitor
```

Additional scripts exist for targeting client and server
```bash
yarn run build:client
yarn run build:server

yarn run watch:client
yarn run watch:server
```

Top level scripts support `:dev` or `:prod` environment modifiers
```bash
yarn run build<:env>

yarn run watch<:env>

yarn run start<:env>

yarn run monitor<:env>
```

### Shopify Setup

#### Shopify Partner

1. Create a **Shopify Partner** account at [partners.shopify.com](https://partners.shopify.com/)

#### Shopify App

1. Create a new **App** from the partner dashboard
2. Set the **App Url** to `https://localhost:2443/shopify`
3. Ensure the **Areas** are set to `Shopify Admin`
4. Add the **whitelist** to `https://localhost:2443/shopify/callback`

#### Shopify Development Store

1. Create a new **Development Store** from the partner dashboard
2. Copy the store's **URL** from the Development Store dashboard (eg, `test-shop.myshopify.com`).
3. Visit `https://localhost:2443/shopify/install?shop=test-shop.myshopify.com` and follow OAuth flow.

### Services

| Service           | Endpoint      |
| ----------------- | ------------- |
| Shopify App       | [`http://localhost:2443/shopify`](http://localhost:2443/shopify) |
| Shopify Install   | [`http://localhost:2443/shopify/install?shop=<shopify_store_url>`](http://localhost:2443/shopify/install?shop=<shopify_store_url>) |
| Shopify Callback  | [`http://localhost:2443/shopify/callback`](http://localhost:2443/shopify/callback) |
| Shopify API Proxy | [`http://localhost:2443/api/shopify`](http://localhost:2443/api/shopify) |
| API Endpoint      | [`http://localhost:2443/api`](http://localhost:2443/api) |
