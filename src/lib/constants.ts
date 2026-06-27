import { Project, Skill, SkillCategory, SocialLink, Competition, GalleryImage } from "./types";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Competitions", href: "#competitions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact Me", href: "#contact" },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "github",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "instagram",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Enroll360: Enrollment Management System",
    description:
      "Designed and developed Enroll360, a web-based school enrollment and payment management system that streamlines student enrollment, re-enrollment, payment tracking, document submission, reporting, and communication between schools and parents through a centralized digital platform.",
    image: "/images/enroll360.png",
    tag: "Web-Based",
    year: "2025",
    role: "Back-end Developer",
    githubUrl: "https://github.com/ja-ct10/School-Management-System.git",
  },
  {
    title: "iBrgy",
    description:
      "Created iBrgy, a mobile application for barangay certificate requests and community communication that enables residents to request certificates digitally, receive updates and announcements, and communicate efficiently with barangay officials through a centralized platform.",
    image: "/images/ibrgy.png",
    tag: "Mobile App",
    year: "2026",
    role: "Full Stack Developer",
    client: "None",
    githubUrl: "https://github.com/ja-ct10/Barangay-Management-System.git",
  },
  {
    title: "CoinStrike",
    description:
      "Developed CoinStrike, a browser-playable 2D side-scrolling action platformer featuring procedurally generated levels, mission-based progression, weapon combat, combo mechanics, power-ups, score tracking, and a final boss battle that challenges players to survive, complete objectives, and achieve high scores.",
    image: "/images/coinstrike.png",
    tag: "2D Side-scrolling Game",
    year: "2026",
    role: "Full Stack Developer",
    githubUrl: "https://github.com/ja-ct10/CoinStrike.git",
  },
];

export const SKILLS: Skill[] = [
  { label: "HTML" },
  { label: "CSS" },
  { label: "Javascript" },
  { label: "TypeScript" },
  { label: "React" },
  { label: "Next.js" },
  { label: "Tailwind Css" },
  { label: "Figma" },
  { label: "Java" },
  { label: "C#" },
  { label: "Python" },
  { label: "Node.js" },
  { label: "Express.js" },
  { label: "PostreSQL" },
  { label: "MySQL" },
  { label: "SQL Server" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { label: "HTML5" },
      { label: "CSS3" },
      { label: "JavaScript" },
      { label: "TypeScript" },
      { label: "React" },
      { label: "Next.js" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { label: "Java" },
      { label: "C#" },
      { label: "Python" },
      { label: "Node.js" },
      { label: "Express.js" },
      { label: "PostgreSQL" },
      { label: "MySQL" },
      { label: "SQL Server" },
    ],
  },
  {
    title: "Mobile",
    icon: "📱",
    skills: [
      { label: "Android" },
      { label: "Firebase" },
    ],
  },
  {
    title: "Developer Tools",
    icon: "🛠️",
    skills: [
      { label: "Git" },
      { label: "GitHub" },
      { label: "VS Code" },
      { label: "Kiro" },
      { label: "Jira" },
      { label: "Postman" },
      { label: "Figma" },
      { label: "Trello" },
    ],
  },
];

export const COMPETITIONS: Competition[] = [
  {
    title: "Android Hackathon",
    achievement: "2nd Placer",
    image: "/images/android-hackathon.jpg",
    description:
      "Within a limited time, we were tasked with designing and developing a mobile application based on an e-commerce platform, with the goal of creating a functional and user-friendly app that demonstrates a complete ordering process during the Android Hackathon, a competition under Collaboratech 2026. We were able to create an application named ShopLift, where I served as the main developer, and our team won 2nd place.",
  },
  {
    title: "Tagisan ng Talino: Code Fest",
    achievement: "2nd Placer",
    image: "/images/code-fest.jpg",
    description:
      "We competed in Tagisan ng Talino: CodeFest, a local-level mobile app hackathon, where we were tasked to develop an Android application focused on managing construction inventory and handling the borrowing and returning of construction equipment. The system also required features such as tracking item availability, recording transactions, and generating PDF reports for documentation and monitoring purposes. As the main developer, I was able to design and implement a functional and user-friendly interface, including core features for inventory management and equipment borrowing/returning workflows. The application also emphasized accurate record keeping and efficient data management to support real-world construction site operations.",
  },
  {
    title: "hack-it! The New Era of Banking",
    achievement: "Participant",
    image: "/images/hackathon.jpg",
    description:
      "We competed with 12 teams in the 2-day hackathon event hack-It! The New Era of Banking, presenting LifeGard as our contribution—an AI-assisted life insurance system designed to improve underwriting efficiency and application processing speed. LifeGard uses machine learning trained on historical approved and rejected applications to adapt risk assessments based on each insurance company's criteria, including factors such as age and medical conditions. As a decision-support tool, it streamlines the evaluation process while still requiring human underwriters for complex cases such as fraud detection and final approval. Although this was our first hackathon event and we did not win, the experience provided us with valuable learning opportunities and strengthened our skills in innovation, teamwork, and system development.",
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/hackathon-3.jpeg",
    alt: "Hackathon event team collaboration",
    caption: "Hackathon Event",
  },
  {
    src: "/images/hackathon-2.jpg",
    alt: "Hackathon team working on project",
    caption: "Team Collaboration",
  },
  {
    src: "/images/hackathon-1.jpg",
    alt: "Hackathon presentation moment",
    caption: "Presenting Our Work",
  },
  {
    src: "/images/symph-workshop-1.png",
    alt: "Symph workshop session 1",
    caption: "Symph Workshop",
  },
  {
    src: "/images/symph-workshop-3.png",
    alt: "Symph workshop session 3",
    caption: "Workshop Activities",
  },
  {
    src: "/images/symph-workshop-4.png",
    alt: "Symph workshop session 4",
    caption: "Learning New Skills",
  },
  {
    src: "/images/symph-workshop.png",
    alt: "Symph workshop group photo",
    caption: "Workshop Group Photo",
  },
  {
    src: "/images/it-olympics.jpeg",
    alt: "IT Olympics competition",
    caption: "IT Olympics",
  },
  {
    src: "/images/android-hackathon.jpg",
    alt: "Android hackathon competition",
    caption: "Android Hackathon",
  },
  {
    src: "/images/code-fest.jpg",
    alt: "Code Fest programming competition",
    caption: "Code Fest",
  },
];

export const OWNER = {
  name: "Julie Ann Tiron",
  email: "tironjulieann10@gmail.com",
  role: "Aspiring Back-end Developer",
  bio: "I am fourth-year BS Information student aspiring to become a cybersecurity professional, database administrator, or back-end developer.",
  bioExtended:
    "Pursuing this career path isn't easy, especially for someone who doesn't have a strong background in technology. There were times when I struggled to understand concepts and keep up with technical tasks, but I chose to view those challenges as opportunities to learn and grow. However, through continuous learning, participation in competitions, and guidance from professors who have shared their knowledge and experience, I have gained valuable skills and a deeper understanding of the field. Looking back on my journey, these experiences have shown me how much I have grown and have motivated me to continue striving for my goals despite the challenges along the way.",
} as const;
