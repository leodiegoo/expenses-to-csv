import Link from "next/link";
import TagIcon from "@heroicons/react/24/outline/TagIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";

function LeftSidebar() {
  return (
    <div className="drawer-side ">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  w-80 bg-base-100 pt-2 text-base-content">
        <li className="mb-2 text-xl font-semibold">
          <Link href={"/"}>Expenses2CSV</Link>
        </li>
        <li className={"font-normal"}>
          <Link href="/categories">
            <TagIcon className="h-6 w-6" /> categories
          </Link>
        </li>
        <li className={"font-normal"}>
          <Link href="/triggers">
            <BoltIcon className="h-6 w-6" /> triggers
          </Link>
        </li>
        <li className={"font-normal"}>
          <Link href="/expenses">
            <CurrencyDollarIcon className="h-6 w-6" /> expenses
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
