import { LogModel } from '../../../shared/ts/model';
import { Handler } from './';

export const FindLog: Handler<DatabaseFindLogRequest, DatabaseFindLogResponse> = async (context) => {
  // TODO: db stuffs

  if(1 === 1) {
    throw new Handler.Error({ foo: 'bar' }, 411);
  }

  return {
    ...context,
    code: 200,
    response: {
      items: []
    },
  };
}

export interface DatabaseFindLogRequest extends Handler.Request {
  foo: string;
}

export interface DatabaseFindLogResponse extends Handler.Response {
  items: LogModel[];
}
