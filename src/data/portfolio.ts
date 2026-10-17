/**
 * Central portfolio data — built from Shijinraj's resume.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Nothing here should be added unless it appears on the resume.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Shijinraj K',
  displayName: 'Shijinraj K',
  firstName: 'SHIJINRAJ',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A SHIJINRAJ ORIGINAL',
  role: 'Student Developer',
  tagline: ['Student Developer', 'AI & Robotics', 'Python'],
  intro:
    'A Class 10 student and independent developer interested in artificial intelligence, robotics and software engineering — experimenting with Python, Flutter, Linux and AI-powered apps, and turning ambitious ideas into practical projects.',
  location: 'Kasaragod, Kerala',
  email: 'shijinrajx@gmail.com',
  links: {
    /** Leave empty ('') to hide LinkedIn everywhere. */
    linkedin: '',
    github: 'https://github.com/shijinrajx7',
    instagram: 'https://www.instagram.com/shijin.exe/',
  },
  resumePdf: '/assets/Shijinraj_K_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Shijinraj K',
  },
  interests: ['AI Integration', 'Robotics', 'Computer Vision', 'Desktop Apps', 'AI Agents'],
};

export const education = [
  {
    school: 'Government High School',
    place: 'Kolathur',
    degree: 'Kerala State SCERT syllabus',
    period: '2026 – 2027',
    score: 'Class 10',
  },
];

export type Experience = { company: string; role: string; place: string; period: string; points: string[] };

/** No professional experience is claimed on the resume. */
export const experience: Experience[] = [];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  /** Shown as a small badge — status of the project (no dates are claimed on the resume). */
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when there is no public repository — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  /** Live website address — shows a "Visit live" button. */
  url?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'nope',
    title: 'NOPE.',
    year: 'Live',
    genre: 'Web • App • Experiment',
    logline: 'A compact web build, published as an independent experiment.',
    stack: ['Web'],
    build: ['A compact web build, published as an independent experiment. The live version is available to explore.'],
    features: ['Published and live'],
    metrics: [],
    url: 'https://nope-rosy.vercel.app',
    palette: { from: '#1c0505', via: '#7a1a1a', to: '#0a0505', accent: '#ff6b6b' },
    motif: 'shield',
  },
  {
    id: 'content-forge',
    title: 'CONTENT FORGE',
    year: 'Live',
    genre: 'Website • App',
    logline: 'A web project made to exist on the open internet.',
    stack: ['Web'],
    build: ['A web project published at its own live address.'],
    features: ['Published and live'],
    metrics: [],
    url: 'https://content-forge-ten-alpha.vercel.app',
    palette: { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'wedding-invite',
    title: 'WEDDING INVITE',
    year: 'Live',
    genre: 'Website • Invitation',
    logline: 'A dedicated website made for a real-world occasion.',
    stack: ['Web'],
    build: ['A published invitation website, available online.'],
    features: ['Published and live'],
    metrics: [],
    url: 'https://wedding-invite-wine-five.vercel.app',
    palette: { from: '#12062a', via: '#4a1f9c', to: '#07060c', accent: '#b98bff' },
    motif: 'tenants',
  },
  {
    id: 'adhixah',
    title: 'ADHIXAH',
    year: 'Live',
    genre: 'Website',
    logline: 'A website published as part of the growing build archive.',
    stack: ['Web'],
    build: ['The current public version is online.'],
    features: ['Published and live'],
    metrics: [],
    url: 'https://adhixah.netlify.app',
    palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
    motif: 'flow',
  },
  {
    id: 'nova',
    title: 'NOVA',
    year: 'Experimental',
    genre: 'AI • Desktop • Voice',
    logline: 'A desktop AI companion with an animated interface, voice interaction and system-tool integration.',
    stack: ['Python', 'Godot', 'NVIDIA NIM'],
    build: [
      'An experimental desktop companion project focused on an animated interface, voice interaction, AI assistance and system-tool integration.',
    ],
    features: ['Animated interface', 'Voice interaction', 'AI assistance', 'System-tool integration'],
    metrics: [],
    // Add `github: 'https://github.com/shijinrajx7/<repo>',` once the repository is public.
    palette: { from: '#050b24', via: '#1c2f8f', to: '#05060d', accent: '#6f8cff' },
    motif: 'flow',
  },
  {
    id: 'life-os',
    title: 'Life OS',
    year: 'Concept',
    genre: 'Productivity • Mobile • Flutter',
    logline: 'A student productivity app concept with a dark, futuristic interface.',
    stack: ['Flutter', 'Dart'],
    build: [
      'A student productivity app concept focused on tasks, reminders, study routines and a dark futuristic interface.',
    ],
    features: ['Tasks', 'Reminders', 'Study routines', 'Dark futuristic interface'],
    metrics: [],
    palette: { from: '#12062a', via: '#4a1f9c', to: '#07060c', accent: '#b98bff' },
    motif: 'tenants',
  },
  {
    id: 'gesture-control-pc',
    title: 'Gesture Control PC',
    year: 'Experiment',
    genre: 'Computer Vision • Python',
    logline: 'A computer-vision experiment exploring hand-gesture-based computer interaction.',
    stack: ['Python', 'Computer Vision'],
    build: ['A computer-vision experiment exploring hand-gesture-based interaction with a computer.'],
    features: ['Hand-gesture-based interaction', 'Computer vision'],
    metrics: [],
    palette: { from: '#03141a', via: '#0d5b6e', to: '#05090b', accent: '#4cdcff' },
    motif: 'shield',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'robotics-fest',
    title: 'District 3rd Place',
    org: 'Robotics Fest',
    detail: 'Placed third at district level in Robotics Fest.',
    laurel: 'District Level',
  },
  {
    id: 'uss-lss',
    title: 'USS & LSS',
    org: 'Scholarships',
    detail: 'Scholarship achievements — USS and LSS.',
    laurel: 'Scholar',
  },
  {
    id: 'lk-district-camp',
    title: 'LK District Camp',
    org: 'District Camp',
    detail: 'Member of the LK District Camp.',
    laurel: 'District Camp',
  },
];

