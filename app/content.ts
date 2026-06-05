export const profile = {
  name: "Brandon Williams",
  role: "Software Engineer",
  location: "Tokyo, Japan",
  languages: "English, Japanese",
  email: "williamsb600@gmail.com",
  linkedin: "https://www.linkedin.com/in/brandon-williams-8206426a",
  heroTitle:
    "Brandon Williams: Software Engineer.",
  currentFocus:
    "Backend services, cloud infrastructure, deployment automation, and small-scale full-stack applications.",
  summary:
    "Backend-focused software engineer with experience building and maintaining Java and Go services, cloud-native AWS systems, deployment automation, and containerized microservices.",
  intro:
    "I enjoy building reliable systems for customers and internal teams, with a practical approach shaped by engineering, operations, and troubleshooting experience.",
  backendFocus:
    "My professional engineering work has centered on backend service development, cloud infrastructure, deployment pipelines, code reviews, design reviews, refactoring, service maintenance, troubleshooting, and data analysis.",
  frontendContext:
    "I also have full-stack capabilities from developing small-scale web applications with both frontend and backend functionality, and I maintained internal web scripts with JavaScript, HTML, and jQuery as an Amazon Investigation Specialist.",
  backendSkills: [
    "Go",
    "Java",
    "Python",
    "AWS CDK",
    "AWS Lambda",
    "API Gateway",
    "DynamoDB",
    "CloudFormation",
    "EMR",
    "S3",
    "Kubernetes",
    "Docker",
    "Helm",
    "GitLab",
    "Boto3",
    "Redis Streams",
    "Redis Cache",
  ],
  supportingSkills: [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "jQuery",
    "Express",
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
    dates: "February 2022 - April 2024",
    location: "Remote",
    summary:
      "Worked on both a legacy Java endpoint authentication system and its high-performance Go replacement for an endpoint security platform, supporting endpoint authentication, metadata processing and storage, and downstream data delivery for malware detection analysis.",
  },
  {
    company: "Amazon",
    role: "Software Engineer",
    dates: "February 2021 - October 2021",
    location: "Seattle, Washington",
    summary:
      "Built, tested, and maintained the Java service responsible for tracking supply and demand for Amazon Fresh across global operations, and built backend infrastructure for an internal control plane using AWS CDK, API Gateway, and Lambda.",
  },
  {
    company: "Amazon",
    role: "Software Engineer Intern",
    dates: "August 2020 - December 2020",
    location: "Seattle, Washington",
    summary:
      "Built a deployment pipeline for a large-scale batch processing system using AWS CDK, Boto3, EMR, S3, and other native AWS services.",
  },
  {
    company: "Amazon",
    role: "Investigation Specialist",
    dates: "September 2016 - January 2020",
    location: "Seattle, Washington",
    summary:
      "Evaluated seller inventory and transaction history for Fulfillment by Amazon using internal tools, pattern recognition, and data analysis, while maintaining internal web scripts with JavaScript, HTML, and jQuery to deliver new features for online tools used by multiple teams.",
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
  "Amazon Technical Academy, 15-month software development program with native AWS tools",
  "Coding Dojo, 1000+ hours across Python, MEAN, and Java stacks",
  "KAI Japanese Language School, written and spoken Japanese",
];
