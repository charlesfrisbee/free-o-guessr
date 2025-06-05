import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import MobileMapCloseButton from "@/components/MobileMapCloseButton";
import type { MapState } from "@/store/map";

const mockSetMapHiddenMobile = vi.fn();
const mockSetCurrentGuess = vi.fn();
const mockSetGoal = vi.fn();

vi.mock("@/store/map", () => ({
  useMapStore: (selector: (state: MapState) => unknown) => {
    const fakeState: MapState = {
      mapHiddenMobile: false,
      setMapHiddenMobile: mockSetMapHiddenMobile,
      currentGuess: null,
      setCurrentGuess: mockSetCurrentGuess,
      goal: null,
      setGoal: mockSetGoal,
    };
    return selector(fakeState);
  },
}));

it("renders close button with correct styling", () => {
  const { getByRole } = render(<MobileMapCloseButton />);
  const button = getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("bg-[rgba(0,0,0,.9)]");
});

it("calls setMapHiddenMobile(true) when clicked", () => {
  const { getByRole } = render(<MobileMapCloseButton />);
  const button = getByRole("button");

  fireEvent.click(button);

  expect(mockSetMapHiddenMobile).toHaveBeenCalledWith(true);
});
