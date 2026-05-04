import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { contactLinks, journey, profile } from "@/app/content";

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

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText(/University of Washington/i)).toBeInTheDocument();
    expect(screen.getByText(/KAI Japanese Language School/i)).toBeInTheDocument();
  });
});