export type Certification = { issuer: string; name: string; link: string };

/** No certifications are claimed on the resume. */
export const certifications: Certification[] = [];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming',
    subtitle: 'Python & Dart',
    skills: [
      { name: 'Python', mono: 'Py', note: 'Main' },
      { name: 'Dart', mono: 'Da' },
    ],
  },
  {
    id: 'tools',
    title: 'Frameworks & Tools',
    subtitle: 'What I build with',
    skills: [
      { name: 'Flutter', mono: 'Fl' },
      { name: 'Godot', mono: 'Gd' },
      { name: 'PySide6', mono: 'Qt' },
      { name: 'Ubuntu Linux', mono: 'Ub' },
      { name: 'VS Code', mono: 'Vs' },
      { name: 'Antigravity', mono: 'Ag' },
      { name: 'OpenCode', mono: 'Oc' },
      { name: 'Vercel', mono: 'Vc' },
    ],
  },
  {
    id: 'interests',
    title: 'Interests',
    subtitle: 'Where I am headed',
    skills: [
      { name: 'AI Integration', mono: 'Ai' },
      { name: 'Robotics', mono: 'Rb' },
      { name: 'Computer Vision', mono: 'Cv' },
      { name: 'Desktop Apps', mono: 'Da' },
      { name: 'AI Agents', mono: 'Ag' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects or achievements on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  Python: ['NOVA', 'Gesture Control PC'],
  Dart: ['Life OS'],
  Flutter: ['Life OS'],
  Godot: ['NOVA'],
  'Computer Vision': ['Gesture Control PC'],
  'Desktop Apps': ['NOVA'],
  'AI Integration': ['NOVA'],
  Robotics: ['Robotics Fest — District 3rd Place'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const indigo: Palette = { from: '#050b24', via: '#1c2f8f', to: '#05060d', accent: '#6f8cff' };
const violet: Palette = { from: '#12062a', via: '#4a1f9c', to: '#07060c', accent: '#b98bff' };
const cyan: Palette = { from: '#03141a', via: '#0d5b6e', to: '#05090b', accent: '#4cdcff' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: '2026 – 2027',
    synopsis: 'Class 10 at Government High School, Kolathur — Kerala State SCERT.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Student',
        description: 'Class 10 at Government High School, Kolathur, following the Kerala State SCERT syllabus.',
        tags: ['Class 10', 'Kerala SCERT'],
        runtime: '2026 – 2027',
        palette: indigo,
      },
      {
        code: 'S01 E02',
        title: 'The Competitor',
        description: 'District 3rd place at Robotics Fest.',
        tags: ['Robotics', 'District 3rd'],
        runtime: 'Robotics Fest',
        palette: amber,
      },
      {
        code: 'S01 E03',
        title: 'The Camper',
        description: 'Member of the LK District Camp, with USS and LSS scholarship achievements to his name.',
        tags: ['LK District Camp', 'USS', 'LSS'],
        runtime: 'District level',
        palette: jade,
      },
    ],
  },
  {
    number: 2,
    title: 'Building Originals',
    period: 'Ongoing',
    synopsis: 'Live websites and apps, plus three experiments — a desktop AI companion, a productivity app and a gesture-control idea.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Companion',
        description: 'NOVA — a desktop AI companion with an animated interface, voice interaction and system-tool integration.',
        tags: ['Python', 'Godot', 'NVIDIA NIM'],
        runtime: 'Experimental',
        palette: indigo,
      },
      {
        code: 'S02 E02',
        title: 'The Organizer',
        description: 'Life OS — a student productivity app concept for tasks, reminders and study routines.',
        tags: ['Flutter', 'Dart'],
        runtime: 'Concept',
        palette: violet,
      },
      {
        code: 'S02 E03',
        title: 'The Experiment',
        description: 'Gesture Control PC — exploring hand-gesture-based computer interaction with computer vision.',
        tags: ['Python', 'Computer Vision'],
        runtime: 'Experiment',
        palette: cyan,
      },
    ],
  },
  {
    number: 3,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'The interests on the resume point to the next arc of the story.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Next Chapter',
        description: 'Exploring AI integration, robotics, computer vision, desktop apps and AI agents.',
        tags: ['AI Integration', 'Robotics', 'AI Agents'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'The AI Original', title: 'NOVA', detail: 'Desktop AI companion • Python • Godot', palette: indigo },
  { label: 'Biggest stage', title: 'Robotics Fest', detail: 'District 3rd place', palette: amber },
  { label: 'The productivity Original', title: 'Life OS', detail: 'Flutter • Dart', palette: violet },
  { label: 'The experiment', title: 'Gesture Control PC', detail: 'Computer vision • Python', palette: cyan },
  { label: 'Main language', title: 'Python', detail: 'Used in NOVA and Gesture Control PC', palette: jade },
  { label: 'Cross-platform', title: 'Flutter', detail: 'Used to build Life OS', palette: violet },
  { label: 'Current focus', title: 'AI & Robotics', detail: 'with computer vision & AI agents', palette: indigo },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'Class 10',
    lines: ['Government High School, Kolathur', 'Kerala State SCERT · 2026 – 2027'],
  },
  {
    kicker: 'Skills',
    title: 'Python first.',
    lines: ['Python, Dart · Flutter, Godot, PySide6', 'Ubuntu Linux · VS Code · Vercel'],
    chips: ['Python', 'Dart', 'Flutter', 'Godot', 'Linux'],
  },
  {
    kicker: 'Projects',
    title: `${projects.length} Originals`,
    lines: ['Live: NOPE., Content Forge, Wedding Invite, Adhixah', 'NOVA — desktop AI companion', 'Life OS · Gesture Control PC'],
  },
  {
    kicker: 'Achievements',
    title: 'Top Moments',
    lines: ['District 3rd Place — Robotics Fest', 'LK District Camp — member', 'USS & LSS scholarships'],
  },
  {
    kicker: 'Current mission',
    title: 'Now exploring',
    lines: ['AI Integration · Robotics · Computer Vision · AI Agents'],
  },
];

/** Original tracks by binaryking — files live in public/audio/ */
export const soundtrack = [
  { id: 'track-1', label: 'Track 01', src: '/audio/1.mp3' },
  { id: 'track-2', label: 'Track 02', src: '/audio/2.mp3' },
  { id: 'track-3', label: 'Track 03', src: '/audio/3.mp3' },
  { id: 'track-4', label: 'Track 04', src: '/audio/4.mp3' },
  { id: 'track-5', label: 'Track 05', src: '/audio/5.mp3' },
  { id: 'track-6', label: 'Track 06', src: '/audio/6.mp3' },
  { id: 'track-7', label: 'Track 07', src: '/audio/7.mp3' },
  { id: 'track-8', label: 'Track 08', src: '/audio/8.mp3' },
];

export type ProfileId = 'shijinraj' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'shijinraj',
    name: 'Shijinraj',
    blurb: 'The full series, in order',
    color: '#4f6bff',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals`, palette: indigo },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Highlights from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: cyan },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments`, palette: indigo },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
