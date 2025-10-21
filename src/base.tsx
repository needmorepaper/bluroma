import { RouteSectionProps } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";
import { retrieveSession, loginState } from "./components/login";
import Navbar from "./components/navbar";

const Base = (props: RouteSectionProps<unknown>) => {
  const [isLoading, setIsLoading] = createSignal(true);

  onMount(async () => {
    await retrieveSession();
    if (loginState() && location.pathname === "/") {
      window.location.href = "/dash";
    }
    setIsLoading(false);
  });

  return (
    <Show when={!isLoading()} fallback={<></>}>
      <>
        <header>
          <Navbar />
        </header>
        <main>{props.children}</main>
      </>
    </Show>
  );
};

export default Base;
