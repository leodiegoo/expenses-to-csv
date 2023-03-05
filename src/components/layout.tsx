import PageContent from "./page-content";
import LeftSidebar from "./left-sidebar";
import { type FC, type PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="drawer-mobile drawer">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent>{children}</PageContent>
        <LeftSidebar />
      </div>
    </>
  );
};

export default Layout;
