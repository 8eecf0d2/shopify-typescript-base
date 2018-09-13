import { Handler } from "./handler";

export const ShopifySessionCheck: Handler = (context) => {
  return Promise.resolve({
    ...context,
    session: {
      ...context.session,
      authenticated: true,
    }
  })
}
