module.exports = [
"[project]/heyvivek/src/components/sections/About.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
const stats = [
    {
        number: "3+",
        label: "Years Experience"
    },
    {
        number: "8.55",
        label: "GPA at IIT Hyderabad"
    },
    {
        number: "10+",
        label: "System Designs"
    },
    {
        number: "4+",
        label: "AI Certifications"
    }
];
const skills = [
    {
        name: "Java",
        category: "backend"
    },
    {
        name: "Python",
        category: "backend"
    },
    {
        name: "SQL",
        category: "backend"
    },
    {
        name: "C++",
        category: "backend"
    },
    {
        name: "Spring Boot",
        category: "backend"
    },
    {
        name: "Kafka",
        category: "backend"
    },
    {
        name: "Langchain",
        category: "backend"
    },
    {
        name: "LangGraph",
        category: "backend"
    },
    {
        name: "Docker",
        category: "tool"
    },
    {
        name: "Git",
        category: "tool"
    },
    {
        name: "Maven",
        category: "tool"
    },
    {
        name: "JUnit 5",
        category: "tool"
    }
];
const pillClass = {
    frontend: "clay-pill clay-pill-frontend",
    backend: "clay-pill clay-pill-backend",
    tool: "clay-pill clay-pill-tool"
};
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 24
    },
    visible: (i)=>({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 140,
                damping: 18,
                delay: i * 0.08
            }
        })
};
const pillVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 10
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }
};
function About() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "about",
        style: {
            padding: "120px 24px",
            position: "relative"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "1000px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: {
                        opacity: 0,
                        y: 16
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.5
                    },
                    style: {
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--clay-primary)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        marginBottom: "12px"
                    },
                    children: "About Me"
                }, void 0, false, {
                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                    initial: {
                        opacity: 0,
                        y: 24
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.6,
                        delay: 0.05
                    },
                    style: {
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(36px, 5vw, 52px)",
                        color: "var(--clay-dark)",
                        marginBottom: "56px",
                        lineHeight: 1.1
                    },
                    children: "Crafting Scalable Systems"
                }, void 0, false, {
                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "60px",
                        alignItems: "start",
                        marginBottom: "56px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: -24
                            },
                            whileInView: {
                                opacity: 1,
                                x: 0
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                duration: 0.6,
                                delay: 0.1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-body)",
                                        fontSize: "15px",
                                        lineHeight: 1.85,
                                        color: "var(--clay-muted)",
                                        marginBottom: "20px",
                                        fontWeight: 300
                                    },
                                    children: "I'm a Backend & AI Engineer at Oracle India, specializing in Financial Service Cloud Development. AI graduate from IIT Hyderabad with expertise in building scalable, distributed systems and event-driven architectures."
                                }, void 0, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-body)",
                                        fontSize: "15px",
                                        lineHeight: 1.85,
                                        color: "var(--clay-muted)",
                                        fontWeight: 300
                                    },
                                    children: "My work spans designing batch orchestration systems, implementing producer-side services, and architecting event-driven platforms. I believe in the power of system design principles, distributed computing, and using the right tools to solve complex problems at scale."
                                }, void 0, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "20px"
                            },
                            children: stats.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    custom: i,
                                    variants: cardVariants,
                                    initial: "hidden",
                                    whileInView: "visible",
                                    viewport: {
                                        once: true
                                    },
                                    className: "clay-card stat-card-hover",
                                    style: {
                                        padding: "28px",
                                        position: "relative",
                                        overflow: "hidden"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-accent-line"
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "var(--font-display)",
                                                fontSize: "2rem",
                                                fontWeight: 700,
                                                color: "var(--clay-primary)",
                                                lineHeight: 1,
                                                marginBottom: "8px"
                                            },
                                            children: stat.number
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                                            lineNumber: 152,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "var(--font-body)",
                                                fontSize: "12px",
                                                color: "var(--clay-muted)",
                                                letterSpacing: "0.04em"
                                            },
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, stat.label, true, {
                                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: {
                        opacity: 0
                    },
                    whileInView: {
                        opacity: 1
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.5
                    },
                    style: {
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--clay-primary)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "16px"
                    },
                    children: "Tech I work with"
                }, void 0, false, {
                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: {
                        once: true
                    },
                    transition: {
                        staggerChildren: 0.05
                    },
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px"
                    },
                    children: skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            variants: pillVariants,
                            className: pillClass[skill.category],
                            children: skill.name
                        }, skill.name, false, {
                            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/heyvivek/src/components/sections/About.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/heyvivek/src/components/sections/About.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/heyvivek/src/components/sections/About.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
}),
"[project]/heyvivek/src/components/sections/About.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/heyvivek/src/components/sections/About.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=heyvivek_src_components_sections_About_tsx_1384f724._.js.map