<h1 align="center">shopify-typescript-base</h1>

<p align="center"><img src="https://img.shields.io/badge/badge-yup-brightgreen.svg" title="badge good"></p>
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

Start server
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
5. Copy `.env.example` to `.env` and set the `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET` to those of your **Shopify App**.

#### Shopify Development Store

1. Create a new **Development Store** from the partner dashboard
2. Copy the store's **URL** from the Development Store dashboard (eg, `test-shop.myshopify.com`).
3. Visit `https://localhost:2443/shopify/install?shop=test-shop.myshopify.com` and follow OAuth flow.

#### Caveats

You cannot view your app within the Shopify dashboard using `localhost` as the server due to CSP violations, to resolve this you must publicly expose your server, I'd recommend using [localtunnel](https://github.com/localtunnel/localtunnel) - afterwards update the `.env` file and **Shopify App** to match the public URL.

### Services

| Service           | Endpoint      |
| ----------------- | ------------- |
| Shopify App       | [`http://localhost:2443/shopify`](http://localhost:2443/shopify) |
| Shopify Install   | [`http://localhost:2443/shopify/install?shop=<shopify_store_url>`](http://localhost:2443/shopify/install?shop=<shopify_store_url>) |
| Shopify Callback  | [`http://localhost:2443/shopify/callback`](http://localhost:2443/shopify/callback) |
| Shopify API Proxy | [`http://localhost:2443/api/shopify`](http://localhost:2443/api/shopify) |
| API Endpoint      | [`http://localhost:2443/api`](http://localhost:2443/api) |
