/**
 * Skill icon URL mappings using Devicon CDN.
 * Pattern: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-original.svg
 *
 * For skills not available on Devicon (e.g., Kiro), inline SVG path data is provided instead.
 */

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/**
 * Maps each skill label (as used in SKILL_CATEGORIES) to its Devicon CDN URL.
 * Uses colored/original versions where available.
 */
export const SKILL_ICON_URLS: Record<string, string> = {
  // Frontend
  "HTML5": `${DEVICON_BASE}/html5/html5-original.svg`,
  "CSS3": `${DEVICON_BASE}/css3/css3-original.svg`,
  "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "TypeScript": `${DEVICON_BASE}/typescript/typescript-original.svg`,
  "React": `${DEVICON_BASE}/react/react-original.svg`,
  "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  "Tailwind CSS": `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,

  // Backend
  "Java": `${DEVICON_BASE}/java/java-original.svg`,
  "C#": `${DEVICON_BASE}/csharp/csharp-original.svg`,
  "Python": `${DEVICON_BASE}/python/python-original.svg`,
  "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Express.js": `${DEVICON_BASE}/express/express-original.svg`,
  "PostgreSQL": `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  "MySQL": `${DEVICON_BASE}/mysql/mysql-original.svg`,
  "SQL Server": `${DEVICON_BASE}/microsoftsqlserver/microsoftsqlserver-plain.svg`,

  // Mobile
  "Android": `${DEVICON_BASE}/android/android-original.svg`,
  "Firebase": `${DEVICON_BASE}/firebase/firebase-original.svg`,

  // Developer Tools
  "Git": `${DEVICON_BASE}/git/git-original.svg`,
  "GitHub": `${DEVICON_BASE}/github/github-original.svg`,
  "VS Code": `${DEVICON_BASE}/vscode/vscode-original.svg`,
  "Kiro": "", // No Devicon available — uses inline SVG (see KIRO_ICON_SVG below)
  "Jira": `${DEVICON_BASE}/jira/jira-original.svg`,
  "Postman": `${DEVICON_BASE}/postman/postman-original.svg`,
  "Figma": `${DEVICON_BASE}/figma/figma-original.svg`,
  "Trello": `${DEVICON_BASE}/trello/trello-original.svg`,
} as const;

/**
 * Inline SVG path for Kiro (sparkle/star icon) since it's not available on Devicon.
 * Render this as an inline <svg> element.
 */
export const KIRO_ICON_SVG = {
  viewBox: "0 0 24 24",
  paths: [
    "M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z",
  ],
  fill: "#6366f1",
} as const;

/**
 * Inline SVG data for category icons.
 * Each category uses a custom icon rendered as an inline <svg>.
 */
export const CATEGORY_ICON_SVGS: Record<
  string,
  { viewBox: string; paths: string[]; stroke?: string; fill?: string; strokeWidth?: number }
> = {
  Frontend: {
    viewBox: "0 0 24 24",
    paths: [
      "M16 18L22 12L16 6",
      "M8 6L2 12L8 18",
    ],
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 2,
  },
  Backend: {
    viewBox: "0 0 24 24",
    paths: [
      "M2 5a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V5z",
      "M2 15a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z",
      "M6 7h0",
      "M6 17h0",
    ],
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 2,
  },
  Mobile: {
    viewBox: "0 0 24 24",
    paths: [
      "M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z",
      "M11 18h2",
    ],
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 2,
  },
  "Developer Tools": {
    viewBox: "0 0 24 24",
    paths: [
      "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
    ],
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 2,
  },
} as const;
