import React from "react";
import { LoggedInLayout } from "../../../common/Layouts/LoggedInLayout";

export default function Help() {
  return (
    <LoggedInLayout>
      <h1>Help</h1>
      <p>
        This is a help page.
        It is not implemented yet.
        Please help us out by contributing to the project on{" "}
        <a href="https://github.com/CodeDiversity/billsyApp">GitHub</a>.
      </p>
    </LoggedInLayout>
  )
}


