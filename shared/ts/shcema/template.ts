export class TemplateSchema {
  static empty (): TemplateSchema.Object {
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
}

export namespace TemplateSchema {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    title: string;
    content: string;
    shop: string;
    default: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}
