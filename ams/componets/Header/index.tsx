import DropdownUser from "./DropdownUser";
import { Image } from "@nextui-org/react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="top-0  flex w-full  drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow  justify-between  items-center   lg:justify-end   px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Image
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            src={"/login-page-image/logo.svg"}
            alt="Logo"
            className="h-12"
          />
        </div>
        <div>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
