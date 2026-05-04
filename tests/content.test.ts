import { describe, expect, it } from "vitest";
import {
  contactLinks,
  education,
  journey,
  profile,
  profileSnapshot,
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

  it("keeps career journey entries complete", () => {
    expect(journey).toHaveLength(6);

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
        "Coding Dojo",
        "KAI Japanese Language School",
      ]),
    );
  });
});
