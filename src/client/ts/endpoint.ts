import { Fetcher } from "./fetcher";

export const endpoints = {
  database: {
    find: {
      log: new Fetcher({ method: 'GET', path: '/api/database/find/log' }),
      product: new Fetcher({ method: 'GET', path: '/api/database/find/product' }),
    }
  }
}
