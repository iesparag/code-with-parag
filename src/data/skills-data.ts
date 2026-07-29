interface SkillCategory {
  title: string;
  skills: string[];
}

interface SkillsData {
  [key: string]: SkillCategory;
}

export const skillsData: SkillsData = {
  ai: {
    title: "AI / GenAI",
    skills: [
      "OpenAI API",
      "Anthropic Claude",
      "Google Gemini",
      "LangChain",
      "LangGraph",
      "MCP",
      "RAG",
      "Prompt Engineering",
      "Vector DBs",
    ],
  },
  frontend: {
    title: "Frontend Development",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  backend: {
    title: "Backend & Systems",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Apache Kafka",
      "Elasticsearch",
      "Microservices",
      "REST APIs",
    ],
  },
  tools: {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Postman",
      "Linux",
    ],
  },
};
