"use client";

import Image from "next/image";
import { Github, Linkedin, Bot, User, FileText } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./components/ui/hover-card";

import { getMarkdownContent } from "./data/content";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [mode, setMode] = useState<"human" | "agent">("human");

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  const [showEasterEgg, setShowEasterEgg] = useState(false);





  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}>
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image - Easter Egg Trigger */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative mb-2 h-40 w-40 grayscale filter sm:h-56 sm:w-56 overflow-hidden cursor-pointer transition-all duration-500 hover:grayscale-0 active:scale-95"
              aria-label="Toggle Aura Mode"
            >
              <Image
                src="/khizarqamar.png" // User's photo
                alt="Profile"
                fill
                className={`object-contain transition-all duration-700 ${showEasterEgg ? 'grayscale-0 scale-105' : 'grayscale'}`}
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 backdrop-blur-[1px]" />

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none" />
            </button>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
              Khizar Qamar
            </h1>

            {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">

              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">PKT</span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>


              </div>
            </div>

            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                software engineer with hands-on experience in full-stack development, mobile applications, and ai systems.
              </p>
              <p>
                interned at{" "}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a
                      href="https://en.wikipedia.org/wiki/NetSol_Technologies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors"
                    >
                      netsol technologies
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72 p-4 text-base leading-relaxed text-gray-800 dark:text-gray-200 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm">
                    <p>
                      A global enterprise software company providing IT solutions primarily for the leasing, finance, and asset management industries.
                    </p>
                  </HoverCardContent>
                </HoverCard>{" "}
                and datarigel — building production-ready apis, iot-integrated mobile apps, and ai-powered platforms. proficient in next.js, react native, node.js, and aws. looking to contribute to innovative products as a full-time software engineer.
              </p>
            </div>



            {/* Experience Section */}
            <div className="mb-16 mt-12 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Experience
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="DataRigel"
                  role="Lahore, Pakistan"
                  collapsible={true}
                  link=""
                >
                  <div className="space-y-2">
                    <p>Associate Software Engineer</p>
                    <p>Apr 2026 – Present</p>
                    <p>• Boosted sensor data throughput by 40% on a local Android IoT app by replacing fire-and-forget function calls with async-synced Windsor integration, eliminating data loss during high-frequency reads.</p>
                    <p>• Extended 5+ React Native screens with real-time sensor visualizations and state-driven UI updates, improving data visibility and reducing manual monitoring effort for field operators.</p>
                    <p>• Secured AWS infrastructure by migrating S3 buckets from public to private access via CloudFront and relocating EC2 instances across regions, strengthening data protection and reducing latency.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="DataRigel"
                  role="Lahore, Pakistan"
                  collapsible={true}
                  link=""
                >
                  <div className="space-y-2">
                    <p>Software Engineer Intern</p>
                    <p>Feb 2026 – Apr 2026</p>
                    <p>• Shipped 8+ production features for an Android IoT app using React Native and TypeScript, integrating real-time data streaming from pressure and air sensors across 4 agile sprints.</p>
                    <p>• Resolved 8–10 bugs through APK-level QA cycles in collaboration with the testing team, improving app stability and reducing post-release defects.</p>
                    <p>• Streamlined IoT device communication layer enabling live sensor data exchange between hardware and mobile interface, eliminating manual data handling.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Netsol Technologies Inc."
                  role="Lahore, Pakistan"
                  collapsible={true}
                  link=""
                >
                  <div className="space-y-2">
                    <p>Software Engineer Intern</p>
                    <p>Jul 2025 – Aug 2025</p>
                    <p>• Architected RESTful APIs using Node.js and Express.js, connecting PostgreSQL database to React frontend, reducing latency by 15% during peak usage.</p>
                    <p>• Constructed 3+ internal utility tools and backend services under mentorship, improving system functionality and reducing maintenance time by 30%.</p>
                    <p>• Optimized relational data models, integrating 5+ frontend interfaces with backend APIs to support real-time data updates and seamless user interactions.</p>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Projects
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="SmartHire"
                  role="Next.js 16, TypeScript, Supabase, Gemini API, Clerk, Tailwind CSS, Vercel"
                  collapsible={true}
                  link="https://smarthire.website/"
                >
                  <div className="space-y-2">
                    <p>• Cut resume screening time by 78% — ranked 100 applications in under 3 seconds via NLP semantic matching, replacing 3–5 hours of manual recruiter review.</p>
                    <p>• Launched an end-to-end 6-stage AI recruitment pipeline with 19 REST API endpoints, 8 feature modules, and dual role-based workflows for recruiters and candidates using Next.js 16 and FastAPI.</p>
                    <p>• Authored 38 reusable TypeScript React components with shadcn/ui and React Query caching, powering 12 responsive dashboard pages across recruiter and candidate roles.</p>
                    <p className="pt-1">
                      <a href="https://github.com/khizar925/SmartHire" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors mr-4">GitHub</a>
                      <a href="https://smarthire.website/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">Live Demo</a>
                    </p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="AskYourDocs"
                  role="Next.js, FastAPI, ChromaDB, Ollama, AWS EC2, Clerk, Supabase"
                  collapsible={true}
                  link="https://rag-chat-ai-webapp.vercel.app/"
                >
                  <div className="space-y-2">
                    <p>• Implemented a document Q&A app using RAG with ChromaDB vector database and FastAPI to enable semantic search and context-aware responses from uploaded PDFs.</p>
                    <p>• Deployed a local AI model on AWS EC2 via Ollama for 100% private inference; integrated Clerk auth and Supabase for real-time streaming with sub-500ms auth latency.</p>
                    <p className="pt-1">
                      <a href="https://github.com/khizar925/rag-chat-ai-webapp" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors mr-4">GitHub</a>
                      <a href="https://rag-chat-ai-webapp.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">Live Demo</a>
                    </p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="ResumeBoost"
                  role="React, Node.js, LLM"
                  collapsible={true}
                  link="https://resume-boost-theta.vercel.app/"
                >
                  <div className="space-y-2">
                    <p>• Built an AI-powered resume optimizer that converts poor ATS-formatted resumes into well-structured, high-scoring ATS resumes using LLM-driven analysis and formatting.</p>
                    <p className="pt-1">
                      <a href="https://github.com/khizar925/ResumeBoost" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors mr-4">GitHub</a>
                      <a href="https://resume-boost-theta.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">Live Demo</a>
                    </p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="MockHire"
                  role="React, Node.js, Express.js, Clerk, Tailwind CSS"
                  collapsible={true}
                  link="https://mock-hire-frontend.vercel.app/"
                >
                  <div className="space-y-2">
                    <p>• Designed an AI-powered mock interview simulator with voice interaction, emotion detection, and adaptive questioning, increasing interview readiness by 35%.</p>
                    <p>• Secured sessions with Clerk and JWT; crafted a progress-tracking dashboard to monitor performance history across sessions.</p>
                    <p className="pt-1">
                      <a href="https://github.com/khizar925/mockhire" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors mr-4">GitHub</a>
                      <a href="https://mock-hire-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">Live Demo</a>
                    </p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="GadgetBoard"
                  role="React, PostgreSQL, Express.js, Node.js, Tailwind CSS, Gemini API, DaisyUI"
                  collapsible={true}
                  link="https://github.com/khizar925/gadgetboard"
                >
                  <div className="space-y-2">
                    <p>• Built a customizable dashboard with 2+ modular gadgets using React and DaisyUI, improving UI scalability and reducing development time by 25%.</p>
                    <p>• Integrated Gemini API for AI-driven conversational gadgets, enabling real-time intelligent interactions and enhancing engagement by 40%.</p>
                    <p>• Secured user access with JWT authentication, Google OAuth, and bcrypt encryption, reducing unauthorized API access attempts by 90%.</p>
                    <p className="pt-1">
                      <a href="https://github.com/khizar925/gadgetboard" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                    </p>
                  </div>
                </ExperienceItem>
              </div>
            </div>


            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Lahore Garrison University"
                  role="Software Engineering"
                >
                  <p>2022 - 2026</p>
                </ExperienceItem>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Certifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-base text-gray-600 dark:text-gray-400">
                  <span>•</span>
                  <span>
                    Claude Code in Action — Anthropic{" "}
                    <a href="https://verify.skilljar.com/c/rqkxjbgctqau" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                      Certificate
                    </a>
                  </span>
                </div>
                <div className="flex items-start gap-2 text-base text-gray-600 dark:text-gray-400">
                  <span>•</span>
                  <span>
                    CS50x: Introduction to Computer Science — Harvard University{" "}
                    <a href="https://drive.google.com/file/d/1YsOnwboIJm7RjnIuduEPE-YD640_zdER/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                      Certificate
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Contributions Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div>


            {/* Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                I&apos;m a generalist at heart who can build with anything, but here&apos;s the core stack I&apos;ve spent the most time with:
              </p>
              <TechStack />
            </div>


            {/* Writings & Blogs Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Writings & Blogs
              </h2>
              <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                I host my thoughts on{" "}
                <a
                  href="https://medium.com/@khizarqamar06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white underline underline-offset-4 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Medium
                </a>{" "}
                rather than building a custom site. Instead of overengineering and reinventing the wheel, I prefer leveraging a mature platform that lets me focus on what matters: sharing insights on AI systems, product strategy, and technical architecture.
              </p>
            </div>


            {/* Thing about me Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Thing about me
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  Beyond engineering and build systems, I find balance in the tactile and the thoughtful. Whether it&apos;s exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.
                </p>

                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  I believe that the best products are built by people who have a diverse range of interests. It&apos;s the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.
                </p>
              </div>
            </div>

            {/* Get in Touch Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/khizarqamar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "} shoot an {" "}
                  <a
                    href="mailto:khizarqamar@gmail.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    email
                  </a>
                </p>
              </div>
            </div>



          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <a
          href="https://github.com/khizar925"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/khizarqamar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/khizarqamar05"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a
          href="https://drive.google.com/file/d/1fWvW0FyCditEiskNVPAejF4GqyJaguwW/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          title="View Resume"
        >
          <FileText className="h-5 w-5" />
        </a>
      </nav>
    </div >
  );
}

