export interface Project {
  title: string;
  description: string;
  image: string;
  tag?: string;
  year: string;
  role: string;
  client?: string;
  githubUrl?: string;
}

export interface Skill {
  label: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  title: string;
  company?: string;
  dateRange: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "facebook" | "instagram";
}

export interface Competition {
  title: string;
  achievement: string;
  image: string;
  description?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
