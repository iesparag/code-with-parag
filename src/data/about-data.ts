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
  role: "Full Stack Developer",
  location: "India",
  avatar: "/AI-future-control-innovation.png", // Add your profile image to public/images/
  coverImage: "/images/cover.jpg", // Add a cover image
  description: `I am a Full Stack MERN Developer with 2.5 years of experience in building user-focused web applications using JavaScript, React, Node.js, and MongoDB. I excel in both frontend and backend development, ensuring seamless and efficient solutions. My passion for innovation drives me to create exceptional web applications that meet user needs. I thrive in collaborative environments and am always eager to learn and adapt. Currently, I am seeking new opportunities to leverage my skills and grow within a dynamic team. Let's connect and collaborate to create outstanding web solutions!`,
  
  highlights: [
    "Full Stack MERN Developer",
    "2.5 Years Experience",
    "Frontend & Backend Expert",
    "Problem Solver",
    "Team Player"
  ],

  stats: [
    { label: "Years Experience", value: "2.5+" },
    { label: "Projects Completed", value: "8+" },
    { label: "Technologies", value: "10+" },
    { label: "Satisfied Clients", value: "10+" }
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
