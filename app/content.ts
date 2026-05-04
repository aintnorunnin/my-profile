export const profile = {
  name: "Brandon Williams",
  role: "Software Engineer",
  location: "Tokyo, Japan",
  languages: "English, Japanese",
  email: "williamsb600@gmail.com",
  linkedin: "https://www.linkedin.com/in/brandon-williams-8206426a",
  heroTitle: "Brandon Williams builds clear, reliable software for the web.",
  summary:
    "Software engineer building thoughtful web applications across front-end and back-end systems, with a background spanning marketplace operations, education, and product engineering.",
  intro:
    "I enjoy turning ideas into reliable web experiences, learning new technologies, and working across the full development process from interface details to backend behavior.",
  skills: [
    "JavaScript",
    "React",
    "Angular",
    "Python",
    "Django",
    "Java",
    "Express",
    "HTML",
    "CSS",
    "Japanese",
  ],
  interests: ["Creative writing", "Arts", "Video games", "Reading"],
};

export const contactLinks = [
  {
    label: "Email Brandon",
    href: `mailto:${profile.email}`,
    variant: "primary",
  },
  {
    label: "View LinkedIn",
    href: profile.linkedin,
    variant: "secondary",
  },
];

export const profileSnapshot = [
  {
    label: "Role",
    value: profile.role,
  },
  {
    label: "Based in",
    value: profile.location,
  },
  {
    label: "Languages",
    value: profile.languages,
  },
];

export const aboutParagraphs = [
  profile.intro,
  "Brandon's path runs through education, operations, internships, and engineering teams at Amazon and VMware. That mix gives him a grounded understanding of how people, systems, and products connect.",
];

export const journey = [
  {
    company: "VMware",
    role: "Software Engineer",
    dates: "May 2022 - April 2024",
    location: "Seattle, Washington",
    summary:
      "Built on production engineering experience while contributing to software systems at enterprise scale.",
  },
  {
    company: "Amazon",
    role: "Software Engineer",
    dates: "February 2021 - October 2021",
    location: "Greater Seattle Area",
    summary:
      "Worked as a software engineer after moving from investigations into hands-on product development.",
  },
  {
    company: "Amazon",
    role: "Software Engineer Intern",
    dates: "August 2020 - December 2020",
    location: "Seattle, Washington",
    summary:
      "Applied formal engineering training to real customer and business problems.",
  },
  {
    company: "Amazon",
    role: "Investigation Specialist",
    dates: "September 2016 - January 2020",
    location: "Seattle, Washington",
    summary:
      "Developed analytical judgment and operational discipline before transitioning into software engineering.",
  },
  {
    company: "Technology Access Foundation Academy",
    role: "Learning Specialist",
    dates: "September 2014 - September 2016",
    location: "Federal Way, Washington",
    summary:
      "Supported students and built the teaching foundation that still informs Brandon's communication style.",
  },
  {
    company: "City Year",
    role: "Corps Member",
    dates: "August 2013 - June 2014",
    location: "Greater Chicago Area",
    summary:
      "Served communities through education-focused work before moving deeper into technology.",
  },
];

export const education = [
  "University of Washington, BS in Psychology",
  "Coding Dojo",
  "KAI Japanese Language School",
];
