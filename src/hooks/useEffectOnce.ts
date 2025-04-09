import { useEffect, useRef } from "react";

/**
 * 컴포넌트 마운트 시 한 번만 실행되는 이펙트 훅
 * @param effect 마운트 시 실행될 이펙트 함수 (클린업 함수 반환 가능)
 */
function useEffectOnce(effect: () => (() => void) | void) {
  const mountedRef = useRef(false);
  const cleanupFnRef = useRef<(() => void) | void>(() => {});

  useEffect(() => {
    // 마운트 시 한 번만 실행
    if (!mountedRef.current) {
      mountedRef.current = true;
      cleanupFnRef.current = effect();
      return;
    }

    return () => {
      // 클린업 함수 (언마운트 시 실행)
      if (typeof cleanupFnRef.current === "function") {
        cleanupFnRef.current();
      }
    };
  }, []);
}

export default useEffectOnce;
