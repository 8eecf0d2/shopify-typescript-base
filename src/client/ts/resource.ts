export class Resource<RequestType = {}, ResponseType = any> {
  public static baseURL = `${process.env.API_PROTOCOL}://${process.env.API_ADDRESS}:${process.env.API_PORT}`;

  constructor (
    public options: Resource.Options<RequestType>,
  ) {}

  public async query (payload: RequestType): Promise<ResponseType> {
    const url = new URL(`${Resource.baseURL}${this.options.path}`);

    const key = JSON.stringify({ url: url, options: this.options });

    const fetchQuery = await fetch(url.href, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let response: ResponseType;
    try {
      response = await fetchQuery.json();
    } catch (error) {
      response = null;
    }

    if (fetchQuery.status < 200 || fetchQuery.status > 299) {
      throw response;
    }

    return response;
  }
}

export namespace Resource {
  export type Path = string;
  export interface Options<RequestType = any> extends RequestInit {
    path: Resource.Path;
  }
}

export const resource = {
  database: {
    find: new Resource<{ schema: string, search?: any }>({
      path: "/api/database/find"
    }),
    save: new Resource<{ schema: string, data: any }>({
      path: "/api/database/save"
    })
  },
  shopify: new Resource<{ path: string, method: string, payload?: any }>({
    path: "/api/shopify/proxy"
  })
}
