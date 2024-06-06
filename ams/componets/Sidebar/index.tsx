"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import clsx from "clsx";
import { fontOpenSan } from "../../config/fonts";
import { LogoutIcon } from "../../style/icon/logouticon";
import { Admin_Main_Navigation, Admin_Manage_Navigation, Navigation_lib } from "../../lib/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={clsx(`absolute left-0 top-0 z-9999 flex h-screen  w-24  lg:w-72  flex-col overflow-y-hidden  bg-white  drop-shadow-navigation  duration-300 ease-linear  lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`, fontOpenSan.className)}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="flex  justify-center items-center pt-5 gap-2">
          <Image
            src="/login-page-image/logo.svg"
            alt="logo"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="h-14"
          />
          <h5 className={clsx("text-title-color font-semibold  text-2xl  hidden lg:block  ")} >TO FOR  ZERO</h5>
        </div>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">

        <nav className="mt-5 px-4 py-4 lg:mt-5 lg:px-6">

          {/* Employee And Inter Pannel  */}

          {/* <div>
            <h3 className={clsx("mb-2 text-md font-semibold  text-center lg:text-start  text-navigation-item  uppercase ")}>
              Main
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment> */}
                      {/* <Link
                        href="#"
                        className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold  text-title-color duration-300 ease-in-out ${(pathname.includes("dashboard")) &&
                          "text-navigation-subitem hover:text-navigation-subitem"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <HomeIcon />
                        Dashboard
                      </Link> */}
                    {/* </React.Fragment> */}
                  {/* ); */}
                {/* }} */}
              {/* </SidebarLinkGroup> */}
              {/* {
                Navigation_lib.map((item, index) => {
                  return (
                    <li key={index} >
                      <Link
                        href={`/${item.link}`}
                        className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold duration-300 ease-in-out ${pathname.includes(`${item.link}`)
                          ? "text-navigation-subitem bg-navigation-item-bg"
                          : "text-title-color hover:text-navigation-subitem hover:bg-navigation-item-bg"
                          }`}
                      >
                        {item.icon}
                        <span className="hidden lg:block ">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  )
                })
              } */}

              {/* <li>
                <Link
                  href="/logout"
                  className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold duration-300 ease-in-out ${pathname.includes("logout")
                    ? "text-navigation-subitem bg-navigation-item-bg"
                    : "text-title-color hover:text-navigation-subitem hover:bg-navigation-item-bg"
                    }`}
                >
                  <LogoutIcon />
                  <span className="hidden lg:block ">
                    Log Out
                  </span>
                </Link>
              </li> */}
            {/* </ul>
          </div> */}


          {/* Admin Pannel  */}

          <div>
            <h3 className={clsx("mb-2 text-md font-semibold  text-center lg:text-start  text-navigation-item  uppercase ")}>
              Main
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {
                Admin_Main_Navigation.map((item, index) => {
                  return (
                    <li key={index} >
                      <Link
                        href={`/admin/${item.link}`}
                        className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold duration-300 ease-in-out ${pathname.includes(`${item.link}`)
                          ? "text-navigation-subitem bg-navigation-item-bg"
                          : "text-title-color hover:text-navigation-subitem hover:bg-navigation-item-bg"
                          }`}
                      >
                        {item.icon}
                        <span className="hidden lg:block ">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
            <h3 className={clsx("mb-2 text-md font-semibold  text-center lg:text-start  text-navigation-item  uppercase ")}>
              Manage
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {
                Admin_Manage_Navigation.map((item, index) => {
                  return (
                    <li key={index} >
                      <Link
                        href={`/admin/${item.link}`}
                        className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold duration-300 ease-in-out ${pathname.includes(`${item.link}`)
                          ? "text-navigation-subitem bg-navigation-item-bg"
                          : "text-title-color hover:text-navigation-subitem hover:bg-navigation-item-bg"
                          }`}
                      >
                        {item.icon}
                        <span className="hidden lg:block ">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
            <h3 className={clsx("mb-2 text-md font-semibold  text-center lg:text-start  text-navigation-item  uppercase ")}>
              Logout
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/logout"
                  className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-semibold duration-300 ease-in-out ${pathname.includes("logout")
                    ? "text-navigation-subitem bg-navigation-item-bg"
                    : "text-title-color hover:text-navigation-subitem hover:bg-navigation-item-bg"
                    }`}
                >
                  <LogoutIcon />
                  <span className="hidden lg:block ">
                    Log Out
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          
        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;
