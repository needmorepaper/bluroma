import { A } from "@solidjs/router";
import { Component } from "solid-js/types/server/rendering.js";

const Navbar: Component = () => {
  return (
    <>
      <nav id="nav">
        <div class="center-nav">
          <A href="/">
            <img src="favicon.png" />
          </A>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
