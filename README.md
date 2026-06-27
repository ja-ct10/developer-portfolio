# Julie Ann Tiron — Developer Portfolio

A personal developer portfolio built with Next.js, showcasing projects, skills, competitions, and a gallery of experiences.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Utilities:** clsx, tailwind-merge

## Features

- Responsive single-page layout with smooth scroll navigation
- Animated sections with Framer Motion (fade-ins, parallax, magnetic buttons)
- Project showcase with GitHub links
- Skills organized by category (Frontend, Backend, Mobile, Tools)
- Competition highlights and photo gallery
- Contact form
- Accessibility-first: skip links, semantic HTML, keyboard navigation
- Grain overlay and depth effects for visual polish

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals)
├── components/
│   ├── cards/        # ProjectCard, CompetitionCard
│   ├── layout/       # Navbar, Footer
│   ├── motion/       # Animation components (FadeIn, ParallaxLayer, etc.)
│   ├── sections/     # Hero, About, Skills, Projects, Competitions, Gallery, Contact
│   └── ui/           # SectionDivider, Marquee, Skeleton
└── lib/              # Constants, types, motion utilities
public/
├── images/           # Project screenshots, competition photos, gallery
└── Tiron_JulieAnn_Resume.pdf
```

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | Run ESLint             |

## License

This project is for personal use.
