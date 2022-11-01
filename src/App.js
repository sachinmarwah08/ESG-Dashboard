import React from "react";
import Main from "./components/Main";
import { a } from "./alwaysChange";

const App = () => {
  console.log(a);
  return <Main />;
};

export default App;
