import { Component } from "solid-js";
import Navbar from "../components/navbar";
import "../styles/main.scss";
import typefaceLogo from "/logo.png?url";
import blueskyLogo from "/bluesky.svg?url";
import tangledLogo from "/tangled.svg?url";
import Container from "../components/container";

const Login: Component = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
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
              <div class="container-content">
                <img class={"typeface"} src={typefaceLogo} />
                <h2>A Bluesky client with a familiar face</h2>
                <hr />
                <p>
                  <b>Bluroma</b> is a web client for Bluesky, built to provide a
                  customizable power-user experience. Its design is heavily
                  influenced by the <a href="https://pleroma.social">Pleroma</a>{" "}
                  and <a href="https://akkoma.social">Akkoma</a> projects, and
                  intends to provide a similar user interface for Bluesky users.
                </p>
                <div class="logo-crawl">
                  <a href="https://bsky.social/profile/did:plc:5szlrh3xkfxxsuu4mo6oe6h7">
                    <img src={blueskyLogo} />
                  </a>
                  <a href="https://tangled.org/@hexmani.ac/bluroma">
                    <img src={tangledLogo}></img>
                  </a>
                </div>
              </div>
            }
          />
        </div>
      </main>
    </>
  );
};

export default Login;
