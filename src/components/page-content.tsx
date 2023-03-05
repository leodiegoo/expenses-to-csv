import Header from "./header";
import { FC, PropsWithChildren, useRef } from "react";

const PageContent: FC<PropsWithChildren> = ({ children }) => {
  const mainContentRef = useRef(null);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main
        className="flex-1 overflow-y-auto bg-base-200 px-6  pt-8"
        ref={mainContentRef}
      >
        {children}
        <div className="h-16"></div>
      </main>
    </div>
  );
};

export default PageContent;
