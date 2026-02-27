"use client";

import links from "@/app/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div>
      <aside className="w-80 min-h-screen p-4">
        <nav className="flex flex-col gap-2 text-lg-">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 ${
                pathname === link.href
                  ? "bg-border font-semibold rounded-md px-3 py-2"
                  : "px-3 py-2 text-slate-600 hover:bg-border hover:font-semibold rounded-md"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
