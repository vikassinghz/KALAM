"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Section } from "../../types.ts"

interface NavItem {
  name: Section
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeSection: Section
  onSectionClick: (section: Section) => void
}

export function NavBar({ items, className, activeSection, onSectionClick }: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        // Make the overall wrapper non-interactive so clicks pass through
        // empty regions to underlying elements (like the input). Interactive
        // controls inside will explicitly enable pointer-events.
        "fixed bottom-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 bg-black/30 border border-white/10 backdrop-blur-lg p-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.name

          return (
            <button
              key={item.name}
              onClick={() => onSectionClick(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors flex items-center gap-2 z-10",
                "text-gray-300 hover:text-white",
                isActive ? "text-white" : "",
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="hidden md:inline">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute hidden sm:block -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
