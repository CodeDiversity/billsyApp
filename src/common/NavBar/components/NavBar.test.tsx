import { NavBar } from "./NavBar";
import { renderWithProviders } from "../../../utils/test-utils";
import React from "react";
import { screen } from "@testing-library/react";

describe("NavBar", () => {
  it('should render without error', () => {
    renderWithProviders(<NavBar />);
  });

  it('should render the logo', () => {
    renderWithProviders(<NavBar />);
    const logo = screen.getByText(/Billsy/i);
    expect(logo).toBeInTheDocument();
  });
});