interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Social {
  platform: string;
  url: string;
  icon: string;
}

export const aboutData = {
  title: "About Me",
  name: "Parag Jain",
  initials: "PJ",
  role: "GenAI Engineer & Full-Stack Developer",
  location: "India",
  avatar: "/AI-future-control-innovation.png", // Add your profile image to public/images/
  coverImage: "/images/cover.jpg", // Add a cover image
  description: `I'm a GenAI engineer and full-stack developer with 4+ years of experience shipping production software. I build intelligent applications with LLMs — AI agents, RAG pipelines, and MCP tooling — using OpenAI, Anthropic Claude, and Gemini (LangChain / LangGraph), all on a scalable Node.js foundation. I design event-driven microservices with Kafka, Redis, and MongoDB, and craft polished frontends in React and Angular. I love turning ambiguous ideas into reliable, real-world AI products.`,

  highlights: [
    "GenAI & Agentic AI",
    "RAG & LLM Apps",
    "4+ Years Experience",
    "Node.js Microservices",
    "Full-Stack MERN / MEAN",
    "Kafka · Redis · MongoDB"
  ],

  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Projects Shipped", value: "12+" },
    { label: "Technologies", value: "20+" },
    { label: "AI Providers", value: "3+" }
  ],

  skills: [
    { name: "React", level: 90, icon: "react" },
    { name: "Next.js", level: 80, icon: "nextjs" },
    { name: "Angular", level: 90, icon: "angular" },
    { name: "Node.js", level: 85, icon: "nodejs" },
    { name: "MongoDB", level: 80, icon: "mongodb" },
    { name: "TypeScript", level: 85, icon: "typescript" }
  ] as Skill[],

  featuredProjects: [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory",
      image: "/images/projects/ecommerce.jpg",
      link: "https://github.com/yourusername/ecommerce"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      image: "/images/projects/taskapp.jpg",
      link: "https://github.com/yourusername/taskapp"
    }
  ] as Project[],

  social: [
    { platform: "GitHub", url: "https://github.com/yourusername", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/yourusername", icon: "twitter" }
  ] as Social[]
};
