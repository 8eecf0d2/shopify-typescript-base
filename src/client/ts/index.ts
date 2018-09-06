import { App } from "./app";
import { Fetcher } from "./fetcher";

App.start();

const fetcher = new Fetcher({
  method: 'GET',
  path: '/api/database/find/log',
});

fetcher.exec()
  .then(json => {
    console.log(json)
  })
