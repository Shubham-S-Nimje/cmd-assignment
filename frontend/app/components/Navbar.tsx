"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Dashboard
          </Link>

          <div className="flex space-x-4">
            <Link
              href="/campaigns"
              className={`px-4 py-2 rounded hover:bg-trinary transition ${pathname === "/campaigns" && "bg-secondary text-black font-semibold"}`}
            >
              Campaigns
            </Link>
            <Link
              href="/"
              className={`px-4 py-2 rounded hover:bg-trinary transition ${pathname === "/" && "bg-secondary text-black font-semibold"}`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
