"use client";

import { motion, type Variants } from "framer-motion";

const skills = [
  // Languages
  { name: "Java", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "C++", category: "backend" },
  // Backend
  { name: "Spring Boot", category: "backend" },
  { name: "Kafka", category: "backend" },
  { name: "Langchain", category: "backend" },
  { name: "LangGraph", category: "backend" },
  // Tools & Platforms
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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 56px)",
            color: "#3D3229",
            marginBottom: "32px",
          }}
        >
          About Me
        </motion.h2>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="clay-card"
          style={{ padding: "32px", marginBottom: "32px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#7A6E62",
              marginBottom: "16px",
            }}
          >
            I&apos;m a Software Developer at Oracle, specializing in Financial Service Cloud Development. AI graduate from IIT Hyderabad with expertise in building scalable, distributed systems and event-driven architectures. I focus on designing robust backend solutions with a passion for clean, maintainable code.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#7A6E62",
            }}
          >
            My work spans designing batch orchestration systems, implementing producer-side services, and architecting event-driven platforms. I believe in the power of system design principles, distributed computing, and using the right tools to solve complex problems at scale.
          </p>
        </motion.div>

        {/* Skill tags */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#C67B5C",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Tech I work with
        </motion.h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
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
