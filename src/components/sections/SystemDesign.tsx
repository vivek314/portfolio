"use client";

import { motion, type Variants } from "framer-motion";

const systemDesigns = [
  {
    title: "Distributed Task Queue",
    desc: "A high-throughput distributed task processing system handling millions of async jobs with retry logic and dead-letter queues.",
    tags: ["Python", "Redis", "Kubernetes"],
    category: "Backend",
  },
  {
    title: "Real-time NLP Pipeline",
    desc: "End-to-end NLP pipeline for sentiment analysis with streaming inference, model versioning, and A/B testing.",
    tags: ["PyTorch", "FastAPI", "Kafka"],
    category: "AI / ML",
  },
  {
    title: "URL Shortener at Scale",
    desc: "Designed and built a URL shortening service handling 10K+ req/s with consistent hashing and read replicas.",
    tags: ["Go", "PostgreSQL", "Nginx"],
    category: "System Design",
  },
  {
    title: "AI Code Reviewer",
    desc: "An intelligent code review tool powered by LLMs that provides contextual feedback on pull requests.",
    tags: ["TypeScript", "OpenAI", "GitHub API"],
    category: "Full Stack",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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

export default function SystemDesign() {
  return (
    <section
      id="system-design"
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
          Selected Work
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
          System Designs
        </motion.h2>

        {/* Projects Grid */}
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
          {systemDesigns.map((design) => (
            <motion.div
              key={design.title}
              variants={cardVariants}
              className="dark-card"
              style={{ padding: "24px" }}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(19, 17, 16, 0.7)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid var(--dark-border)`,
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "0.7rem",
                  color: "var(--dark-accent-light)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {design.category}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--dark-text-primary)",
                  marginBottom: "8px",
                }}
              >
                {design.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--dark-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                {design.desc}
              </p>

              {/* Tech Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {design.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.7rem",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background: "var(--dark-bg-tertiary)",
                      border: `1px solid var(--dark-border)`,
                      color: "var(--dark-text-secondary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
