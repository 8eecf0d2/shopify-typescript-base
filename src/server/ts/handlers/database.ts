import { LogModel } from '../../../shared/ts/model';
import { Handler } from './';

export const FindLog: Handler<DatabaseFindLogRequest, DatabaseFindResponse> = async (context) => {
  // TODO: db stuffs

  return {
    ...context,
    reponse: {
      data: [],
      code: 200
    }
  }
}

export interface DatabaseFindLogRequest extends Handler.Request {
  foo: string;
}

export interface DatabaseFindResponse extends Handler.Response {
  data: LogModel[];
}

export interface DatabaseFindRequest extends Handler.Request {
  model: 'log'|'user';
  id?: string;
}

export interface DatabaseFindResponse extends Handler.Response {

}
