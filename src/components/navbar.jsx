"use client";

import { useState } from "react";
import Link from "next/link";
import Hamburger from "@/assets/hamburger";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/books?page=1", label: "Books" },
    { href: "/characters?page=1", label: "Characters" },
    { href: "/houses?page=1", label: "Houses" },
    { href: "/spells?page=1", label: "Spells" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold  hover:text-blue-500 transition-colors duration-300"
          >
            Wizarding World
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 ">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button className="md:hidden " onClick={toggleMenu}>
              <Hamburger />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-amber-900/20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="block px-4 py-3 "
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
