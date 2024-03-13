import { NavBar } from "./NavBar";
import { renderWithProviders } from "../../../utils/test-utils";

describe("NavBar", () => {
  it('should render without error', () => {
    renderWithProviders(<NavBar />);
  })
});