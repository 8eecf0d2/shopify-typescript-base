import * as dynamoose from "dynamoose";

const TemplateDynamoSchema = new dynamoose.Schema({
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

export const TemplateModel = dynamoose.model("template", TemplateDynamoSchema);
