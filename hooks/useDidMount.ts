import React, { useEffect, useLayoutEffect, useRef } from "react";

const useDidMountEffect = (callback: React.EffectCallback, deps: React.DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
