import { describe, expect, it } from "vitest";
import {
  contactLinks,
  education,
  journey,
  profile,
  profileSnapshot,
  skillGroups,
} from "@/app/content";

describe("profile content", () => {
  it("contains required contact and location details", () => {
    expect(profile.name).toBe("Brandon Williams");
    expect(profile.location).toBe("Tokyo, Japan");
    expect(profile.email).toMatch(/@/);
    expect(profile.linkedin).toContain("linkedin.com/in/brandon-williams");
    expect(contactLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: `mailto:${profile.email}` }),
        expect.objectContaining({ href: profile.linkedin }),
      ]),
    );
    expect(profileSnapshot).toEqual(
      expect.arrayContaining([
        { label: "Role", value: profile.role },
        { label: "Based in", value: profile.location },
        { label: "Languages", value: profile.languages },
      ]),
    );
  });

  it("separates backend skills from supporting skills", () => {
    expect(profile.backendSkills).toEqual(
      expect.arrayContaining(["Go", "Java", "AWS CDK", "Kubernetes"]),
    );
    expect(profile.supportingSkills).toEqual(
      expect.arrayContaining(["JavaScript", "HTML", "CSS", "Japanese"]),
    );
    expect(skillGroups).toEqual([
      {
        label: "Backend and platform",
        skills: profile.backendSkills,
      },
      {
        label: "Supporting web and language skills",
        skills: profile.supportingSkills,
      },
    ]);
  });

  it("keeps career journey entries complete", () => {
    expect(journey).toHaveLength(8);

    for (const item of journey) {
      expect(item.company).toBeTruthy();
      expect(item.role).toBeTruthy();
      expect(item.dates).toBeTruthy();
      expect(item.summary).toBeTruthy();
    }
  });

  it("includes education from the profile", () => {
    expect(education).toEqual(
      expect.arrayContaining([
        "University of Washington, BS in Psychology",
        "Coding Dojo, 1000+ hours across Python, MEAN, and Java stacks",
        "Amazon Technical Academy, 15-month software development program with native AWS tools",
        "KAI Japanese Language School, written and spoken Japanese",
      ]),
    );
  });
});
