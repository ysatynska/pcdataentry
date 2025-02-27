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
    NavbarMenuItem, 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem
} from "@heroui/react";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDownIcon } from "./icons";

export const NextUINavbar = ({ name } : { name: string }) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
              {siteConfig.navItems.map((item) => (
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
          <Dropdown>
            <DropdownTrigger>
              <Button className="text-sm" variant="light" disableRipple endContent={<ChevronDownIcon />}>
                Welcome,<br/> {name}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="settings">
                <Link href="/profile">Settings</Link>
              </DropdownItem>
              <DropdownItem key="signout">
                <Link href="/api/auth/signout">Sign Out</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </NavbarContent>
      
      <NavbarMenu>
        {siteConfig.navItems.map((item) => (
          <NavbarMenuItem key={item.key}>
            <Link
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      </Navbar>
    );
  };
