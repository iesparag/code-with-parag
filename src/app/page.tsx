import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Portfolio - Parag Jain',
  description: 'Personal portfolio website showcasing my projects and skills.',
};

const Navigation = dynamic(() => import('@/components/Navigation'), {
  loading: () => <div className="h-16"></div>
});

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => <div className="h-screen"></div>
});

const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="h-screen"></div>
});

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  loading: () => <div className="h-screen"></div>
});

const SkillsSection = dynamic(() => import('@/components/SkillsSection'), {
  loading: () => <div className="h-screen"></div>
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <div className="h-screen"></div>
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="h-screen"></div>
});

const GitHubSection = dynamic(() => import('@/components/GitHubSection'), {
  loading: () => <div className="h-screen"></div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <GitHubSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
