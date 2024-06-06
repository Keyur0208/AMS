import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";

export default function App() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">

          {/* Inter Or Employee Profile */}

          {/* <DropdownTrigger>
            <div className="relative"> 
              <User
                as="button"
                avatarProps={{
                  size: "md",
                  color: "success",
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                description="Inter"
                name="Virat Kohli"
              />
              <span className="green-badge"></span> 
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="settings" color="primary" href="/profile">
              My Profile
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu> */}

          {/* Admin Profile */}

          <DropdownTrigger>
            <div className="relative">
              <User
                as="button"
                avatarProps={{
                  size: "md",
                  color:"primary",
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                description="Admin"
                name="Virat Kohli"
              />
              <span className="blue-badge "></span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="settings" color="primary" href="/admin/admin_profile">
              My Profile
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>


        </Dropdown>
      </div>
    </div>
  );
}
