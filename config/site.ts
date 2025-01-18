export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Student Evaluations",
  description: "Peace Corps student progress tracker",
  sportLinks: [
    { label: "All Games", href: "/all_games", key: "all_games" },
    { label: "Ranks", href: "/ranks", key: "ranks"},
    { label: "My Games", href: "/my_games", key: "my_games" },
  ],
  navItems: [
    {
      label: "Overview",
      href: "/",
      key: "overview",
      dropdownItems: [
      ],
    },
    {
      label: "Student Lookup",
      href: "/student_lookup",
      key: "student_lookup",
    },
    {
      label: "Settings",
      href: "/settings",
      key: "settings",
      dropdownItems: [
        // { label: "Ping Pong Home", href: "/pingpong", key: "pool"},
      ],
    },
    {
      label: "Add Student",
      href: "/add_student",
      key: "add_student",
    },
  ],
  links: {
    // github: "https://github.com/nextui-org/nextui",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};