import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

type MockRouterProps = {
  children: ReactElement;
  initialRoutes?: string[];
};

const MockRouter: React.FC<MockRouterProps> = ({
  children,
  initialRoutes = ["/"],
}) => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </Router>
  );
};

export default MockRouter;
