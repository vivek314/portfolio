"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/projects";

const GRADIENT_COLORS: Record<number, string> = {
  0: "linear-gradient(135deg, #C67B5C 0%, #8FAE8B 100%)",
  1: "linear-gradient(135deg, #8FAE8B 0%, #4A7A8A 100%)",
  2: "linear-gradient(135deg, #E8A87C 0%, #C67B5C 100%)",
  3: "linear-gradient(135deg, #7A8FA8 0%, #8FAE8B 100%)",
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scaleY: 0.85, scaleX: 1.05 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
      mass: 0.8,
    },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ minHeight: "100vh", padding: "128px 24px" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 56px)",
              color: "#3D3229",
              marginBottom: "12px",
            }}
          >
            My Work
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#7A6E62",
            }}
          >
            Projects I&apos;ve built with care ✦
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "32px",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="clay-card"
              style={{ overflow: "hidden" }}
            >
              {/* Image / Gradient placeholder */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "208px",
                  background: GRADIENT_COLORS[index % 4],
                  overflow: "hidden",
                }}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                {/* Overlay label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    padding: "4px 12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "white",
                    letterSpacing: "0.05em",
                  }}
                >
                  project {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Card content */}
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#3D3229",
                    marginBottom: "8px",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "#7A6E62",
                    lineHeight: 1.7,
                    marginBottom: "16px",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t.name}
                      className={`clay-pill clay-pill-${t.category}`}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn"
                      style={{ fontSize: "13px", padding: "9px 20px" }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn-outline"
                      style={{ fontSize: "13px", padding: "7px 18px" }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
