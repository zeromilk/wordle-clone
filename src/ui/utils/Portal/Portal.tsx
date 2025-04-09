import ReactDOM from "react-dom";
import { ReactPortal, useEffect, useState } from "react";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  selector?: string;
}

function Portal({
  children,
  selector = "#portal-modal",
}: Props): ReactPortal | null {
  const [element, setElement] = useState<ReturnType<
    typeof document.querySelector
  > | null>(null);

  useEffect(() => {
    setElement(document.querySelector(selector));
  }, []);

  return element && children ? ReactDOM.createPortal(children, element) : null;
}

export default Portal;
