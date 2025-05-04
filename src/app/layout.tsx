import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B1120]`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
