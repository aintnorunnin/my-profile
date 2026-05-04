import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { contactLinks, journey, profile, skillGroups } from "@/app/content";

describe("Home", () => {
  it("renders the primary portfolio message", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: profile.heroTitle,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(profile.summary)).toBeInTheDocument();
    for (const link of contactLinks) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  it("renders Brandon's full career journey", () => {
    render(<Home />);

    const journeySection = screen.getByRole("region", {
      name: /from service and education into software engineering/i,
    });
    const timeline = journeySection.querySelector(".timeline");

    expect(timeline).toBeTruthy();
    expect(within(timeline as HTMLElement).getAllByRole("article")).toHaveLength(
      journey.length,
    );
    for (const item of journey) {
      expect(within(timeline as HTMLElement).getByText(item.summary)).toBeInTheDocument();
    }
  });

  it("highlights core skills and education", () => {
    render(<Home />);

    for (const group of skillGroups) {
      expect(screen.getByRole("heading", { name: group.label })).toBeInTheDocument();
    }
    for (const skill of ["Go", "AWS CDK", "Kubernetes", "Python"]) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
    expect(
      screen.getByText("University of Washington, BS in Psychology"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Amazon Technical Academy, 15-month software development program with native AWS tools",
      ),
    ).toBeInTheDocument();
  });

  it("includes the AI Brandon chat section", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /ask ai brandon about his career/i,
      }),
    ).toBeInTheDocument();
  });
});
