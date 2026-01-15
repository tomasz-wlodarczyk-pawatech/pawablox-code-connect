import { useCallback, useState } from 'react';

export type UseFocusRingResult = {
  isFocused: boolean;
  isFocusVisible: boolean;
  focusProps: {
    onFocus: (e: React.FocusEvent) => void;
    onBlur: () => void;
  };
};

export function useFocusRing(): UseFocusRingResult {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const onFocus = useCallback((e: React.FocusEvent) => {
    setIsFocused(true);
    // Check if focus was triggered by keyboard
    // Using focusVisible polyfill logic
    if (e.target.matches(':focus-visible')) {
      setIsFocusVisible(true);
    }
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
    setIsFocusVisible(false);
  }, []);

  return {
    isFocused,
    isFocusVisible,
    focusProps: {
      onFocus,
      onBlur,
    },
  };
}
