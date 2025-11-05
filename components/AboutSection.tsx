import React from "react";
import { DotPattern } from "./ui/dot-pattern";

export const AboutSection: React.FC = () => {
  return (
    <div id="about" className="w-full py-20 sm:py-32 text-[#e6e1d7] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10">
        <DotPattern />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24">
        {/* About Kalam */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image container with circle */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c8b4a0] to-[#a89080] opacity-20 blur-lg transform -rotate-6"></div>
            <div className="relative h-full w-full rounded-full border border-white/10 overflow-hidden bg-[#2a2e26]/50 backdrop-blur-sm">
              <img
                src="https://res.cloudinary.com/dbxz7gd59/image/upload/v1762267537/Gemini_Generated_Image_gva4uvgva4uvgva4_xrexgg.png"
                alt="AI Writing Assistant"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xs uppercase tracking-widest text-[#a89080]">About Kalam</h3>
            <h2 className="mb-6 mt-1 text-4xl font-bold tracking-tight">
              Your Personal <span className="text-[#c8b4a0]">AI Writing Assistant</span>
            </h2>
            <div className="space-y-4 text-[#c8b4a0]/80">
              <p>
                Kalam is an advanced AI writing assistant designed to enhance your writing experience 
                across various domains. From creative content to professional communications, 
                we're here to help you craft the perfect message.
              </p>
              <p>
                Our suite of specialized tools combines the power of artificial intelligence 
                with intuitive design, making it easier than ever to create, edit, and 
                refine your written content.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-white/10 bg-black/20">
                <div className="text-2xl font-bold text-[#c8b4a0]">5+</div>
                <div className="text-sm text-[#a89080]">Specialized Tools</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-black/20">
                <div className="text-2xl font-bold text-[#c8b4a0]">24/7</div>
                <div className="text-sm text-[#a89080]">Availability</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-black/20 col-span-2 md:col-span-1">
                <div className="text-2xl font-bold text-[#c8b4a0]">100%</div>
                <div className="text-sm text-[#a89080]">AI-Powered</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Developer */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Developer Image container with circle - slightly smaller */}
          <div className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c8b4a0] to-[#a89080] opacity-20 blur-lg transform rotate-6"></div>
            <div className="relative h-full w-full rounded-full border border-white/10 overflow-hidden bg-[#2a2e26]/50 backdrop-blur-sm">
              <img
                src="https://avatars.githubusercontent.com/vikassinghz"
                alt="Developer - Vikas Singh"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Developer Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xs uppercase tracking-widest text-[#a89080]">About Developer</h3>
            <h2 className="mb-6 mt-1 text-4xl font-bold tracking-tight">
              Meet the <span className="text-[#c8b4a0]">Creator</span>
            </h2>
            <div className="space-y-4 text-[#c8b4a0]/80">
              <p>
                Hi, I'm Vikas Singh Baghel, a full-stack developer passionate about creating intuitive and powerful AI-powered tools. 
                With Kalam, I aim to make advanced writing assistance accessible to everyone.
              </p>
              <p>
                My focus is on combining cutting-edge AI technology with user-friendly design to create tools that enhance productivity 
                and creativity in writing.
              </p>
            </div>

            {/* Developer Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-white/10 bg-black/20">
                <div className="text-2xl font-bold text-[#c8b4a0]">5+</div>
                <div className="text-sm text-[#a89080]">Years Project Experience</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-black/20">
                <div className="text-2xl font-bold text-[#c8b4a0]">30+</div>
                <div className="text-sm text-[#a89080]">Projects</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-black/20 col-span-2 md:col-span-1">
                <div className="text-2xl font-bold text-[#c8b4a0]">AI</div>
                <div className="text-sm text-[#a89080]">Specialist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};