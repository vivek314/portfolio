export interface Project {
  id: string;
  title: string;
  description: string;
  tech: { name: string; category: "frontend" | "backend" | "tool" }[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ResumeItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

export const resumeItems: ResumeItem[] = [
  {
    period: "July 2023 - Present",
    role: "Software Developer 2",
    company: "Oracle India Pvt. Ltd.",
    description:
      "Financial Service Cloud Development. Architected end-to-end batch orchestration enabling scheduled execution of critical banking operations with configurable CRON scheduling and retry policies. Implemented event-driven producer-side service aggregating operational signals for real-time developer dashboard delivery.",
  },
  {
    period: "2019 - 2023",
    role: "B.Tech in Artificial Intelligence",
    company: "Indian Institute of Technology, Hyderabad",
    description:
      "Specialized in distributed systems, system design, and AI/ML. CPI: 8.55/10. Secured All India Rank 2313 in JEE Advanced 2019.",
  },
];

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Scalable and Faster Configurable XML to JSON Converter",
    description:
      "Engineered a high-performance, scalable, and memory-efficient XML to JSON converter optimized for large-scale cloud deployments. Designed parallel I/O with dynamic buffering for optimal performance and memory efficiency. Delivered up to 70% faster processing and reduced memory footprint.",
    tech: [
      { name: "Java", category: "backend" },
      { name: "XmlMapper", category: "backend" },
      { name: "JsonGenerator", category: "backend" },
      { name: "Spring Boot", category: "backend" },
    ],
    image: "/images/projects/xml-json-converter.png",
    githubUrl: "https://github.com/vivek314",
  },
  {
    id: "project-2",
    title: "High-Level Design of Multi-Agent Workflow for Automated Ticket Resolution",
    description:
      "Designed an intelligent, multi-agent workflow capable of ingesting, classifying, resolving, and auto-completing support tickets with minimal human intervention. Integrated LLMs via OpenAI API for natural language classification and ticket summarization. Experimented with LangChain and MCP for context-aware agent coordination.",
    tech: [
      { name: "LangChain", category: "backend" },
      { name: "LangGraph", category: "backend" },
      { name: "OpenAI API", category: "backend" },
      { name: "Python", category: "backend" },
    ],
    image: "/images/projects/multi-agent-workflow.png",
    githubUrl: "https://github.com/vivek314",
  },
  {
    id: "project-3",
    title: "Code Review Bot",
    description:
      "A Python-based automated code review tool that analyzes pull requests and provides intelligent feedback. Helps maintain code quality standards across projects.",
    tech: [
      { name: "Python", category: "backend" },
      { name: "Git", category: "tool" },
      { name: "GitHub API", category: "tool" },
    ],
    image: "/images/projects/code-review-bot.png",
    githubUrl: "https://github.com/vivek314/codereviewbot",
  },
];
