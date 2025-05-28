import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import GuessButton from "@/components/GuessButton";
import { haversineDistance } from "@/lib/utils";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

it("guessbutton should be disabled when no guess set", async () => {
  const position = null;
  const { getByRole, rerender } = render(<GuessButton guess={position} />);
  expect(getByRole("button")).toBeDisabled();
  expect(getByRole("button")).toHaveTextContent("Place your pin on the map");
  rerender(<GuessButton guess={{ lat: 1, lng: 2 }} />);
  // now enabled
  expect(getByRole("button")).not.toBeDisabled();
  expect(getByRole("button")).toHaveTextContent("Guess");
});

it("navigates to /result when guess is set and button clicked", () => {
  const pos = { lat: 1, lng: 2 };
  const { getByRole } = render(<GuessButton guess={pos} />);
  const btn = getByRole("button");

  // button should be enabled
  expect(btn).not.toBeDisabled();

  // click it
  fireEvent.click(btn);

  // our mock push should have been called
  expect(mockPush).toHaveBeenCalledWith("/result");
});

it("computes zero distance when points match", () => {
  expect(haversineDistance({ lat: 0, lng: 0 }, { lat: 0, lng: 0 })).toBeCloseTo(
    0
  );
});

it("grows as points move apart", () => {
  expect(
    haversineDistance({ lat: 0, lng: 0 }, { lat: 0, lng: 1 })
  ).toBeGreaterThan(100);
});
