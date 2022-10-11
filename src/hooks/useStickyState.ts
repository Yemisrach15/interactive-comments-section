import React from 'react';
import { useRecoilState, RecoilState } from 'recoil';

function useStickystate<T>(atom: RecoilState<T>, key: string) {
  const [value, setValue] = useRecoilState<T>(atom);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}

export default useStickystate;
