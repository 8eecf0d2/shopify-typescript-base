export class Resource<RequestType = any, ResponseType = any> {
  static cache: { [key: string]: any } = {};
  private request: Request;

  constructor(
    public options: Resource.Options,
  ) {
    const requestInit = Object.assign({
      method: "POST",
      mode: "cors",
      cache: "default",
    }, this.options);

    this.request = new Request(this.options.path, requestInit);
  }

  public handler(payload?: RequestType, options?: Resource.Options): Promise<Resource.HttpResponse> {
    const requestInit = Object.assign({}, { body: JSON.stringify(payload) }, options);
    if(payload) {
      requestInit.headers = {
        ...requestInit.headers,
        "Content-Type": "application/json"
      }
    }
    const key = JSON.stringify({ request: this.request, options: requestInit });
    if(Resource.cache[key]) {
      console.log(`[cache]: ${key}`, Resource.cache[key])
      return Resource.cache[key];
    }
    return fetch(this.request, requestInit)
      .then(async response => {
        try {
          const data = { response: response, data: await response.json() };
          Resource.cache[key] = data;
          if(response.ok) {
            return data
          } else {
            throw data
          }
        } catch(error) {
          console.error(error)
          if(response.ok) {
            return { response: response, error: error, data: undefined }
          } else {
            throw { response: response, error: error, data: undefined }
          }
        }
      });
  }
}

export namespace Resource {
  export type Method = "GET"|"POST";
  export type Path = string;
  export interface Options extends RequestInit {
    method?: Resource.Method,
    path: Resource.Path,
  }
  export interface HttpResponse {
    response: Response;
    data: any;
  }
}

export const resource = {
  database: {
    find: new Resource<{ model: string, query?: any }>({
      path: "/api/database/find"
    })
  },
  shopify: new Resource<{ path: string, method: string, payload?: any }>({
    path: "/api/shopify/proxy"
  })
}
