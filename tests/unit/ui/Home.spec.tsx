// tests/unit/Async.spec.tsx
import { render, screen } from "@testing-library/react";
import { it, expect, beforeEach, afterEach } from "vitest";
import Home from "@/app/page";
import { vi } from "vitest";

const fakePano = { id: 123, lat: 51.5, lng: -0.1, googlePanoId: "TEST123" };
vi.mock("@/actions/get-random-pano", () => ({
  getRandomPano: async () => fakePano,
}));

// Mock environment variable for tests
const originalEnv = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

beforeEach(() => {
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "fake-api-key-for-testing";
});

afterEach(() => {
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = originalEnv;
});

it("renders the main page", async () => {
  // 1) kick off the render (Suspense is fine here)
  render(await Home());

  // 2) wait for the <main> to appear
  const main = await screen.findByRole("main");
  expect(main).toBeInTheDocument();

  expect(await screen.findByTestId("map")).toBeInTheDocument();
});
