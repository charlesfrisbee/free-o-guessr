import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import GuessMarker from "@/components/GuessMarker";

// Mock the google maps component, typing `position` as LatLngLiteral instead of `any`
vi.mock("@vis.gl/react-google-maps", () => ({
  AdvancedMarker: ({
    position,
  }: {
    position: google.maps.LatLngLiteral | null;
  }) => (
    <div data-testid="guess-marker" data-position={JSON.stringify(position)} />
  ),
}));

it("renders marker when position is provided", () => {
  const position = { lat: 40.7128, lng: -74.006 };
  const { getByTestId } = render(<GuessMarker position={position} />);

  const marker = getByTestId("guess-marker");
  expect(marker).toBeInTheDocument();
  expect(marker).toHaveAttribute("data-position", JSON.stringify(position));
});

it("renders nothing when position is null", () => {
  const { container } = render(<GuessMarker position={null} />);

  expect(container).toBeEmptyDOMElement();
});
