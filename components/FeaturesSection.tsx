import React from "react";
import { Section } from "../types.ts";
import { ContainerScroll, CardSticky } from "./ui/cards-stack.tsx";

const KALAM_FEATURES = [
  {
    id: "feature-ask",
    title: Section.Ask,
    section: Section.Ask,
    services: ["Content Creation", "Ideation", "Drafting"],
    imageUrl: "https://res.cloudinary.com/dbxz7gd59/image/upload/v1762265650/Gemini_Generated_Image_k04xnik04xnik04x_bpcmc5.png",
  },
  {
    id: "feature-rewrite",
    title: Section.Rewrite,
    section: Section.Rewrite,
    services: ["Paraphrasing", "Editing", "Plagiarism-Free"],
    imageUrl: "https://res.cloudinary.com/dbxz7gd59/image/upload/v1762265649/Gemini_Generated_Image_78ub7e78ub7e78ub_w5l93c.png",
  },
  {
    id: "feature-mail",
    title: Section.Mail,
    section: Section.Mail,
    services: ["Cold Emails", "Professional", "Recruiting"],
    imageUrl: "https://res.cloudinary.com/dbxz7gd59/image/upload/v1762265654/Gemini_Generated_Image_o8hy7so8hy7so8hy_dolo6w.png",
  },
  {
    id: "feature-research",
    title: Section.Research,
    section: Section.Research,
    services: ["Article Generation", "Summarization", "Sources"],
    imageUrl: "https://res.cloudinary.com/dbxz7gd59/image/upload/v1762265650/Gemini_Generated_Image_ds19nnds19nnds19_ed5dqg.png",
  },
  {
    id: "feature-post",
    title: Section.Post,
    section: Section.Post,
    services: ["Social Media", "LinkedIn", "Engagement"],
    imageUrl: "https://res.cloudinary.com/dbxz7gd59/image/upload/v1762265651/Gemini_Generated_Image_8yog5v8yog5v8yog_oatdw5.png",
  },
];


interface FeaturesSectionProps {
    setActiveSection: (section: Section) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ setActiveSection }) => {
    const handleCardClick = (section: Section) => {
        const toolsElement = document.getElementById('tools');
        if (toolsElement) {
             toolsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Use a small timeout to allow scroll to start before section change
        setTimeout(() => {
            setActiveSection(section);
        }, 100);
    };

  return (
    <div className="w-full py-20 sm:py-32 text-[#e6e1d7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center">
                <h3 className="text-xs uppercase tracking-widest text-[#a89080]">Explore Our Tools</h3>
                <h2 className="mb-4 mt-1 text-4xl font-bold tracking-tight">
                    A Glimpse of <span className="text-[#c8b4a0]">What Kalam Offers</span>
                </h2>
                <p className="mx-auto max-w-prose text-sm text-[#c8b4a0]/80">
                    From drafting emails to generating research papers, Kalam is equipped with a specialized tool for every writing task you face.
                </p>
            </div>
            <ContainerScroll className="min-h-[300vh] md:min-h-[400vh] py-12">
                {KALAM_FEATURES.map((project, index) => (
                    <CardSticky
                        key={project.id}
                        index={index}
                        className="w-[90%] mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#2a2e26]/50 backdrop-blur-md cursor-pointer group shadow-2xl"
                        incrementY={50}
                        incrementZ={5}
                        onClick={() => handleCardClick(project.section)}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-black/20">
                            <h2 className="text-2xl font-bold tracking-tighter text-[#e6e1d7]">
                                {project.title}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.services.map((service) => (
                                    <div key={service} className="flex rounded-full bg-white/5 px-3 py-1 border border-white/10">
                                        <span className="text-xs tracking-tighter text-[#c8b4a0]">
                                            {service}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative overflow-hidden h-[300px] md:h-[400px]">
                            <img
                                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                width="1920"
                                height="1080"
                                src={project.imageUrl}
                                alt={`Showcase for ${project.title}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </CardSticky>
                ))}
            </ContainerScroll>
        </div>
    </div>
  )
}