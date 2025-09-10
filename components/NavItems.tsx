"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="items-center flex gap-8">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "relative text-slate-300 hover:text-white transition-colors duration-200",
            "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5",
            "after:bg-gradient-to-r after:from-blue-400 after:to-purple-400",
            "after:transition-all after:duration-300 hover:after:w-full",
            pathname === href && "text-white font-semibold after:w-full"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
