import { formatDistance, geoguessrScore } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("formatDistance function", () => {
  it("formats distances under 1000m as meters", () => {
    expect(formatDistance(500)).toBe("500 m");
    expect(formatDistance(999)).toBe("999 m");
    expect(formatDistance(0)).toBe("0 m");
  });

  it("formats distances over 1000m as kilometers", () => {
    expect(formatDistance(1000)).toBe("1 km");
    expect(formatDistance(1500)).toBe("2 km");
    expect(formatDistance(5000)).toBe("5 km");
  });
});

describe("geoguessrScore function", () => {
  it("returns maximum score for zero distance", () => {
    expect(geoguessrScore(0)).toBe(5000);
  });

  it("returns lower scores for larger distances", () => {
    const score1 = geoguessrScore(1000);
    const score2 = geoguessrScore(10000);
    const score3 = geoguessrScore(100000);

    expect(score1).toBeGreaterThan(score2);
    expect(score2).toBeGreaterThan(score3);
    expect(score3).toBeGreaterThan(0);
  });

  it("uses custom max distance", () => {
    const score1 = geoguessrScore(1000, 10000);
    const score2 = geoguessrScore(1000, 100000);

    expect(score1).toBeLessThan(score2);
  });
});
