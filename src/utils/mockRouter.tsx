import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

type MockRouterProps = {
  children: ReactElement;
};

const MockRouter: React.FC<MockRouterProps> = ({
  children,
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
