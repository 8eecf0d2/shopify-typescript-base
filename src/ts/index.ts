export class Foo implements Foo {
  public bar() {
    return "baz";
  }
}

export namespace Foo {
  export type bar = () => string;
}
export interface Foo {
  bar: Foo.bar;
}

const foo = new Foo();
foo.bar();
