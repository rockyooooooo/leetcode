type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function argumentsLength(...args: JSONValue[]): number {
  return args.length
};

console.log(argumentsLength(1, 2, 3)) // 3
