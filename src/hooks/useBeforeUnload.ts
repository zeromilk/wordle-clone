import { useEffect } from "react";

/**
 * 브라우저 창이 닫히거나 페이지를 떠날 때 콜백 함수를 실행하는 훅
 * @param callback 실행할 콜백 함수
 * @param deps 의존성 배열 (기본값: 빈 배열)
 */
function useBeforeUnload(
  callback: () => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    // 브라우저가 닫히거나 페이지를 떠날 때 실행할 핸들러
    const handleBeforeUnload = () => {
      callback();
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 클린업 함수
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, deps);
}

export default useBeforeUnload;
