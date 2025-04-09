import { useEffect, RefObject } from "react";

/**
 * 애니메이션 종료를 감지하는 간단한 훅
 * @param ref 애니메이션이 적용된 요소의 ref
 * @param condition 애니메이션이 실행 중인지를 판단하는 조건
 * @param callback 애니메이션 종료 시 실행할 콜백 함수
 */
function useAnimationEnd<T extends HTMLElement>(
  ref: RefObject<T | null>,
  condition: boolean,
  callback: () => void
): void {
  useEffect(() => {
    if (condition && ref.current) {
      const handleAnimationEnd = () => {
        callback();
      };

      const element = ref.current;
      element.addEventListener("animationend", handleAnimationEnd);

      return () => {
        element.removeEventListener("animationend", handleAnimationEnd);
      };
    }
  }, [ref, condition, callback]);
}

export default useAnimationEnd;
