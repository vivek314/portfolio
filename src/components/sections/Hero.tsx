"use client";

import { motion } from "framer-motion";

interface HeroProps {
  onNavigate: (href: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating clay blobs */}
      <div
        className="clay-blob animate-float"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(198,123,92,0.35) 0%, rgba(198,123,92,0) 70%)",
          top: "10%",
          left: "5%",
        }}
      />
      <div
        className="clay-blob"
        style={{
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(143,174,139,0.35) 0%, rgba(143,174,139,0) 70%)",
          bottom: "15%",
          right: "8%",
          animation: "float-reverse 7s ease-in-out infinite",
        }}
      />
      <div
        className="clay-blob"
        style={{
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(198,123,92,0.25) 0%, rgba(198,123,92,0) 70%)",
          top: "55%",
          left: "15%",
          animation: "float 9s ease-in-out infinite 2s",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "700px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            fontWeight: 500,
            color: "#C67B5C",
            marginBottom: "16px",
            letterSpacing: "0.05em",
          }}
        >
          Hello there! 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 8vw, 80px)",
            color: "#3D3229",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Hey, I&apos;m Vivek
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#7A6E62",
            marginBottom: "40px",
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Backend Engineer &amp; AI Engineer | System Design Enthusiast
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            className="clay-btn"
            onClick={() => onNavigate("#projects")}
          >
            See My Work ✦
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "#7A6E62",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll down
        </p>
        <div
          style={{
            width: "28px",
            height: "44px",
            border: "2px solid #C8BFB0",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              background: "#C67B5C",
              borderRadius: "2px",
              animation: "scroll-bounce 2s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
