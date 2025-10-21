/* @refresh reload */
import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";
import Splash from "./routes/splash";
import Base from "./base";
import Dashboard from "./routes/dashboard";

render(
  () => (
    <Router root={Base}>
      <Route path="/" component={Splash} />
      <Route path="/dash" component={Dashboard} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
