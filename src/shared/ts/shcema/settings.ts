export class SettingsSchema {
  static empty (): SettingsSchema.Object {
    return {
      id: "",
      name: "",
      purpose: "",
      endpoint: "",
      frequency: 0,
      mappings: [],
    };
  }
}

export namespace SettingsSchema {
  export namespace Mapping {
    export type external = string;
    export type internal = "title" | "price" | "currency" | "description" | "images" | string;
  }
  export interface Mapping {
    external: SettingsSchema.Mapping.external;
    internal: SettingsSchema.Mapping.internal;
  }
  export interface Object {
    id: string;
    name: string;
    purpose: string;
    endpoint: string;
    frequency: number;
    mappings: SettingsSchema.Mapping[];
  }
}
