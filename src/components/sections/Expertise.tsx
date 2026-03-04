"use client";

import { motion, type Variants } from "framer-motion";

const expertiseAreas = [
  {
    icon: "⚙️",
    name: "Backend Engineering",
    desc: "Building robust APIs, microservices, and distributed systems with Python, Java, and Go.",
  },
  {
    icon: "🧠",
    name: "AI / ML Engineering",
    desc: "Training, fine-tuning, and deploying machine learning models at scale with modern MLOps.",
  },
  {
    icon: "📐",
    name: "System Design",
    desc: "Architecting scalable, fault-tolerant systems that handle millions of requests gracefully.",
  },
  {
    icon: "☁️",
    name: "Cloud & DevOps",
    desc: "Infrastructure as code, CI/CD pipelines, and cloud-native architectures on AWS & GCP.",
  },
  {
    icon: "🗄️",
    name: "Databases",
    desc: "SQL, NoSQL, caching layers, and data modeling for high-throughput applications.",
  },
  {
    icon: "🔒",
    name: "Security & Auth",
    desc: "OAuth, JWT, encryption, and secure architecture patterns for production systems.",
  },
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

export default function Expertise() {
  return (
    <section
      id="expertise"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        position: "relative",
        backgroundColor: "var(--clay-bg)",
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
            color: "var(--clay-primary)",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          Expertise
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
            color: "var(--clay-dark)",
            marginBottom: "40px",
            letterSpacing: "-0.02em",
          }}
        >
          What I Do
        </motion.h2>

        {/* Expertise Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.name}
              variants={cardVariants}
              className="clay-card"
              style={{ padding: "32px" }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "var(--clay-card)",
                  border: "1px solid rgba(198, 123, 92, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  fontSize: "1.2rem",
                }}
              >
                {area.icon}
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "var(--clay-dark)",
                  marginBottom: "8px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {area.name}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--clay-muted)",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-body)",
                }}
              >
                {area.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
