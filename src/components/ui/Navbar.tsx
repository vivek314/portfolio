"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  onNavigate: (href: string) => void;
}

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (href: string) => {
    onNavigate(href);
    setIsMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "auto",
      }}
    >
      {/* Desktop Nav */}
      <div
        className="clay-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 20px",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleClick("#hero")}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            color: "#C67B5C",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "16px",
          }}
        >
          vivek.
        </button>

        {/* Desktop Links */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "4px" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#7A6E62",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 14px",
                borderRadius: "50px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C67B5C";
                e.currentTarget.style.background = "rgba(198,123,92,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#7A6E62";
                e.currentTarget.style.background = "none";
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginLeft: "8px",
          }}
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#3D3229",
              borderRadius: "2px",
            }}
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#3D3229",
              borderRadius: "2px",
            }}
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#3D3229",
              borderRadius: "2px",
            }}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="clay-nav"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#7A6E62",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px 16px",
                  borderRadius: "14px",
                  textAlign: "left",
                  transition: "all 0.2s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C67B5C";
                  e.currentTarget.style.background = "rgba(198,123,92,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#7A6E62";
                  e.currentTarget.style.background = "none";
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
