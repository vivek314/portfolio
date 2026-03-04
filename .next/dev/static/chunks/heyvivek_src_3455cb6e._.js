(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/heyvivek/src/lib/projects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projects",
    ()=>projects,
    "resumeItems",
    ()=>resumeItems
]);
const resumeItems = [
    {
        period: "July 2023 - Present",
        role: "Software Developer 2",
        company: "Oracle India Pvt. Ltd.",
        description: "Financial Service Cloud Development. Architected end-to-end batch orchestration enabling scheduled execution of critical banking operations with configurable CRON scheduling and retry policies. Implemented event-driven producer-side service aggregating operational signals for real-time developer dashboard delivery."
    },
    {
        period: "2019 - 2023",
        role: "B.Tech in Artificial Intelligence",
        company: "Indian Institute of Technology, Hyderabad",
        description: "Specialized in distributed systems, system design, and AI/ML. CPI: 8.55/10. Secured All India Rank 2313 in JEE Advanced 2019."
    }
];
const projects = [
    {
        id: "project-1",
        title: "Scalable and Faster Configurable XML to JSON Converter",
        description: "Engineered a high-performance, scalable, and memory-efficient XML to JSON converter optimized for large-scale cloud deployments. Designed parallel I/O with dynamic buffering for optimal performance and memory efficiency. Delivered up to 70% faster processing and reduced memory footprint.",
        tech: [
            {
                name: "Java",
                category: "backend"
            },
            {
                name: "XmlMapper",
                category: "backend"
            },
            {
                name: "JsonGenerator",
                category: "backend"
            },
            {
                name: "Spring Boot",
                category: "backend"
            }
        ],
        image: "/images/projects/xml-json-converter.png",
        githubUrl: "https://github.com/vivek314"
    },
    {
        id: "project-2",
        title: "High-Level Design of Multi-Agent Workflow for Automated Ticket Resolution",
        description: "Designed an intelligent, multi-agent workflow capable of ingesting, classifying, resolving, and auto-completing support tickets with minimal human intervention. Integrated LLMs via OpenAI API for natural language classification and ticket summarization. Experimented with LangChain and MCP for context-aware agent coordination.",
        tech: [
            {
                name: "LangChain",
                category: "backend"
            },
            {
                name: "LangGraph",
                category: "backend"
            },
            {
                name: "OpenAI API",
                category: "backend"
            },
            {
                name: "Python",
                category: "backend"
            }
        ],
        image: "/images/projects/multi-agent-workflow.png",
        githubUrl: "https://github.com/vivek314"
    },
    {
        id: "project-3",
        title: "Code Review Bot",
        description: "A Python-based automated code review tool that analyzes pull requests and provides intelligent feedback. Helps maintain code quality standards across projects.",
        tech: [
            {
                name: "Python",
                category: "backend"
            },
            {
                name: "Git",
                category: "tool"
            },
            {
                name: "GitHub API",
                category: "tool"
            }
        ],
        image: "/images/projects/code-review-bot.png",
        githubUrl: "https://github.com/vivek314/codereviewbot"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/heyvivek/src/components/sections/Resume.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Resume
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/heyvivek/src/lib/projects.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Resume() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "resume",
        style: {
            minHeight: "100vh",
            padding: "128px 24px",
            position: "relative"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "600px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.6
                    },
                    style: {
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(40px, 6vw, 56px)",
                        color: "#3D3229",
                        marginBottom: "64px"
                    },
                    children: "My Journey"
                }, void 0, false, {
                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                left: "0",
                                top: "8px",
                                bottom: "8px",
                                width: "0.5px",
                                background: "linear-gradient(to bottom, #C67B5C, #C8BFB0, #C8BFB0)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "40px"
                            },
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resumeItems"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: -30
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    viewport: {
                                        once: true,
                                        margin: "-50px"
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 18,
                                        delay: index * 0.1
                                    },
                                    style: {
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "24px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flexShrink: 0,
                                                width: "14px",
                                                height: "14px",
                                                borderRadius: "50%",
                                                background: index === 0 ? "#C67B5C" : "#C8BFB0",
                                                border: "2px solid white",
                                                boxShadow: index === 0 ? "0 0 0 3px rgba(198,123,92,0.25)" : "0 0 0 3px rgba(200,191,176,0.3)",
                                                marginTop: "6px",
                                                marginLeft: "-7px",
                                                transition: "all 0.3s"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                            lineNumber: 66,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "clay-card",
                                            style: {
                                                padding: "24px",
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-body)",
                                                        fontSize: "12px",
                                                        fontWeight: 600,
                                                        color: "#C67B5C",
                                                        letterSpacing: "0.08em",
                                                        textTransform: "uppercase",
                                                        display: "block",
                                                        marginBottom: "6px"
                                                    },
                                                    children: item.period
                                                }, void 0, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontFamily: "var(--font-body)",
                                                        fontSize: "17px",
                                                        fontWeight: 700,
                                                        color: "#3D3229",
                                                        marginBottom: "2px"
                                                    },
                                                    children: item.role
                                                }, void 0, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "var(--font-body)",
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        color: "#C67B5C",
                                                        marginBottom: "10px"
                                                    },
                                                    children: item.company
                                                }, void 0, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "var(--font-body)",
                                                        fontSize: "14px",
                                                        color: "#7A6E62",
                                                        lineHeight: 1.7
                                                    },
                                                    children: item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/heyvivek/src/components/sections/Resume.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Resume;
var _c;
__turbopack_context__.k.register(_c, "Resume");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/heyvivek/src/components/sections/Resume.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/heyvivek/src/components/sections/Resume.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=heyvivek_src_3455cb6e._.js.map