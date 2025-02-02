"use client";

import {
    Navbar, 
    NavbarBrand, 
    Image, 
    NavbarContent, 
    NavbarItem, 
    Link, 
    Button, 
    NavbarMenuToggle, 
    NavbarMenu, 
    NavbarMenuItem
} from "@heroui/react";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { siteConfig } from "@/config/site";

const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];

export const NextUINavbar = ({ name } : { name: string }) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    // const [isMobile, setIsMobile] = useState(false);
    // const [showSecondaryLinks, setShowSecondaryLinks] = useState(false);

    return (
      <Navbar
        isBordered
        shouldHideOnScroll
        onMenuOpenChange={setIsMenuOpen}
        className="border-b-2 border-b-primary flex"
      >
      <NavbarBrand className="!basis-16 !flex-shrink-0">
        <Image
            src="/RCShield.svg"
            alt="RC"
            height="100%"
            width="100%"
            radius="none" 
        />
      </NavbarBrand>
  
        <NavbarContent
          className="!basis-full flex items-center md:overflow-x-scroll justify-between"
          justify="start"
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
        
            <ul className="hidden sm:flex flex-shrink gap-10 justify-start">
              {siteConfig.navItems.map((item: {label: string, href: string, key: string}) => (
                <NavbarItem key={item.key}>
                  <Link 
                      className={clsx(
                          "text-foreground text-xl",
                          pathname === item.href ? "text-primary font-medium" : ""
                      )}
                      href={item.href}>
                          {item.label}
                  </Link>
              </NavbarItem>
              ))}
            </ul>
        </NavbarContent>

        <NavbarContent className="flex" justify="end">
        {/* {session ? (
          <NavbarItem className="text-sm text-center">
            Welcome, <br />
            {session.user.name}!
          </NavbarItem>
        ) : ( */}
          <NavbarItem className="text-sm text-center">
            Welcome, <br/> {name}!
          </NavbarItem>
          <NavbarItem>
            <Link href="/api/auth/signout" className="px-2 py-1 rounded-xl outline outline-primary text-sm">
              Sign Out
            </Link>
          </NavbarItem>
        {/* )} */}
        {/* <ThemeSwitcher /> */}
      </NavbarContent>
        <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      </Navbar>
    );
  };
  