import { A } from "@solidjs/router";
import { Component } from "solid-js/types/server/rendering.js";
import { loginState } from "./login";

const Navbar: Component = () => {
  return (
    <>
      <nav id="nav">
        <div class="center-nav">
          <A href={loginState() ? "/dash" : "/"}>
            <img src="favicon.png" />
          </A>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
