/* @refresh reload */
import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";

import Login from "./routes/login";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={Login}>
      <Route path="/" component={Login} />
    </Router>
  ),
  root!,
);
