export class SettingsModel {
  public id: string;
  public name: string;
  public purpose: string;
  public endpoint: string;
  public frequency: number;
  public mappings: SettingsModel.Mapping[];

  constructor(
    public raw: SettingsModel.Object,
  ) {
    Object.assign(this, raw);
  }

  public toObject(): SettingsModel.Object {
    return {
      id: this.id,
      name: this.name,
      purpose: this.purpose,
      endpoint: this.endpoint,
      frequency: this.frequency,
      mappings: this.mappings,
    }
  }

  static empty(): SettingsModel {
    return new SettingsModel({
      id: "",
      name: "",
      purpose: "",
      endpoint: "",
      frequency: 0,
      mappings: [],
    })
  }
}

export namespace SettingsModel {
  export namespace Mapping {
    export type external = string;
    export type internal = "title" | "price" | "currency" | "description" | "images" | string;
  }
  export interface Mapping {
    external: SettingsModel.Mapping.external;
    internal: SettingsModel.Mapping.internal;
  }
  export interface Object {
    id: string;
    name: string;
    purpose: string;
    endpoint: string;
    frequency: number;
    mappings: SettingsModel.Mapping[];
  }
}
