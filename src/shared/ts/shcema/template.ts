export class TemplateSchema {
  static empty (): TemplateSchema.Object {
    return {
      id: "",
      title: "",
      shopId: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export namespace TemplateSchema {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    title: string;
    content: string;
    shopId: string;
    createdAt: Date;
    updatedAt: Date;
  }

}
