import { useWordleGameResultModalStore } from "@/stores/modal";
import dynamic from "next/dynamic";

import { PropsWithChildren, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const WordleGameResultModal = dynamic(
  () => import("@/components/modal/WordleGameResultModal")
);
const ModalProvider = ({ children }: PropsWithChildren) => {
  const { setIsOpen } = useWordleGameResultModalStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      {children}
      <WordleGameResultModal />
    </>
  );
};

export default ModalProvider;
