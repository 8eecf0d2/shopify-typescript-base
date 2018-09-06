export class Fetcher<RequestType = any, ResponseType = any> {
  private request: Request;

  constructor(
    public options: Fetcher.Options,
  ) {

    const init = Object.assign({
      mode: 'cors',
      cache: 'default',
    }, this.options);

    this.request = new Request(this.options.path, init);
  }

  public exec(request?: RequestType): Promise<ResponseType> {
    return fetch(this.request)
      .then(response => {
        return response.json()
      })
  }
}

export namespace Fetcher {
  export type Method = "GET"|"POST";
  export type Path = string;
  export interface Options extends RequestInit {
    method: Fetcher.Method,
    path: Fetcher.Path,
  }
}
