"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Menu } from "./icons";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const navItems = [
    { name: "Home", href: "#" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "GitHub", href: "#github" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-[hsl(var(--border))]"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="relative">
            <motion.a
              href="/"
              className="group relative flex flex-col leading-none py-1 px-2 rounded-lg transition-colors hover:bg-accent/10"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 tracking-tight">
                Parag Jain
              </span>
              <span className="text-[0.8rem] font-medium text-muted-foreground/90 tracking-wide uppercase">
                Developer Portfolio
              </span>
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 -z-10"
                initial={false}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          </div>

          {/* Desktop Navigation and Theme Toggle */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            {/* Theme Toggle */}
            {/* <ThemeToggle /> */}
          </div>
          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2 hover:bg-secondary/80 rounded-lg"
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                opacity: { duration: 0.2, ease: "linear" },
              }}
              className="overflow-hidden md:hidden border-t border-[hsl(var(--border))]"
            >
              <motion.div
                className="flex flex-col py-6 px-4 bg-background"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-all px-4 py-3 -mx-4 hover:bg-secondary/80 rounded-lg"
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { type: "spring", stiffness: 300, damping: 30 },
                        },
                      },
                      closed: {
                        y: 20,
                        opacity: 0,
                        transition: {
                          y: { type: "spring", stiffness: 300 },
                        },
                      },
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
