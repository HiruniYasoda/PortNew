export type Category = 'Web Projects' | 'Mobile App' | 'Systems' | 'Concept & UX';

export interface Project {
  id: string;
  category: Category;
  title: string;
  github?: string;
  demo?: string;
  figma?: string;
  image: string;
  shortDesc: string;
  concept: string;
  innovativeness: string;
  problems: string;
  learned: string;
}

export const getEmbedUrl = (url?: string) => {
  if (!url) return null;
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (url.includes('youtube.com/watch')) {
    const id = new URLSearchParams(url.split('?')[1]).get('v');
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  return url;
};

export const projectsData: Project[] = [
  // --- WEB PROJECTS ---
  {
    id: "visit-sl",
    category: "Web Projects",
    title: "Visit Sri Lanka",
    github: "https://github.com/HiruniYasoda/Visit_Sri_Lanka_1",
    demo: "https://www.linkedin.com/posts/hiruni-sethmini_react-javascript-frontenddevelopment-activity-7258187842411991041-b1R7",
    image: "VisitSL.png",
    shortDesc: "React-based tourism website with modular components, responsive layouts, and structured destination-focused content presentation.",
    concept: "Visit Sri Lanka is a digital tourism promotion platform designed to showcase destinations, culture, and experiences across Sri Lanka, helping users explore and plan travel visually and intuitively.",
    innovativeness: "The platform modernizes tourism promotion by shifting from static brochures to an interactive, experience-driven digital exploration model.",
    problems: "Ensuring inclusive representation of diverse regions and balancing aesthetic appeal with informational accuracy.",
    learned: "Tourism-oriented web design, React component structuring, responsive UI thinking, and content-driven user experience design."
  },
  {
    id: "veloresq",
    category: "Web Projects",
    title: "VeloresQ",
    github: "https://github.com/Jithmi25/veloresq-frontend",
    demo: "https://www.linkedin.com/posts/jithmi-wickramasinghe_ideaigniters-frontendprototype-webdevelopment-ugcPost-7359559154409041920-lX9Y",
    image: "VeloresQ.png",
    shortDesc: "Frontend prototype demonstrating garage booking, emergency services, and admin workflows using structured React-based UI.",
    concept: "VeloresQ is a garage booking and emergency vehicle support web application prototype. It allows users to search garages, book services, request emergency assistance, and view AI-based diagnosis insights, while admins manage system-level views through dashboards.",
    innovativeness: "This is a highly innovative concept because it integrates garage services, emergency response, AI diagnostics, and administration into one unified platform—a solution rarely centralized in existing systems.",
    problems: "Integrating emergency services involves coordination with legal authorities, real-time infrastructure, and trust-based service availability, making real-world implementation complex.",
    learned: "User-centered system design, transforming real-life service gaps into digital solutions, frontend prototyping, and feature prioritization under constraints."
  },
  {
    id: "solarshare",
    category: "Web Projects",
    title: "SolarShare",
    github: "https://github.com/Jithmi25/iwb25-127-idea-igniters",
    demo: "https://youtu.be/jEe5t3WUAJU",
    image: "SolarShare.jpg",
    shortDesc: "Conceptual web platform visualizing peer-to-peer solar energy sharing through interactive and sustainability-driven UI.",
    concept: "SolarShare enables users to share excess solar energy within communities, encouraging renewable energy usage and collective sustainability participation.",
    innovativeness: "Introduces decentralized energy sharing using digital platforms, empowering communities rather than centralized providers.",
    problems: "Energy regulations, grid compatibility, government approvals, and legal frameworks make real-world execution challenging.",
    learned: "Green-tech innovation thinking, feasibility analysis, sustainability economics, and designing systems beyond pure technology."
  },
  {
    id: "terrasave",
    category: "Web Projects",
    title: "TerraSave",
    github: "https://github.com/Jithmi25/TerraSave",
    demo: "https://youtu.be/CbnSi5gy3us",
    image: "Terrasave.jpg",
    shortDesc: "Gamified web platform linking real-world tree planting to digital progress tracking and reward-based engagement.",
    concept: "TerraSave is a gamified environmental platform where users plant trees in real life, and each tree grows digitally in a virtual forest. Users earn badges, maintain streaks, and track impact through levels and achievements.",
    innovativeness: "Transforms environmental action into a game-driven social movement, motivating sustained participation through rewards and emotional engagement.",
    problems: "Verifying real-world tree planting, maintaining long-term user motivation, and coordinating with environmental organizations.",
    learned: "Gamification strategy, social impact design, user motivation psychology, and sustainability-driven platform thinking."
  },
  {
    id: "portfolio",
    category: "Web Projects",
    title: "Portfolio",
    github: "https://github.com/HiruniYasoda/PortNew",
    image: "Portfolio.png",
    shortDesc: "Personal React portfolio presenting projects, skills, and learning journey through clean, responsive UI sections.",
    concept: "A personal digital identity platform to showcase projects, technologies, and growth as a developer.",
    innovativeness: "Focuses on storytelling and clarity instead of visual overload.",
    problems: "Deciding what truly represents skills and growth authentically.",
    learned: "Personal branding, technical storytelling, and professional presentation."
  },
  {
    id: "exam-ms",
    category: "Web Projects",
    title: "Exam Management System",
    github: "https://github.com/HiruniYasoda/SC-CLIENT",
    image: "ResMs.png",
    shortDesc: "Academic management system supporting exam scheduling, user roles, and result handling via structured frontend logic.",
    concept: "Digitizes exam workflows for institutions, improving efficiency and transparency.",
    innovativeness: "Reduces administrative overhead through centralized digital exam management.",
    problems: "Adapting rigid academic policies into flexible digital systems.",
    learned: "System analysis, institutional workflow modeling, and business-oriented solution thinking."
  },
  
  // --- MOBILE APP ---
  {
    id: "leo-connect",
    category: "Mobile App",
    title: "Leo Connect",
    github: "https://github.com/HiruniYasoda/leo_frontend",
    demo: "https://youtu.be/9S_QIyozDaU",
    image: "LeoConnect.jpg",
    shortDesc: "Integrated mobile platform combining social feeds, messaging, marketplace, and networking using React Native and TypeScript.",
    concept: "Leo Connect is not just an app—it is an all-in-one digital ecosystem that integrates social feeds, chat, marketplace, and community interaction into a single mobile experience.",
    innovativeness: "Instead of multiple fragmented apps, Leo Connect centralizes daily digital interactions into one seamless platform.",
    problems: "Managing feature complexity while keeping the app intuitive and user-friendly.",
    learned: "Mobile-first system thinking, React Native, TypeScript, scalable feature integration, and UX simplification."
  },

  // --- SYSTEMS ---
  {
    id: "library-ms",
    category: "Systems",
    title: "Library Management System",
    github: "https://github.com/HiruniYasoda/Library-management-system",
    image: "library.png", 
    shortDesc: "C# .NET-based system managing books, users, and lending workflows with structured CRUD operations.",
    concept: "Automates traditional library processes.",
    innovativeness: "Improves accuracy and operational efficiency.",
    problems: "User adoption and real-world data handling.",
    learned: "C# .NET, database interaction, and system logic design."
  },
  {
    id: "ticket-booking",
    category: "Systems",
    title: "Ticket Booking System",
    github: "https://github.com/HiruniYasoda/Ticket_Booking_V1",
    image: "ticket.png", 
    shortDesc: "Java-based booking system handling reservations, availability logic, and user interaction workflows.",
    concept: "Digitizes ticket booking processes.",
    innovativeness: "Automates booking decision logic.",
    problems: "Conflict handling and user expectations.",
    learned: "Java programming and real-world logic modeling."
  },
  {
    id: "currency-converter",
    category: "Systems",
    title: "Simple Currency Converter",
    github: "https://github.com/HiruniYasoda/Simple_Currency_Converter",
    image: "currency.png", 
    shortDesc: "Java application converting currencies using conditional logic and structured input validation.",
    concept: "Simplifies currency conversion tasks.",
    innovativeness: "Provides quick financial calculation support.",
    problems: "Accuracy and validation.",
    learned: "Core Java logic and validation handling."
  },
  {
    id: "residence-ms",
    category: "Systems",
    title: "Residence Maintenance Manage System",
    github: "https://github.com/HiruniYasoda/Competition",
    image: "residence.png", 
    shortDesc: "Java-based system managing residential maintenance requests, records, and administrative workflows.",
    concept: "Centralizes housing maintenance management.",
    innovativeness: "Brings structure to informal maintenance processes.",
    problems: "Handling diverse user priorities.",
    learned: "System design and real-world problem abstraction."
  },

  // --- CONCEPT & UX ---
  {
    id: "mochi-health",
    category: "Concept & UX",
    title: "Mochi Health",
    figma: "https://www.figma.com/design/l3vP5pHh4rnF4JjH1MSLtf/Pearlhack",
    image: "mochi.png", 
    shortDesc: "IoT health concept using breath-based sensor device to analyze mood, meals, and medication patterns.",
    concept: "A health-monitoring sensor ball that collects data through breath, enabling mood tracking, meal suggestions, and medicine monitoring.",
    innovativeness: "Introduces non-invasive, breath-based health analytics.",
    problems: "Medical accuracy, ethical concerns, and healthcare regulations.",
    learned: "IoT concept design, health-tech ethics, and innovation feasibility analysis."
  },
  {
    id: "cospace",
    category: "Concept & UX",
    title: "Cospace (IX_2025)",
    figma: "https://www.figma.com/design/l3vP5pHh4rnF4JjH1MSLtf/IX",
    demo: "https://youtu.be/uaiiCh_pgBY",
    image: "cospace.png", 
    shortDesc: "UX-focused platform concept for managing shared spaces, collaboration, and coordinated user interactions.",
    concept: "A digital system to organize and manage shared physical spaces and collaborative environments.",
    innovativeness: "Bridges digital coordination with physical collaboration spaces.",
    problems: "Legal policies, operational constraints, and real-world feasibility.",
    learned: "Design thinking, UX research, and innovation planning."
  }
];