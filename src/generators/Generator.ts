export abstract class Generator<T> {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract generate(runkey: string, ...other: any[]): T;
}
