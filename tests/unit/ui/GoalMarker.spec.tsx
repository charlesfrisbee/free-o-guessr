import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import GoalMarker from "@/components/GoalMarker";

// Mock the google maps component
vi.mock("@vis.gl/react-google-maps", () => ({
  AdvancedMarker: ({
    position,
  }: {
    position: google.maps.LatLngLiteral | null;
  }) => (
    <div data-testid="goal-marker" data-position={JSON.stringify(position)} />
  ),
}));

it("renders marker when position is provided", () => {
  const position = { lat: 51.5074, lng: -0.1278 };
  const { getByTestId } = render(<GoalMarker position={position} />);

  const marker = getByTestId("goal-marker");
  expect(marker).toBeInTheDocument();
  expect(marker).toHaveAttribute("data-position", JSON.stringify(position));
});

it("renders nothing when position is null", () => {
  const { container } = render(<GoalMarker position={null} />);

  expect(container).toBeEmptyDOMElement();
});
