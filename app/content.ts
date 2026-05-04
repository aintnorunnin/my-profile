export const profile = {
  name: "Brandon Williams",
  role: "Software Engineer",
  location: "Tokyo, Japan",
  languages: "English, Japanese",
  email: "williamsb600@gmail.com",
  linkedin: "https://www.linkedin.com/in/brandon-williams-8206426a",
  heroTitle: "Brandon Williams builds backend services and cloud-native systems.",
  currentFocus: "Backend services, cloud infrastructure, and deployment automation.",
  summary:
    "Backend-focused software engineer with experience building Golang and Java services, AWS deployment pipelines, and cloud-native systems for organizations including VMware and Amazon.",
  intro:
    "I enjoy building reliable backend services, deployment workflows, and data-informed systems that can support real teams and customers.",
  backendFocus:
    "My professional engineering work has centered on backend services, cloud infrastructure, deployment automation, and production systems.",
  frontendContext:
    "I learned front-end development during Coding Dojo and used those skills professionally while working as an Amazon Investigation Specialist, but my software engineering focus is backend and platform work.",
  backendSkills: [
    "Go",
    "Java",
    "Python",
    "AWS CDK",
    "AWS Lambda",
    "DynamoDB",
    "CloudFormation",
    "EMR",
    "Kubernetes",
    "Docker",
    "Helm",
    "GitLab",
    "Boto3",
  ],
  supportingSkills: [
    "JavaScript",
    "Express",
    "HTML",
    "CSS",
    "Japanese",
  ],
  interests: ["Creative writing", "Arts", "Video games", "Reading"],
};

export const allSkills = [...profile.backendSkills, ...profile.supportingSkills];

export const skillGroups = [
  {
    label: "Backend and platform",
    skills: profile.backendSkills,
  },
  {
    label: "Supporting web and language skills",
    skills: profile.supportingSkills,
  },
];

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
  profile.backendFocus,
  profile.frontendContext,
  "Brandon's path runs through education, investigations, Amazon Technical Academy, and engineering teams at Amazon and VMware. That mix gives him a grounded understanding of how people, systems, and products connect.",
];

export const journey = [
  {
    company: "VMware",
    role: "Software Engineer",
    dates: "May 2022 - April 2024",
    location: "Seattle, Washington",
    summary:
      "Worked on a high-performance Golang microservice designed to replace a legacy Java sensor authentication system, using Kubernetes, GitLab, Docker, and Helm for deployment and configuration.",
  },
  {
    company: "Amazon",
    role: "Software Engineer",
    dates: "February 2021 - October 2021",
    location: "Greater Seattle Area",
    summary:
      "Helped build, test, and maintain the Java service responsible for tracking Amazon Fresh supply and demand globally, including cloud-native migration work with AWS CDK.",
  },
  {
    company: "Amazon",
    role: "Software Engineer Intern",
    dates: "August 2020 - December 2020",
    location: "Seattle, Washington",
    summary:
      "Built an AWS deployment pipeline for a large-scale batch processing system using AWS CDK, Boto3, and native AWS services.",
  },
  {
    company: "Amazon",
    role: "Investigation Specialist",
    dates: "September 2016 - January 2020",
    location: "Seattle, Washington",
    summary:
      "Evaluated seller inventory and transaction history for Fulfillment by Amazon using internal tools, pattern recognition, data analysis, and front-end skills developed through Coding Dojo.",
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
  {
    company: "Seattle Children's Hospital",
    role: "Intern",
    dates: "January 2012 - March 2012",
    location: "Seattle, Washington",
    summary:
      "Worked with youth patients in the psychiatric department, developing activities and charting behavior for physician review.",
  },
  {
    company: "University of Washington",
    role: "Research Assistant",
    dates: "October 2009 - March 2012",
    location: "Seattle, Washington",
    summary:
      "Conducted standardized testing and surveys, then recorded, organized, and analyzed research data using precise methods.",
  },
];

export const education = [
  "University of Washington, BS in Psychology",
  "Coding Dojo, 1000+ hours across Python, MEAN, and Java stacks",
  "Amazon Technical Academy, 15-month software development program with native AWS tools",
  "KAI Japanese Language School, written and spoken Japanese",
];
