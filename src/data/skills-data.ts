interface SkillCategory {
  title: string;
  skills: string[];
}

interface SkillsData {
  [key: string]: SkillCategory;
}

export const skillsData: SkillsData = {
  frontend: {
    title: "Frontend Development",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  backend: {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
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
      "Linux",
      "VS Code",
      "Figma",
      "Postman",
    ],
  },
  other: {
    title: "Other Skills",
    skills: [
      "CI/CD",
      "Testing",
      "Agile",
      "UI/UX Design",
      "SEO",
      "Responsive Design",
      "Web Security",
    ],
  },
};
