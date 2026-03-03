"use client";

import { motion } from "framer-motion";
import { resumeItems } from "@/lib/projects";

export default function Resume() {
  return (
    <section
      id="resume"
      style={{
        minHeight: "100vh",
        padding: "128px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
            marginBottom: "64px",
          }}
        >
          My Journey
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "8px",
              bottom: "8px",
              width: "0.5px",
              background: "linear-gradient(to bottom, #C67B5C, #C8BFB0, #C8BFB0)",
            }}
          />

          {/* Timeline entries */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {resumeItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  delay: index * 0.1,
                }}
                style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}
              >
                {/* Dot */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: index === 0 ? "#C67B5C" : "#C8BFB0",
                    border: "2px solid white",
                    boxShadow: index === 0
                      ? "0 0 0 3px rgba(198,123,92,0.25)"
                      : "0 0 0 3px rgba(200,191,176,0.3)",
                    marginTop: "6px",
                    marginLeft: "-7px",
                    transition: "all 0.3s",
                  }}
                />

                {/* Card */}
                <div
                  className="clay-card"
                  style={{
                    padding: "24px",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#C67B5C",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {item.period}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#3D3229",
                      marginBottom: "2px",
                    }}
                  >
                    {item.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#C67B5C",
                      marginBottom: "10px",
                    }}
                  >
                    {item.company}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#7A6E62",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
