<h1 align="center">🚧 shopify-typescript-base 🚧</h1>

<p align="center"><img src="https://img.shields.io/badge/badge-yup-brightgreen.svg" title="badge good"></p>
<p align="center">Simple Shopify App foundation written in Typescript</p>

### Usage

Install dependencies
```bash
yarn install
```

Create SSL certificates (`localhost`)
```bash
yarn run certs
```

Build source files
```bash
yarn run build<?:server|client>
```

Watch source files
```bash
yarn run watch<?:server|client>
```

Monitor source files (_build, execute, watch, repeat_)
```bash
yarn run monitor<:server|client>
```

### Shopify Setup

#### Shopify Partner

1. Create a **Shopify Partner** account at [partners.shopify.com](https://partners.shopify.com/)

#### Shopify App

1. Create a new **App** from the partner dashboard
2. Set the **App Url** to `https://localhost:2443/shopify`
3. Ensure the **Areas** are set to `Shopify Admin`
4. Update the **whitelist** to include `https://localhost:2443/shopify/callback`
5. Copy `.env.example` to `.env` and set the `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET` to those of your **Shopify App**

#### Shopify Development Store

1. Create a new **Development Store** from the partner dashboard
2. Copy the store's **URL** from the Development Store dashboard (eg, `test-shop.myshopify.com`)
3. Visit `https://localhost:2443/shopify/install?shop=test-shop.myshopify.com` and follow OAuth flow

#### Caveats

You cannot view your app within the Shopify dashboard using `localhost` as the server due to CSP violations, to resolve this you must publicly expose your server, I'd recommend using [localtunnel](https://github.com/localtunnel/localtunnel) - afterwards update the `.env` file and **Shopify App** to match the public URL.

### Notable Services

| Service           | Endpoint      |
| ----------------- | ------------- |
| Shopify App       | [`https://localhost:1443/shopify`](http://localhost:2443/shopify) |
| Shopify Proxy     | [`https://localhost:2443/api/shopify`](http://localhost:2443/api/shopify) |

### Development

* Try and develop on `localhost` as much as possible, loading Shopify on each change is incredibly exhausting.
* Running `yarn run mointor:client` and `yarn run monitor:server` should provide a couple hundred ms feedback loop, rebuilds and restarts are code-flow specific so changing the `client` won't rebuild / restart the `server`. It's actually pretty neat 🍻
* Again, don't cut your legs off by hard requiring Shopify Embedded features, the reload times are horrific.
* Keep dependencies to an absolute minimum, with my very best _webpack-fu_ `@shopify/polaris` is `480kb`.. and thats before you add `react` and friends 😨
