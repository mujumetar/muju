import { useEffect, useState } from "react";
import axios from "axios";
import { Link, animateScroll as scroll } from "react-scroll";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Award, MessageSquare, Mail, Moon, Sun, ArrowRight, Star } from "lucide-react";

const API = "https://muju-api.vercel.app/api";

export default function Portfolio() {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [certs, setCerts] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [time, setTime] = useState("");
    const [timezone, setTimezone] = useState("");
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        fetchProfile();
        fetchProjects();
        fetchExperience();
        fetchCerts();
        fetchTestimonials();
        const savedMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedMode);

        // Time update
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
            setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1] || "Local");
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["hero", "projects", "experience", "certifications", "testimonials", "contact"];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API}/profile`);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchExperience = async () => {
        try {
            const response = await axios.get(`${API}/experience`);
            setExperience(response.data);
        } catch (error) {
            console.error("Error fetching experience:", error);
        }
    };

    const fetchCerts = async () => {
        try {
            const response = await axios.get(`${API}/certifications`);
            setCerts(response.data);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${API}/testimonials`);
            setTestimonials(response.data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", String(!darkMode));
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const navItems = [
        { id: "hero", label: "", icon: <Home className="w-4 h-4" /> },
        { id: "projects", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
        { id: "experience", label: "Experience", icon: <User className="w-4 h-4" /> },
        { id: "certifications", label: "Certs", icon: <Award className="w-4 h-4" /> },
        { id: "testimonials", label: "Reviews", icon: <MessageSquare className="w-4 h-4" /> },
        { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
    ];

    const logotitle = "< Muzammil />"
    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="min-h-screen bg-background text-foreground scroll-smooth">
                {/* NAVBAR */}
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
                >
                    <span className="text-sm text-muted-foreground font-medium">{logotitle}</span>
                    <div className="absolute left-1/2 top-13 -translate-x-1/2 flex items-center gap-1 bg-card/80 backdrop-blur-xl  border border-border rounded-full px-2 py-1.5 shadow-soft">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.id}
                                smooth={true}
                                duration={500}
                                spy={true}
                                className={`relative flex items-center gap-2 px-4 my-0 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${activeSection === item.id
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                    }`}
                            >
                                {item.icon}
                                {item.label && <span className="hidden md:inline">{item.label}</span>}
                            </Link>
                        ))}
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium tabular-nums">{time}</span>
                </motion.nav>

                {/* HERO */}
                {profile && (
                    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 gradient-hero">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 mb-8"
                            >
                                <span className="badge-pill">{profile.title}</span>
                                <span className="badge-pill">Available for work</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
                            >
                                {profile.name}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                            >
                                {profile.bio}
                            </motion.p>

                            {/* About Link with Avatar */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            >
                                <button
                                    onClick={() => scroll.scrollToTop()}
                                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 group"
                                >
                                    <img
                                        src={profile.photo}
                                        alt={profile.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                                        About – {profile.name}
                                    </span>
                                </button>

                                <div className="flex gap-3">
                                    <a
                                        href={profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                                    >
                                        Resume
                                    </a>
                                    <Link
                                        to="contact"
                                        smooth={true}
                                        duration={500}
                                        className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors cursor-pointer"
                                    >
                                        Contact Me
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                

                {/* PROJECTS */}
                <motion.section
                    id="projects"
                    className="py-24 px-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Featured Projects</h2>
                        <div className="space-y-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {projects.map((p, index) => (
                                <motion.article
                                    key={p._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-card card-hover">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                                                {p.title}
                                            </h3>
                                            <p className="text-muted-foreground mb-6 line-clamp-2">
                                                {p.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {p.tech?.map((t, i) => (
                                                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <a
                                                    href={p.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group/link"
                                                >
                                                    GitHub
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                                </a>
                                                {p.live && (
                                                    <a
                                                        href={p.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group/link"
                                                    >
                                                        Live Demo
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* EXPERIENCE */}
                <motion.section
                    id="experience"
                    className="py-24 px-6 bg-secondary/30"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <Briefcase className="w-6 h-6 text-foreground" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Experience</h2>
                        </div>
                        <div className="space-y-6">
                            {experience.map((e, index) => (
                                <motion.div
                                    key={e._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-6 border-l-2 border-border"
                                >
                                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-foreground" />
                                    <div className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {e.role} <span className="text-muted-foreground">@ {e.company}</span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {e.startDate} – {e.endDate || "Present"}
                                        </p>
                                        <p className="text-muted-foreground">{e.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* CERTIFICATIONS */}
                <motion.section
                    id="certifications"
                    className="py-24 px-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <Award className="w-6 h-6 text-foreground" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Certifications</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certs.map((c, index) => (
                                <motion.div
                                    key={c._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 card-hover"
                                >
                                    {c.image && (
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={c.image}
                                                alt={c.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-foreground mb-1">{c.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {c.issuer} • {c.year}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* TESTIMONIALS */}
                <motion.section
                    id="testimonials"
                    className="py-24 px-6 bg-secondary/30"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <MessageSquare className="w-6 h-6 text-foreground" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Testimonials</h2>
                        </div>
                        <div className="space-y-6">
                            {testimonials.map((t, index) => (
                                <motion.div
                                    key={t._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
                                >
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(t.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-lg text-foreground italic mb-6">"{t.message}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                            <span className="text-sm font-bold text-secondary-foreground">
                                                {t.name?.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{t.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {t.role} @ {t.company}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* CONTACT */}
                <motion.section
                    id="contact"
                    className="py-24 px-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-12 justify-center">
                            <Mail className="w-6 h-6 text-foreground" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
                        </div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target;
                                try {
                                    await axios.post(`${API}/contact`, {
                                        name: form.elements.namedItem("name").value,
                                        email: form.elements.namedItem("email").value,
                                        message: form.elements.namedItem("message").value,
                                    });
                                    form.reset();
                                    alert("Message sent!");
                                } catch (error) {
                                    console.error("Error sending message:", error);
                                    alert("Failed to send message.");
                                }
                            }}
                            className="p-8 rounded-3xl bg-card border border-border shadow-card space-y-6"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.section>

                {/* FOOTER */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-12 px-6 border-t border-border"
                >
                    <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            {profile?.github && (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                            )}
                            {profile?.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                            )}
                            {profile?.twitter && (
                                <a
                                    href={profile.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                                >
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            © {new Date().getFullYear()} {profile?.name || "My Portfolio"}. All rights reserved.
                        </p>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}

