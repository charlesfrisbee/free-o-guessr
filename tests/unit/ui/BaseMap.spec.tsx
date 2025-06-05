import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import BaseMap from "@/components/BaseMap";

// Mock the google maps component, replacing `any` with a more specific prop type
vi.mock("@vis.gl/react-google-maps", () => ({
  Map: ({
    children,
    defaultCenter,
    defaultZoom,
    ...props
  }: React.PropsWithChildren<
    {
      defaultCenter: google.maps.LatLngLiteral;
      defaultZoom: number;
    } & React.HTMLAttributes<HTMLDivElement>
  >) => (
    <div
      data-testid="base-map"
      data-center={JSON.stringify(defaultCenter)}
      data-zoom={defaultZoom}
      {...props}
    >
      {children}
    </div>
  ),
}));

it("renders map with correct props and children", () => {
  const position = { lat: 53.54992, lng: 10.00678 };
  const TestChild = () => <div data-testid="map-child">Map Child</div>;

  const { getByTestId } = render(
    <BaseMap position={position}>
      <TestChild />
    </BaseMap>
  );

  const map = getByTestId("base-map");
  const child = getByTestId("map-child");

  expect(map).toBeInTheDocument();
  expect(child).toBeInTheDocument();
  expect(map).toHaveAttribute("data-center", JSON.stringify(position));
  expect(map).toHaveAttribute("data-zoom", "10");
  expect(map).toHaveClass("h-full", "w-full");
});
