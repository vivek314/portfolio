"use client";

import { motion } from "framer-motion";

const socials = [
  {
    label: "Email",
    href: "mailto:viveksai1305@gmail.com",
    icon: "✉️",
  },
  {
    label: "GitHub",
    href: "https://github.com/vivek314",
    icon: "⚙️",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/Vivek-Gunnabattula",
    icon: "💼",
  },
  {
    label: "Resume",
    href: "https://heyvivek.in",
    icon: "📄",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="dark-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
        position: "relative",
      }}
    >
      {/* Section Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--dark-accent)",
          fontWeight: 500,
          marginBottom: "12px",
        }}
      >
        Get In Touch
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--dark-text-primary)",
          marginBottom: "16px",
          letterSpacing: "-0.02em",
        }}
      >
        Let&apos;s Work Together
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          color: "var(--dark-text-muted)",
          fontSize: "0.95rem",
          marginBottom: "48px",
          fontWeight: 300,
          maxWidth: "600px",
        }}
      >
        Have a project in mind? Let&apos;s build something amazing together.
      </motion.p>

      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          maxWidth: "800px",
        }}
      >
        {socials.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={
              social.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="dark-contact-link"
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>{social.icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "var(--dark-text-secondary)",
                }}
              >
                {social.label}
              </span>
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          color: "var(--dark-text-muted)",
          marginTop: "48px",
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        Designed & Built with <span style={{ color: "var(--dark-accent)" }}>♥</span> by Vivek — 2026
      </motion.p>
    </section>
  );
}
