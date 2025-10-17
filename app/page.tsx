"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ContactForm } from "@/components/contact-form" // Import the ContactForm component

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "about", "work", "events", "media", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Zak
                  <br />
                  <span className="text-muted-foreground">Farnworth</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  ICT Technician, passionate about leveraging technology for the
                  <span className="relative inline-block group/stars text-foreground ml-1 z-10">
                    greater good.
                    <span className="absolute -top-1 -left-1 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 -z-10">
                      <span className="absolute inset-0 animate-twinkle">✦</span>
                    </span>
                    <span className="absolute -top-2 right-2 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 delay-100 -z-10">
                      <span className="absolute inset-0 animate-twinkle-delayed">✦</span>
                    </span>
                    <span className="absolute -bottom-1 left-4 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 delay-200 -z-10">
                      <span className="absolute inset-0 animate-twinkle">✦</span>
                    </span>
                    <span className="absolute -bottom-2 right-6 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 delay-150 -z-10">
                      <span className="absolute inset-0 animate-twinkle-delayed">✦</span>
                    </span>
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Bolton, United Kingdom.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">ICT Technician</div>
                  <div className="text-muted-foreground">@ Albany Learning Trust</div>
                  <div className="text-xs text-muted-foreground">March 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Active Directory", "Microsoft 365", "Microsoft Intune", "HaloITSM", "Powershell"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="about"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">About Me</h2>
              <div className="text-sm text-muted-foreground font-mono">WHO AM I</div>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16">
              <div className="lg:col-span-2 flex items-start">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg border border-border">
                  <img
                    src="/officialphoto.jpg"
                    alt="Zak Farnworth"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I'm an ICT Technician based in Bolton, United Kingdom, with a passion for leveraging technology to
                    make a positive impact in education and beyond.
                  </p>
                  <p>
                    My journey in IT began with an apprenticeship at The Quill C of E Trust, where I led cloud
                    migrations, Intune rollouts, automation systems, and HaloITSM implementation; awarded 'Highly
                    Commended' BCS award for IT Infrastructure.
                  </p>
                  <p>
                    Currently, I'm working at Albany Learning Trust, where I continue to develop my expertise in Active
                    Directory, Microsoft 365, and modern IT infrastructure management.
                  </p>
                  <p className="text-foreground">
                    When I'm not working with technology, I'm exploring new ways to automate processes and improve
                    systems for the{" "}
                    <span className="relative inline-block group/stars z-10">
                      greater good.
                      <span className="absolute -top-1 -left-1 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 -z-10">
                        <span className="absolute inset-0 animate-twinkle">✦</span>
                      </span>
                      <span className="absolute -top-2 right-2 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 delay-100 -z-10">
                        <span className="absolute inset-0 animate-twinkle-delayed">✦</span>
                      </span>
                      <span className="absolute -bottom-1 left-4 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 delay-200 -z-10">
                        <span className="absolute inset-0 animate-twinkle">✦</span>
                      </span>
                      <span className="absolute -bottom-2 right-6 w-2 h-2 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-300 delay-150 -z-10">
                        <span className="absolute inset-0 animate-twinkle-delayed">✦</span>
                      </span>
                    </span>
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground font-mono mb-4">EXPERTISE</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Active Directory",
                      "Microsoft 365",
                      "Microsoft Intune",
                      "HaloITSM",
                      "PowerShell",
                      "Cloud Migration",
                      "Automation",
                      "IT Infrastructure",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        → {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2023",
                  role: "IT Apprentice",
                  company: "The Quill C of E Trust",
                  description:
                    "Led our cloud migration, Intune rollout, automation systems, and HaloITSM implementation; awarded 'Highly Commended' BCS for IT Infrastructure.",
                  tech: ["Active Directory", "Microsoft 365", "Microsoft Intune", "HaloITSM"],
                },
                {
                  year: "2025",
                  role: "ICT Technician",
                  company: "ALbany Learning Trust",
                  description: "",
                  tech: ["Active Directory", "Microsoft 365", "Microsoft Deployment Toolkit", "Asset Management"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="events"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Events & Awards</h2>
              <div className="text-sm text-muted-foreground font-mono">SPEAKING & RECOGNITION</div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "ANME Conference 2024",
                  slug: "anme-2024",
                  category: "Speaking",
                  image: "/professional-conference-presentation-technology-ed.jpg",
                },
                {
                  title: "ANME Conference 2023",
                  slug: "anme-2023",
                  category: "Speaking",
                  image: "/network-managers-education-conference-presentation.jpg",
                },
                {
                  title: "Cybrewery Evenings",
                  slug: "cybrewery-evenings",
                  category: "Speaking",
                  image: "/cybersecurity-evening-event-burnley-tech-community.jpg",
                },
                {
                  title: "BCS Highly Commended Award",
                  slug: "bcs-award-2024",
                  category: "Award",
                  image: "/award-trophy-it-infrastructure-recognition-profess.jpg",
                },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={`/events/${item.slug}`}
                  className="group relative overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-500 aspect-[4/3]"
                >
                  <div className="absolute inset-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                  </div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="space-y-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
                        {item.category}
                      </div>
                      <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Read more</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="media"
          ref={(el) => (sectionsRef.current[4] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Media Center</h2>
              <div className="text-sm text-muted-foreground font-mono">PRESS & RESOURCES</div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Professional resources for external trusts, schools, and media inquiries. Access my CV, headshots, and
                  other materials.
                </p>

                <Link
                  href="/media"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <span className="text-foreground">Visit Media Center</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono mb-4">AVAILABLE RESOURCES</div>
                <div className="space-y-3">
                  {[
                    { name: "Curriculum Vitae", type: "PDF Document" },
                    { name: "Professional Headshots", type: "High-Resolution Images" },
                    { name: "Biography", type: "Text & Media" },
                  ].map((resource) => (
                    <div
                      key={resource.name}
                      className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      <div className="text-foreground">{resource.name}</div>
                      <div className="text-sm text-muted-foreground">{resource.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[5] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:zak@farnworth.org.uk"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">zak@farnworth.org.uk</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <div className="text-sm text-muted-foreground font-mono mb-6">SEND A MESSAGE</div>
                <ContactForm />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "LinkedIn", handle: "zakfarnworth", url: "https://www.linkedin.com/in/zakfarnworth" },
                  { name: "GitHub", handle: "@zakfarnworth23", url: "https://github.com/zakfarnworth23" },
                  {
                    name: "Instagram",
                    handle: "@zakfarnworthofficial",
                    url: "https://www.instagram.com/zakfarnworthofficial?igsh=MWQ0MnZqcGtxcjhnYw%3D%3D&utm_source=qr",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">© 2025 Zak Farnworth. All rights reserved.</div>
              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Office of Zak Farnworth</div>
                <img
                  src="/OOZF_Logo.png"
                  alt="Office of Zak Farnworth Logo"
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
