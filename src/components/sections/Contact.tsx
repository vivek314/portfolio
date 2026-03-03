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
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "128px 24px",
        position: "relative",
      }}
    >
      {/* Background blob */}
      <div
        className="clay-blob"
        style={{
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(143,174,139,0.3) 0%, rgba(143,174,139,0) 70%)",
          bottom: "10%",
          left: "5%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      {/* Card occupies left side (character fills right via canvas overlay) */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="clay-card"
        style={{
          padding: "48px",
          maxWidth: "480px",
          width: "100%",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 52px)",
            color: "#3D3229",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Let&apos;s Connect
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "#7A6E62",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}
        >
          Got a project in mind? Let&apos;s make it happen. I&apos;m always
          open to interesting collaborations and conversations.
        </p>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
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
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="clay-pill"
              style={{
                padding: "14px 20px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "15px",
                justifyContent: "space-between",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px" }}>{social.icon}</span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    color: "#3D3229",
                  }}
                >
                  {social.label}
                </span>
              </span>
              <span style={{ color: "#C67B5C", fontWeight: 600 }}>↗</span>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "#C8BFB0",
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          Made with ☕ & ♥ — heyvivek.in
        </p>
      </motion.div>
    </section>
  );
}
