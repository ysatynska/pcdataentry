"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@heroui/react";

export default function ThemeSwitcher() {
  // const { theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // // Ensure the component is mounted before accessing the theme
  // useEffect(() => setMounted(true), []);

  // if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      {/* <Switch
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        size="lg"
        className="text-blue-500"
      /> */}
    </div>
  );
}
