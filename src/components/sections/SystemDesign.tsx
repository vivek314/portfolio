"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { designs, type DesignEntry, type DesignType } from "@/lib/designs";

// ─── Detail Modal ──────────────────────────────────────────────────────────────
function DesignModal({
  entry,
  onClose,
}: {
  entry: DesignEntry;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(61, 50, 41, 0.5)",
          backdropFilter: "blur(6px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--clay-bg)",
            borderRadius: "24px",
            maxWidth: "860px",
            width: "100%",
            maxHeight: "88vh",
            overflowY: "auto",
            boxShadow: "0 32px 80px rgba(61,50,41,0.25)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "32px 36px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
                <span
                  className="clay-pill"
                  style={{
                    background: entry.type === "hld" ? "rgba(198,123,92,0.15)" : "rgba(143,174,139,0.15)",
                    color: entry.type === "hld" ? "#8B4513" : "#4A7A47",
                    border: `1px solid ${entry.type === "hld" ? "rgba(198,123,92,0.3)" : "rgba(143,174,139,0.3)"}`,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  {entry.type.toUpperCase()}
                </span>
                {entry.tags.map((tag) => (
                  <span key={tag} className="clay-pill clay-pill-tool">
                    {tag}
                  </span>
                ))}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  color: "#3D3229",
                  lineHeight: 1.1,
                  marginBottom: "6px",
                }}
              >
                {entry.topic}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "#7A6E62",
                }}
              >
                {entry.subtitle}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                flexShrink: 0,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--clay-card)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#7A6E62",
                boxShadow: "3px 3px 8px #C8BFB0, -3px -3px 8px #FFFFFF",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: "24px 36px 36px" }}>
            {/* Diagram */}
            {entry.diagramImage && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: "36px",
                  background: "#1a1a2e",
                  minHeight: "300px",
                  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src={entry.diagramImage}
                  alt={`${entry.topic} architecture diagram`}
                  width={860}
                  height={440}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            )}

            {/* Summary */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "#7A6E62",
                lineHeight: 1.8,
                marginBottom: "32px",
                padding: "20px 24px",
                background: "var(--clay-card)",
                borderRadius: "14px",
                borderLeft: "3px solid #C67B5C",
              }}
            >
              {entry.summary}
            </p>

            {/* Design Decisions */}
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 700,
                color: "#C67B5C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Design Decisions & Justifications
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
              {entry.decisions.map((d, i) => (
                <div
                  key={i}
                  className="clay-card"
                  style={{ padding: "20px 24px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "rgba(198,123,92,0.15)",
                        color: "#C67B5C",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {i + 1}
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#3D3229",
                        lineHeight: 1.4,
                      }}
                    >
                      {d.component}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#7A6E62",
                      lineHeight: 1.75,
                      paddingLeft: "36px",
                    }}
                  >
                    {d.justification}
                  </p>
                </div>
              ))}
            </div>

            {/* Tradeoffs */}
            {entry.tradeoffs && entry.tradeoffs.length > 0 && (
              <>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#C67B5C",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Trade-offs & Limitations
                </h3>
                <div
                  className="clay-card"
                  style={{ padding: "20px 24px" }}
                >
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {entry.tradeoffs.map((t, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "14px",
                          color: "#7A6E62",
                          lineHeight: 1.7,
                          paddingLeft: "20px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "#C67B5C",
                            fontWeight: 700,
                          }}
                        >
                          ⚖
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Design Card ───────────────────────────────────────────────────────────────
function DesignCard({
  entry,
  index,
  onClick,
}: {
  entry: DesignEntry;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.1 }}
      className="clay-card"
      onClick={onClick}
      style={{ cursor: "pointer", overflow: "hidden" }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Diagram preview */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "180px",
          background: "#1a1a2e",
          overflow: "hidden",
        }}
      >
        {entry.diagramImage ? (
          <Image
            src={entry.diagramImage}
            alt={entry.topic}
            fill
            style={{ objectFit: "cover", objectPosition: "top left" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "48px", opacity: 0.3 }}>🗺</span>
          </div>
        )}
        {/* Type badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: entry.type === "hld" ? "rgba(198,123,92,0.9)" : "rgba(143,174,139,0.9)",
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "6px",
          }}
        >
          {entry.type.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px" }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            fontWeight: 700,
            color: "#3D3229",
            marginBottom: "6px",
          }}
        >
          {entry.topic}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "#7A6E62",
            marginBottom: "14px",
            lineHeight: 1.5,
          }}
        >
          {entry.subtitle}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
          {entry.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="clay-pill clay-pill-tool">
              {tag}
            </span>
          ))}
          {entry.tags.length > 5 && (
            <span className="clay-pill clay-pill-tool">+{entry.tags.length - 5}</span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#C67B5C",
          }}
        >
          View Design ↗
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function SystemDesign() {
  const [activeTab, setActiveTab] = useState<DesignType>("hld");
  const [selectedEntry, setSelectedEntry] = useState<DesignEntry | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEntry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedEntry]);

  const filtered = designs.filter((d) => d.type === activeTab);

  const tabs: { key: DesignType; label: string; desc: string }[] = [
    { key: "hld", label: "HLD", desc: "High-Level Design" },
    { key: "lld", label: "LLD", desc: "Low-Level Design" },
  ];

  return (
    <>
      <section
        id="system-design"
        style={{ minHeight: "100vh", padding: "128px 24px" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "48px" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 56px)",
                color: "#3D3229",
                marginBottom: "12px",
              }}
            >
              System Design
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "#7A6E62",
              }}
            >
              Architecture deep-dives with design decisions &amp; trade-offs ✦
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              padding: "6px",
              borderRadius: "60px",
              background: "var(--clay-card)",
              boxShadow: "inset 3px 3px 8px #C8BFB0, inset -3px -3px 8px #FFFFFF",
              marginBottom: "48px",
            }}
          >
            {tabs.map((tab) => {
              const count = designs.filter((d) => d.type === tab.key).length;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "10px 28px",
                    borderRadius: "50px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.25s",
                    background: activeTab === tab.key ? "#C67B5C" : "transparent",
                    color: activeTab === tab.key ? "white" : "#7A6E62",
                    boxShadow: activeTab === tab.key
                      ? "3px 3px 8px rgba(198,123,92,0.4), -2px -2px 6px rgba(255,255,255,0.2)"
                      : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {tab.label}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: activeTab === tab.key ? "rgba(255,255,255,0.25)" : "rgba(198,123,92,0.12)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: activeTab === tab.key ? "white" : "#C67B5C",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                    gap: "28px",
                  }}
                >
                  {filtered.map((entry, i) => (
                    <DesignCard
                      key={entry.id}
                      entry={entry}
                      index={i}
                      onClick={() => setSelectedEntry(entry)}
                    />
                  ))}
                </div>
              ) : (
                // Empty state for LLD
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="clay-card"
                  style={{
                    padding: "60px 40px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "48px" }}>🚧</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#3D3229",
                    }}
                  >
                    Coming Soon
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#7A6E62",
                      maxWidth: "320px",
                      lineHeight: 1.7,
                    }}
                  >
                    LLD case studies (Coffee Machine, Parking Lot, Logging Framework…) are being documented. Check back soon!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedEntry && (
        <DesignModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </>
  );
}
