import { Component } from "solid-js";
import Navbar from "../components/navbar";
import "../styles/main.scss";
import typefaceLogo from "/logo.png?url";
import Container from "../components/container";

const Login: Component = () => {
  return (
    <>
      <Navbar />
      <div id="sidebar">
        <Container
          title="Log in"
          children={
            <div class="login">
              <form name="login" id="login">
                <label for="handle">Handle</label>
                <br />
                <input
                  type="text"
                  id="handle"
                  name="handle"
                  maxlength="255"
                  placeholder="soykaf.com"
                  required
                />
                <br />
                <button type="submit">Login</button>
              </form>
            </div>
          }
        />
      </div>
      <div id="content">
        <Container
          title="About"
          children={
            <>
              <img src={typefaceLogo} width="400" />
              <h2>A Bluesky client with a familiar face</h2>
              <hr />
              <p>
                <b>Bluroma</b> is a web client for Bluesky, designed to provide
                a customizable power-user experience. Its design is heavily
                influenced by the <a href="https://pleroma.social">Pleroma</a>{" "}
                and <a href="https://akkoma.social">Akkoma</a> projects, and
                intends to provide a similar, from-scratch user interface for
                Bluesky users.
              </p>
              <h3>Links</h3>
              <ul>
                <li>
                  <a href="https://tangled.org/@hexmani.ac/bluroma">Tangled</a>
                </li>
                <li>
                  <a href="https://pdsls.dev/at://did:plc:5szlrh3xkfxxsuu4mo6oe6h7">
                    Developer
                  </a>
                </li>
              </ul>
            </>
          }
        />
      </div>
    </>
  );
};

export default Login;
