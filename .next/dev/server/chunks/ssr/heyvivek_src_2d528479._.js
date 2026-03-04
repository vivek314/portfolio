module.exports = [
"[project]/heyvivek/src/lib/projects.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/heyvivek/src/components/sections/Projects.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Projects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/heyvivek/src/lib/projects.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const GRADIENT_COLORS = {
    0: "linear-gradient(135deg, #C67B5C 0%, #8FAE8B 100%)",
    1: "linear-gradient(135deg, #8FAE8B 0%, #4A7A8A 100%)",
    2: "linear-gradient(135deg, #E8A87C 0%, #C67B5C 100%)",
    3: "linear-gradient(135deg, #7A8FA8 0%, #8FAE8B 100%)"
};
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 80,
        scaleY: 0.85,
        scaleX: 1.05
    },
    visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        scaleX: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 14,
            mass: 0.8
        }
    }
};
function Projects() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "projects",
        style: {
            minHeight: "100vh",
            padding: "128px 24px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "900px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        marginBottom: "64px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(40px, 6vw, 56px)",
                                color: "#3D3229",
                                marginBottom: "12px"
                            },
                            children: "My Work"
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "var(--font-body)",
                                fontSize: "16px",
                                color: "#7A6E62"
                            },
                            children: "Projects I've built with care ✦"
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: containerVariants,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: {
                        once: true,
                        margin: "-100px"
                    },
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                        gap: "32px"
                    },
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projects"].map((project, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: cardVariants,
                            className: "clay-card",
                            style: {
                                overflow: "hidden"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "relative",
                                        width: "100%",
                                        height: "208px",
                                        background: GRADIENT_COLORS[index % 4],
                                        overflow: "hidden"
                                    },
                                    children: [
                                        project.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: project.image,
                                            alt: project.title,
                                            fill: true,
                                            className: "object-cover",
                                            sizes: "(max-width: 768px) 100vw, 50vw",
                                            onError: (e)=>{
                                                e.currentTarget.style.display = "none";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                            lineNumber: 101,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
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
                                                letterSpacing: "0.05em"
                                            },
                                            children: [
                                                "project ",
                                                String(index + 1).padStart(2, "0")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "24px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontFamily: "var(--font-body)",
                                                fontSize: "18px",
                                                fontWeight: 600,
                                                color: "#3D3229",
                                                marginBottom: "8px"
                                            },
                                            children: project.title
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "var(--font-body)",
                                                fontSize: "14px",
                                                color: "#7A6E62",
                                                lineHeight: 1.7,
                                                marginBottom: "16px"
                                            },
                                            children: project.description
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "6px",
                                                marginBottom: "20px"
                                            },
                                            children: project.tech.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `clay-pill clay-pill-${t.category}`,
                                                    children: t.name
                                                }, t.name, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "10px",
                                                flexWrap: "wrap"
                                            },
                                            children: [
                                                project.liveUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: project.liveUrl,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "clay-btn",
                                                    style: {
                                                        fontSize: "13px",
                                                        padding: "9px 20px"
                                                    },
                                                    children: "Live Demo ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 21
                                                }, this),
                                                project.githubUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: project.githubUrl,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "clay-btn-outline",
                                                    style: {
                                                        fontSize: "13px",
                                                        padding: "7px 18px"
                                                    },
                                                    children: "GitHub"
                                                }, void 0, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, project.id, true, {
                            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/heyvivek/src/components/sections/Projects.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/heyvivek/src/components/sections/Projects.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/heyvivek/src/components/sections/Projects.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=heyvivek_src_2d528479._.js.map