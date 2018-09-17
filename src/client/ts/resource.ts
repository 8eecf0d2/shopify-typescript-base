export class Resource<RequestType = {}, ResponseType = any> {
  private static cache: { [key: string]: any } = {};
  public static baseURL = `${process.env.API_PROTOCOL}://${process.env.API_ADDRESS}:${process.env.API_PORT}`;

  constructor (
    public options: Resource.Options<RequestType>,
  ) {}

  public async query (payload: RequestType): Promise<ResponseType> {
    const url = new URL(`${Resource.baseURL}${this.options.path}`);

    const key = JSON.stringify({ url: url, options: this.options });

    if(Resource.cache[key]) {
      return Resource.cache[key];
    }

    const fetchQuery = await fetch(url.href, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    try {
      Resource.cache[key] = await fetchQuery.json();
    } catch (error) {
      Resource.cache[key] = {}
    }

    if (fetchQuery.status < 200 || fetchQuery.status > 299) {
      throw Resource.cache[key];
    }

    return Resource.cache[key];
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
    find: new Resource<{ schema: string, query?: any }>({
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
