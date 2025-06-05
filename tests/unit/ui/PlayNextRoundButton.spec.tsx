import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import PlayNextRoundButton from "@/components/PlayNextRoundButton";

// 1. Import the full MapState interface
import type { MapState } from "@/store/map";

const mockPush = vi.fn();
const mockSetCurrentGuess = vi.fn();

// 2. Mock next/router as before
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// 3. Mock useMapStore with a proper selector signature
vi.mock("@/store/map", () => ({
  useMapStore: (selector: (state: MapState) => unknown) => {
    // 4. Build a fakeState that satisfies MapState
    const fakeState: MapState = {
      mapHiddenMobile: false, // default values for unused state
      setMapHiddenMobile: () => {}, // no-op for unused setter
      currentGuess: null, // initialize unused fields
      setCurrentGuess: mockSetCurrentGuess, // this is what our component uses
      goal: null,
      setGoal: () => {},
    };
    return selector(fakeState);
  },
}));

it("renders play next round button with correct text", () => {
  const { getByRole } = render(<PlayNextRoundButton />);
  const button = getByRole("button");

  expect(button).toHaveTextContent("Play Next Round");
  expect(button).toHaveClass("bg-[#6cb928]");
});

it("navigates to home and resets guess when clicked", async () => {
  vi.useFakeTimers();

  const { getByRole } = render(<PlayNextRoundButton />);
  const button = getByRole("button");

  fireEvent.click(button);

  // First, we should navigate to "/"
  expect(mockPush).toHaveBeenCalledWith("/");

  // The component waits 100ms before calling setCurrentGuess(null)
  vi.advanceTimersByTime(100);

  expect(mockSetCurrentGuess).toHaveBeenCalledWith(null);

  vi.useRealTimers();
});
