import { useNavBar } from "./useNavBar";
import * as router from "react-router";
import { renderHookWithProviders } from "../../../utils/test-utils";

describe("NavBar Hook - Navigation Tests", () => {
  const nav = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockReturnValue(nav);
  });

  // Setup before each test
  beforeEach(() => {
    // Clear mocks and localStorage
    nav.mockClear();
    localStorage.clear();
  });

  it("should return true when token is expired", () => {
    const { result } = renderHookWithProviders(() => useNavBar());
    const { isTokenExpired } = result.current;
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTAyOTM4NjUsInN1YiI6InVzZXJfaWRfMTIzNDUifQ.1Rl3S3pBvMppTsNSasPzHS5VFpGhYFtjH8qBcSpHWu0";
    expect(isTokenExpired(token)).toBe(true);
  });
  it("should return false when token is not expired", () => {
    const { result } = renderHookWithProviders(() => useNavBar());
    const { isTokenExpired } = result.current;
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4NjgwNjExMjYsInN1YiI6InVzZXJfaWRfMTIzNDUifQ.xlwGX6-fEMovQmp-Mzl2hqCwcnpGmSYqfthc3w2vnwc";
    expect(isTokenExpired(token)).toBe(false);
  });
});
