import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parag Jain | Portfolio",
  description: "Full Stack Developer specializing in modern web technologies",
  keywords: ["Full Stack Developer", "Web Development", "React", "Angular", "Next.js", "TypeScript", "Node.js", "MongoDB", "Django", "Python", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Git", "Docker", "AWS", "Vercel", "Linux", "VS Code", "Figma", "Postman", "CI/CD", "Testing", "Agile", "UI/UX Design", "Performance Optimization", "SEO", "Responsive Design", "Web Security"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <AuroraBackground />
          <ScrollProgress />
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
