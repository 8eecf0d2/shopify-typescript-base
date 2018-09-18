import * as dynamoose from "dynamoose";
import * as models from "./model";

export class Database {

  constructor() {
    console.log({
      accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
      secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
      region: process.env.AWS_REGION,
    });
    dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
      secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
      region: process.env.AWS_REGION,
    });
    dynamoose.setDefaults({
      create: true,
      prefix: process.env.STAGE,
    });
  }

  public template = models.TemplateModel;
}
