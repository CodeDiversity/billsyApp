import { NavBar } from "./NavBar";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock('../../../axiosConfig.ts')

describe("NavBar", () => {
  it('should render without error', () => {
    renderWithProviders(<NavBar />);
  })
});