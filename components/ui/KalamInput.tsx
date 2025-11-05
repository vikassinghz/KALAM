"use client";

import React, { useState } from "react";
import { Textarea } from "./textarea.tsx";
import { cn } from "../../lib/utils.ts";
import { useAutoResizeTextarea } from "../hooks/use-auto-resize-textarea.tsx";
import { ArrowUp, Paperclip } from "lucide-react";

interface KalamInputProps {
  onSubmit: (value: string) => void;
  onFileSelect?: (file: File | null) => void;
  placeholder: string;
  showWordLimit: boolean;
  wordLimit: string;
  onWordLimitChange: (value: string) => void;
  isLoading: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export function KalamInput({
  onSubmit,
  onFileSelect,
  placeholder,
  showWordLimit,
  wordLimit,
  onWordLimitChange,
  isLoading,
  minHeight = 120,
  maxHeight = 400,
}: KalamInputProps) {
  const [value, setValue] = useState("");
  const { textareaRef } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });

  const handleSubmit = () => {
    if (!isLoading && value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = !isLoading && value.trim() !== '';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg cursor-text"
        onPointerDown={(e) => {
          // If the user clicked on an interactive control, don't hijack the event
          const target = e.target as HTMLElement | null;
          const interactiveTags = ['BUTTON', 'INPUT', 'LABEL', 'A', 'SELECT', 'TEXTAREA'];
          if (target && interactiveTags.includes(target.tagName)) return;
          // Focus the textarea so the whole box becomes interactive for typing
          textareaRef.current?.focus();
        }}
      >
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full px-4 py-3",
              "resize-none",
              "bg-transparent",
              "border-none",
              "text-white text-base",
              "focus:outline-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-neutral-400 placeholder:text-base",
               "pt-3"
            )}
            style={{
              overflow: "hidden",
              minHeight: `${minHeight}px`,
            }}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center gap-2">
            {showWordLimit && (
              <input
                type="number"
                value={wordLimit}
                onChange={(e) => onWordLimitChange(e.target.value)}
                placeholder="Words"
                className="w-24 px-2 py-1.5 rounded-lg text-sm bg-black/20 text-white transition-colors border border-dashed border-white/20 focus:border-white/40 focus:outline-none"
                disabled={isLoading}
              />
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                canSubmit
                  ? "bg-white text-black"
                  : "bg-white/10 text-gray-400"
              )}
            >
              <ArrowUp className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}