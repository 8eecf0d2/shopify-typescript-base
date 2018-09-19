import { TemplateSchema } from "../shcema";
import * as dynamoose from "dynamoose";

export class TemplateModel {
  public static schema = new dynamoose.Schema({
    id: {
      type: String,
      validate: (v: string) => v.length === 36,
      hashKey: true,
    },
    title: {
      type: String,
    },
    shop: {
      type: String,
    },
    content: {
      type: String,
    },
    default: {
      type: Boolean,
    },
  },{
    timestamps: true,
  });

  public static model = dynamoose.model("template", TemplateModel.schema);

  public static async query (search: any, attributes?: any): Promise<TemplateSchema[]> {
    const result = await TemplateModel.model.scan(search).attributes(attributes).all().exec();

    return result;
  }

  public static async save (template: TemplateSchema.Object): Promise<TemplateSchema> {
    const exists = (await TemplateModel.query({ id: { eq: template.id } }))[0];

    if(exists) {
      return TemplateModel.create(template);
    } else {
      return TemplateModel.update(template);
    }
  }

  public static async create (template: TemplateSchema.Object): Promise<TemplateSchema> {
    const result = await TemplateModel.model.create(template);

    return result;
  }

  public static async update (template: TemplateSchema.Object): Promise<TemplateSchema> {
    const result = await TemplateModel.model.update({ id: template.id }, template);

    return result;
  }

  public static async remove (id: string): Promise<boolean> {
    return true;
  }
}
