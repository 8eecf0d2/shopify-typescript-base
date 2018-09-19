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

  public static empty (): TemplateInterface {
    return {
      id: "",
      title: "",
      shop: "",
      content: "",
      default: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public static async query (search: any, attributes?: any): Promise<TemplateInterface[]> {
    //@ts-ignore
    const result: TemplateInterface[] = await TemplateModel.model.scan(search).attributes(attributes).all().exec();

    return result;
  }

  public static async save (template: TemplateInterface): Promise<Boolean> {
    const exists = (await TemplateModel.query({ id: { eq: template.id } }))[0];

    if(exists) {
      return TemplateModel.create(template);
    } else {
      return TemplateModel.update(template);
    }
  }

  public static async create (template: TemplateInterface): Promise<Boolean> {
    try {
      await TemplateModel.model.create(template);
    } catch (error) {
      throw error;
    }

    return true;
  }

  public static async update (template: TemplateInterface): Promise<Boolean> {
    try {
      await TemplateModel.model.update({ id: template.id }, template);
    } catch (error) {
      throw error;
    }

    return true;
  }

  public static async remove (id: string): Promise<boolean> {
    return true;
  }
}

export interface TemplateInterface {
  id: string;
  title: string;
  content: string;
  shop: string;
  default: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
