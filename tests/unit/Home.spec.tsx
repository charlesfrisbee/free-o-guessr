// tests/unit/Async.spec.tsx
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Home from "@/app/page";
import { vi } from "vitest";

const fakePano = { id: 123, lat: 51.5, lng: -0.1, googlePanoId: "TEST123" };
vi.mock("@/actions/get-random-pano", () => ({
  getRandomPano: async () => fakePano,
}));

vi.unmock("@vis.gl/react-google-maps");

it("renders the main page", async () => {
  // 1) kick off the render (Suspense is fine here)
  render(await Home());

  // 2) wait for the <main> to appear
  const main = await screen.findByRole("main");
  expect(main).toBeInTheDocument();

  expect(await screen.findByTestId("map")).toBeInTheDocument();
});
