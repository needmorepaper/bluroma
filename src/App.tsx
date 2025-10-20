import "./App.scss";

import { Component } from "solid-js";
import logo from "/favicon.png?url";

const App: Component = () => {
  return (
    <>
      <img src={logo} width="100" />
      <h1>Bluroma</h1>
    </>
  );
};

export default App;
