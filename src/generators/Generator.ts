/**
 * A generic generator class. This is the building block for classes like {@link StyleGenerator}.
 *
 * <strong>Warning:</strong>
 *
 * The generation system is a bit redundant right now as the classes do nothing special. There's a
 * high chance this will be refactored to a simple interface system in the future to remove
 * boilerplate.
 */
export abstract class Generator<T> {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract generate(runkey: string, ...other: any[]): T;
}
