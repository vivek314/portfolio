"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "20+", label: "Projects Built" },
  { number: "10+", label: "System Designs" },
  { number: "5+", label: "AI Models Deployed" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="dark-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", width: "100%" }}>
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
          About Me
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
            marginBottom: "40px",
            letterSpacing: "-0.02em",
          }}
        >
          Crafting Digital<br />Experiences
        </motion.h2>

        {/* Grid Layout: Text on left, Stats on right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* Left: Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{
                color: "var(--dark-text-secondary)",
                fontSize: "0.95rem",
                marginBottom: "20px",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              I&apos;m a Backend & AI Engineer passionate about building scalable systems and intelligent applications. With a deep understanding of system design principles, I create architectures that are resilient, performant, and elegant.
            </p>
            <p
              style={{
                color: "var(--dark-text-secondary)",
                fontSize: "0.95rem",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              When I&apos;m not writing code, I&apos;m exploring new technologies, contributing to open-source, and sharing knowledge about distributed systems and machine learning pipelines.
            </p>
          </motion.div>

          {/* Right: Stat Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="dark-stat-card"
              >
                <div className="dark-stat-number">{stat.number}</div>
                <div className="dark-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
