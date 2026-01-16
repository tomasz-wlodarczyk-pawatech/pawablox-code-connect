import { Ref, RefCallback, RefObject } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as RefObject<T>).current = value;
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      setRef(ref, node);
    });
  };
}
