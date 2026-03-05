"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "8.55", label: "GPA at IIT Hyderabad" },
  { number: "10+", label: "System Designs" },
  { number: "4+", label: "AI Certifications" },
];

const skills = [
  { name: "Java", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "C++", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "Kafka", category: "backend" },
  { name: "Langchain", category: "backend" },
  { name: "LangGraph", category: "backend" },
  { name: "Docker", category: "tool" },
  { name: "Git", category: "tool" },
  { name: "Maven", category: "tool" },
  { name: "JUnit 5", category: "tool" },
] as const;

const pillClass: Record<string, string> = {
  frontend: "clay-pill clay-pill-frontend",
  backend: "clay-pill clay-pill-backend",
  tool: "clay-pill clay-pill-tool",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 18, delay: i * 0.08 },
  }),
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "120px 24px", position: "relative" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--clay-primary)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          About Me
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 52px)",
            color: "var(--clay-dark)",
            marginBottom: "56px",
            lineHeight: 1.1,
          }}
        >
          Crafting Scalable Systems
        </motion.h2>

        {/* 2-col: text + stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
            marginBottom: "56px",
          }}
        >
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "var(--clay-muted)",
              marginBottom: "20px",
              fontWeight: 300,
            }}>
              I&apos;m a Backend &amp; AI Engineer at Oracle India, specializing in Financial Service Cloud Development.
              AI graduate from IIT Hyderabad with expertise in building scalable,
              distributed systems and event-driven architectures.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "var(--clay-muted)",
              fontWeight: 300,
            }}>
              My work spans designing batch orchestration systems, implementing producer-side
              services, and architecting event-driven platforms. I believe in the power of system
              design principles, distributed computing, and using the right tools to solve complex
              problems at scale.
            </p>
          </motion.div>

          {/* Stats 2×2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clay-card stat-card-hover"
                style={{ padding: "28px", position: "relative", overflow: "hidden" }}
              >
                {/* Top accent line — visible on hover via CSS */}
                <div className="stat-accent-line" />
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--clay-primary)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--clay-muted)",
                  letterSpacing: "0.04em",
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech skills */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--clay-primary)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Tech I work with
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill.name}
              variants={pillVariants}
              className={pillClass[skill.category]}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
