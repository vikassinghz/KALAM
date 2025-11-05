import React, { useEffect, useRef } from "react";
import { Section } from "../types.ts";
import { NavBar } from "./ui/tubelight-navbar.tsx";
import { HelpCircle, RefreshCcw, Mail, BookOpen, Share2 } from "lucide-react";

const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

const handleScrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
};

interface HeroSectionProps {
    activeSection: Section;
    setActiveSection: (section: Section) => void;
}

export function HeroSection({ activeSection, setActiveSection }: HeroSectionProps) {
  const gradientRef = useRef<HTMLDivElement>(null);
 
  const handleSectionChange = (section: Section) => {
      const toolsElement = document.getElementById('tools');
      if (toolsElement) {
          setTimeout(() => {
              toolsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
      }
      setActiveSection(section);
  };

  const navItems = [
    { name: Section.Ask, icon: HelpCircle },
    { name: Section.Rewrite, icon: RefreshCcw },
    { name: Section.Mail, icon: Mail },
    { name: Section.Research, icon: BookOpen },
    { name: Section.Post, icon: Share2 }
  ];

  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
        word.style.opacity = '0'; // Start hidden
      }, delay);
    });
 
    // Mouse gradient
    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
 
    // Word hover effects
    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(200, 180, 160, 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });
 
    // Click ripple effect
    function onClick(e: MouseEvent) {
      // Allow default behavior for interactive elements
      if ((e.target as HTMLElement).closest('button, a')) {
        return;
      }
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(200, 180, 160, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);
 
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
    };
  }, []);
 
  return (
    <div
      className="min-h-screen text-[#e6e1d7] font-sans overflow-hidden relative w-full"
    >
      <NavBar 
        items={navItems}
        activeSection={activeSection}
        onSectionClick={handleSectionChange}
      />

      <div className="relative z-10 min-h-screen flex flex-col justify-between items-center px-8 pt-28 pb-12 md:px-16 md:pt-32 md:pb-20">
        <div className="text-center">
          <h2
            className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
            style={{ color: colors[200] }}
          >
            <span className="word inline-block" data-delay="0">
              Welcome
            </span>{" "}
            <span className="word inline-block" data-delay="200">
              to
            </span>{" "}
            <span className="word inline-block" data-delay="400">
              <b>Kalam AI</b>
            </span>{" "}
            <span className="word inline-block" data-delay="600">
              —
            </span>{" "}
            <span className="word inline-block" data-delay="800">
              Powering
            </span>{" "}
            <span className="word inline-block" data-delay="1000">
              your
            </span>{" "}
            <span className="word inline-block" data-delay="1200">
              creative
            </span>{" "}
            <span className="word inline-block" data-delay="1400">
              writing.
            </span>
          </h2>
          <div
            className="mt-4 w-16 h-px mx-auto opacity-30"
            style={{
              background: `linear-gradient(to right, transparent, ${colors[200]}, transparent)`,
            }}
          ></div>
        </div>
 
        <div className="text-center max-w-5xl mx-auto">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight"
            style={{ color: colors[50] }}
          >
            <div className="mb-4 md:mb-6">
              <span className="word inline-block" data-delay="1600">
                Unleash
              </span>{" "}
              <span className="word inline-block" data-delay="1750">
                Your
              </span>{" "}
              <span className="word inline-block" data-delay="1900">
                Writing
              </span>{" "}
              <span className="word inline-block" data-delay="2050">
                Potential
              </span>{" "}
              <span className="word inline-block" data-delay="2200">
                with
              </span>{" "}
              <span className="word inline-block" data-delay="2350">
                AI.
              </span>
            </div>
            <div
              className="text-2xl md:text-3xl lg:text-4xl font-thin leading-relaxed"
              style={{ color: colors[200] }}
            >
              <span className="word inline-block" data-delay="2600">
                Create,
              </span>{" "}
              <span className="word inline-block" data-delay="2750">
                rewrite,
              </span>{" "}
              <span className="word inline-block" data-delay="2900">
                and
              </span>{" "}
              <span className="word inline-block" data-delay="3050">
                research
              </span>{" "}
              <span className="word inline-block" data-delay="3200">
                —
              </span>{" "}
              <span className="word inline-block" data-delay="3350">
                all
              </span>{" "}
              <span className="word inline-block" data-delay="3500">
                in
              </span>{" "}
              <span className="word inline-block" data-delay="3650">
                one
              </span>{" "}
              <span className="word inline-block" data-delay="3800">
                secure
              </span>{" "}
              <span className="word inline-block" data-delay="3950">
                platform.
              </span>
            </div>
             <button
                onClick={handleScrollToTools}
                className="word inline-block mt-12 px-6 py-3 text-sm font-semibold border rounded-full transition-all duration-300 hover:bg-white/10"
                data-delay="4100"
                style={{ borderColor: 'rgba(230, 225, 215, 0.3)' }}
              >
                Get Started
              </button>
          </h1>
        </div>
 
        <div className="text-center">
          <div
            className="mb-4 w-16 h-px mx-auto opacity-30"
            style={{
              background: `linear-gradient(to right, transparent, ${colors[200]}, transparent)`,
            }}
          ></div>
          <h2
            className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
            style={{ color: colors[200] }}
          >
            <span className="word inline-block" data-delay="4400">
              Human-like
            </span>{" "}
            <span className="word inline-block" data-delay="4550">
              text,
            </span>{" "}
            <span className="word inline-block" data-delay="4700">
              plagiarism-free
            </span>{" "}
            <span className="word inline-block" data-delay="4850">
              content,
            </span>{" "}
            <span className="word inline-block" data-delay="5000">
              enterprise-grade
            </span>{" "}
            <span className="word inline-block" data-delay="5150">
              quality.
            </span>
          </h2>
          <div
            className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "4.5s",
            }}
          >
            <div
              className="w-1 h-1 rounded-full opacity-40"
              style={{ background: colors[200] }}
            ></div>
            <div
              className="w-1 h-1 rounded-full opacity-60"
              style={{ background: colors[200] }}
            ></div>
            <div
              className="w-1 h-1 rounded-full opacity-40"
              style={{ background: colors[200] }}
            ></div>
          </div>
        </div>
      </div>
 
      <div
        id="mouse-gradient"
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background: `radial-gradient(circle, rgba(107, 85, 69, 0.05) 0%, transparent 100%)`,
        }}
      ></div>
    </div>
  );
}
