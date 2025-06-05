import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi, beforeEach } from "vitest";
import React from "react";
import MobileMapToggle from "@/components/MobileMapToggle";

// 1. Import the full MapState interface
import type { MapState } from "@/store/map";

// 2. Create mocks for every method in MapState
const mockSetMapHiddenMobile = vi.fn();
const mockSetCurrentGuess = vi.fn();
const mockSetGoal = vi.fn();

// 3. Mock useMapStore with a proper selector signature
vi.mock("@/store/map", () => ({
  useMapStore: (selector: (state: MapState) => unknown) => {
    // 4. Build a fakeState that satisfies MapState
    const fakeState: MapState = {
      mapHiddenMobile: true, // this test assumes the map is hidden initially
      setMapHiddenMobile: mockSetMapHiddenMobile,
      currentGuess: null, // you can stub these however you like
      setCurrentGuess: mockSetCurrentGuess,
      goal: null,
      setGoal: mockSetGoal,
    };
    return selector(fakeState);
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

it("shows toggle button when map is hidden on mobile", () => {
  const { getByRole } = render(<MobileMapToggle />);
  const button = getByRole("button");

  expect(button).toBeVisible();
  // Assuming that MobileMapToggle adds a "visible" class to its parent when `mapHiddenMobile` is true:
  expect(button.parentElement).toHaveClass("visible");
});

it("calls setMapHiddenMobile(false) when button is clicked", () => {
  const { getByRole } = render(<MobileMapToggle />);
  const button = getByRole("button");

  fireEvent.click(button);

  // We expect the toggle to un-hide the map (i.e. call setMapHiddenMobile(false))
  expect(mockSetMapHiddenMobile).toHaveBeenCalledWith(false);
});
