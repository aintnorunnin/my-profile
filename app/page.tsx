import {
  aboutParagraphs,
  contactLinks,
  education,
  journey,
  profile,
  profileSnapshot,
  skillGroups,
} from "./content";
import AIBrandonChat from "./components/AIBrandonChat";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <JourneySection />
      <SkillsEducationSection />
      {isGitHubPages ? null : <AIBrandonChat />}
    </main>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="eyebrow">{profile.location}</p>
        <h1 id="hero-title">{profile.heroTitle}</h1>
        <p className="hero__summary">{profile.summary}</p>
        <div className="hero__actions" aria-label="Contact links">
          {contactLinks.map((link) => (
            <a
              className={`button button--${link.variant}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <aside className="hero__card" aria-label="Profile snapshot">
        <span className="card__label">Current Focus</span>
        <p>{profile.currentFocus}</p>
        <dl>
          {profileSnapshot.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section two-column" aria-labelledby="about-title">
      <div>
        <p className="eyebrow">About</p>
        <h2 id="about-title">A software engineer with a broad foundation.</h2>
      </div>
      <div className="section__body">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="section" aria-labelledby="journey-title">
      <div className="section__header">
        <p className="eyebrow">Career Journey</p>
        <h2 id="journey-title">From service and education into software engineering.</h2>
      </div>
      <div className="timeline">
        {journey.map((item) => (
          <article className="timeline__item" key={`${item.company}-${item.role}`}>
            <div>
              <h3>{item.role}</h3>
              <p className="timeline__company">{item.company}</p>
            </div>
            <div>
              <p className="timeline__meta">
                {item.dates} · {item.location}
              </p>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsEducationSection() {
  return (
    <section className="section grid-section" aria-labelledby="skills-title">
      <div className="panel">
        <p className="eyebrow">Toolbox</p>
        <h2 id="skills-title">Backend and platform technologies Brandon has used.</h2>
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.label}>
            <h3>{group.label}</h3>
            <ul className="tag-list" aria-label={group.label}>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="panel panel--muted">
        <p className="eyebrow">Education</p>
        <h2>Learning that spans people, code, and language.</h2>
        <ul className="simple-list">
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="interests">
          Outside of code: {profile.interests.join(", ")}.
        </p>
      </div>
    </section>
  );
}
