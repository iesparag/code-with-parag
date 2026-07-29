export const personalInfo = {
  name: "Parag Jain",
  role: "GenAI Engineer & Full-Stack Developer",
  description:
    "GenAI engineer and full-stack developer. I ship production LLM apps — AI agents, RAG pipelines, and MCP tooling — on top of scalable Node.js microservices and the MERN/MEAN stack.",
  location: "Ahmedabad, India",
  email: "iesparagjain@gmail.com",
};

export const skills = [
  { name: "GenAI · LLM Apps", level: 90 },
  { name: "RAG & AI Agents", level: 85 },
  { name: "Node.js / Express", level: 90 },
  { name: "React / Angular", level: 88 },
  { name: "TypeScript", level: 85 },
];

export const projects = [
  {
    title: "Multi-Vendor E-Commerce Marketplace",
    description:
      "A full-stack multi-vendor marketplace (BigBasket/Blinkit-style) with a flexible product model (category attributes + variants + modifiers), RBAC with granular resource:action permissions, and Stripe-Connect split payments backed by a double-entry ledger and vendor payouts — spanning a Node/Express + TypeScript API, an Angular admin, an Angular SSR storefront, and a Flutter customer app.",
    video: "/videos/market-place.webm", // TODO: apna demo video daalo
    tags: ["TypeScript", "Node.js", "Express", "MongoDB", "Angular", "Stripe", "Flutter", "Socket.IO"],
    github: "https://github.com/iesparag/Market-Place",
    demo: "https://market-place-customer-website.vercel.app/",
  },
  // {
  //   title: "AutoForge — AI Full-Stack App Builder",
  //   description:
  //     "An autonomous AI engineering platform that turns a natural-language prompt into a complete full-stack app — creating a GitHub repo with issues, commits, and merged PRs, end to end. A self-correcting build loop runs install, tests, and build, then feeds failures back to the model to auto-fix before committing; adds encrypted secret storage and an email-based human-in-the-loop.",
  //   video: "", // TODO: apna demo video daalo
  //   tags: ["Node.js", "Express", "MongoDB", "OpenAI API", "Anthropic API", "Octokit", "SSE"],
  //   github: "https://github.com/iesparag/auto-forge",
  //   demo: "https://auto-forge-production.up.railway.app/login",
  // },
  // {
  //   title: "AI-Powered Chatbot (ChatGPT-style)",
  //   description:
  //     "A ChatGPT-style conversational AI app with real-time responses, session-persisted chat history, and context-aware prompt handling over a scalable Node/Express backend, with caching for faster API response times.",
  //   video: "/videos/ai-chat-application.mp4",
  //   tags: ["Angular", "TypeScript", "Node.js", "Express", "OpenAI API", "MongoDB", "Redis"],
  //   github: "https://github.com/iesparag/ai_chat_application",
  //   demo: "https://ai-chat-application-by-parag.vercel.app/",
  // },
  {
    title: "create-backend — npm CLI",
    description:
      "An open-source npm CLI (@iesparag/create-backend) that scaffolds a production-ready Node.js/Express + MongoDB + Socket.io backend in a single command — clean MVC architecture with JWT auth, Zod validation, centralized error handling, rate-limiting, and security middleware (Helmet/CORS).",
    video: "/videos/create-backend.webm", // TODO: apna demo video daalo
    tags: ["Node.js", "Express", "MongoDB", "Socket.io", "npm CLI"],
    github: "https://github.com/iesparag/create-backend",
    demo: "https://www.npmjs.com/package/@iesparag/create-backend",
  }
];

export const socialLinks = {
  github: "https://github.com/iesparag",
  linkedin: "https://www.linkedin.com/in/iesparag/",
  whatsapp: "https://api.whatsapp.com/send?phone=919770525851"
};

// Google Drive resume — opens in a new tab (preview page has a download button)
export const resumeUrl =
  "https://drive.google.com/file/d/18885iCam6buIQZh9hJ94v_auMtEryOcD/view?usp=drive_link";
