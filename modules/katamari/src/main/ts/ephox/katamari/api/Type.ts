const typeOf = (x: any): string => {
  if (x === null) {
    return 'null';
  } else if (isArray(x)) {
    return 'array';
  } else if (isString(x)) {
    return 'string';
  } else {
    return typeof x;
  }
};

const isType = <Yolo>(type: string) => (value: any): value is Yolo =>
  typeOf(value) === type;

const isSimpleType = <Yolo>(type: string) => (value: any): value is Yolo =>
  typeof value === type;

const eq = <T> (t: T) => (a: any): a is T =>
  t === a;

function isObjectWithConstructorName(x: any, constructorName) {
  return x !== null && isSimpleType<object>('object')(x) && x.constructor && x.constructor.name === constructorName;
}

export const isString = (x: any): x is string =>
  isSimpleType('string')(x) || String.prototype.isPrototypeOf(x) || isObjectWithConstructorName(x, 'String');

export const isObject: (value: any) => boolean =
  isType('object');

export const isArray = (x: any): x is Array<unknown> =>
  Array.isArray(x) || isObjectWithConstructorName(x, 'Array');

export const isNull: (a: any) => a is null =
  eq(null);

export const isBoolean: (value: any) => value is boolean =
  isSimpleType<boolean>('boolean');

export const isUndefined: (a: any) => a is undefined =
  eq(undefined);

export const isFunction: (value: any) => value is Function =
  isSimpleType<Function>('function');

export const isNumber: (value: any) => value is number =
  isSimpleType<number>('number');

export const isArrayOf = <E>(value: any, pred: (x: any) => x is E): value is Array<E> => {
  if (isArray(value)) {
    for (let i = 0, len = value.length; i < len; ++i) {
      if (!(pred(value[i]))) {
        return false;
      }
    }
    return true;
  }
  return false;
};
