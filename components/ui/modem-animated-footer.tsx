'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Twitter, Linkedin, Github, Mail, Instagram } from 'lucide-react';
import { Section } from '../../types.ts';

const KalamLogo = () => (
	<img
		src="https://res.cloudinary.com/dbxz7gd59/image/upload/v1762267537/Gemini_Generated_Image_gva4uvgva4uvgva4_xrexgg.png"
		alt="Kalam Logo"
		className="w-12 h-12 object-cover rounded-full"
	/>
);

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
    section?: Section;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Tools',
		links: [
			{ title: 'Ask Kalam', href: '#tools', section: Section.Ask },
			{ title: 'Kalam Rewrite', href: '#tools', section: Section.Rewrite },
			{ title: 'Kalam Mail', href: '#tools', section: Section.Mail },
            { title: 'Kalam Research', href: '#tools', section: Section.Research },
			{ title: 'Kalam Post', href: '#tools', section: Section.Post },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#about' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Services', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '#' },
			{ title: 'Help', href: '#' },
		],
	},
	{
		label: 'Social Links',
		links: [
            { title: 'Twitter', href: 'https://x.com/vikassinghz', icon: Twitter },
            { title: 'LinkedIn', href: 'https://www.linkedin.com/in/vikassinghz', icon: Linkedin },
            { title: 'GitHub', href: 'https://github.com/vikassinghz', icon: Github },
            { title: 'Instagram', href: 'https://www.instagram.com/vikassinghz/', icon: Instagram },
            { title: 'Email', href: 'mailto:Work.baghel@gmail.com', icon: Mail },
		],
	},
];

interface FooterProps {
    setActiveSection?: (section: Section) => void;
}

export function Footer({ setActiveSection }: FooterProps) {
	return (
		<footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-white/10 bg-black px-8 py-16 lg:py-24 mt-24">
			<div className="bg-foreground/10 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-12">
				<AnimatedContainer className="space-y-6">
					<KalamLogo /> 
                    <p className="text-white/80 mt-8 text-base md:mt-0">
						© {new Date().getFullYear()} Kalam AI. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
							<div key={section.label}>
								<AnimatedContainer delay={0.1 + index * 0.1}>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm text-white font-semibold uppercase tracking-wider">{section.label}</h3>
										<ul className="text-white/70 mt-6 space-y-3 text-base">
											{section.links.map((link) => (
												<li key={link.title}>
													<a
														href={link.href}
														className="hover:text-white inline-flex items-center gap-2 transition-all duration-300"
														onClick={(e) => {
                                                            if (link.section && setActiveSection) {
                                                                e.preventDefault();
                                                                const toolsElement = document.getElementById('tools');
                                                                if (toolsElement) {
                                                                    toolsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                }
                                                                setTimeout(() => {
                                                                    setActiveSection(link.section!);
                                                                }, 100);
                                                            } else if (link.href.startsWith('#')) {
                                                                e.preventDefault();
                                                                const element = document.getElementById(link.href.substring(1));
                                                                if (element) {
                                                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                }
                                                            }
                                                        }}
                                                        target={!link.section && !link.href.startsWith('#') && !link.href.startsWith('mailto:') ? '_blank' : undefined}
                                                        rel={!link.section && !link.href.startsWith('#') && !link.href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
													>
														{link.icon && <link.icon className="me-2 size-4" />}
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							</div>
						))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
