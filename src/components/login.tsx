import { Did, isHandle } from "@atcute/lexicons/syntax";
import {
  configureOAuth,
  createAuthorizationUrl,
  deleteStoredSession,
  finalizeAuthorization,
  getSession,
  OAuthUserAgent,
  resolveFromIdentity,
  resolveFromService,
  Session,
} from "@atcute/oauth-browser-client";
import { Component, createSignal } from "solid-js";
import Container from "./container";

configureOAuth({
  metadata: {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
  },
});

export const [loginState, setLoginState] = createSignal(false);
let agent: OAuthUserAgent;

const Login: Component = () => {
  const [notice, setNotice] = createSignal("");
  const [loginInput, setLoginInput] = createSignal("");

  const login = async (handle: string) => {
    try {
      if (!handle) return;
      let resolved;
      document.querySelector(".submitInfo")!.removeAttribute("hidden");
      document
        .querySelector('button[type="submit"]')!
        .setAttribute("disabled", "");
      if (!isHandle(handle)) {
        setNotice(`Resolving your service...`);
        resolved = await resolveFromService(handle);
      } else {
        setNotice(`Resolving your identity...`);
        resolved = await resolveFromIdentity(handle);
      }

      setNotice(`Contacting your data server...`);
      const authUrl = await createAuthorizationUrl({
        scope: import.meta.env.VITE_OAUTH_SCOPE,
        ...resolved,
      });

      setNotice(`Redirecting...`);
      await new Promise((resolve) => setTimeout(resolve, 500));

      location.assign(authUrl);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e);
        setNotice(`${e.message}`);
      } else {
        console.error(e);
        setNotice(`Unknown error, check console ¯\\_(ツ)_/¯`);
      }
    } finally {
      document
        .querySelector('button[type="submit"]')!
        .removeAttribute("disabled");
    }
  };

  return (
    <>
      <Container
        title="Log in"
        children={
          <>
            <div class="login">
              <form name="login" id="login" onclick={(e) => e.preventDefault()}>
                <label for="handle">Handle</label>
                <br />
                <input
                  type="text"
                  id="handle"
                  name="handle"
                  maxlength="255"
                  placeholder="soykaf.com"
                  onInput={(e) => setLoginInput(e.currentTarget.value)}
                  required
                />
                <br />
                <button type="submit" onclick={() => login(loginInput())}>
                  Login
                </button>
              </form>
              <p class="submitInfo" hidden>
                {notice()}
              </p>
            </div>
          </>
        }
      />
    </>
  );
};

const retrieveSession = async (): Promise<void> => {
  const init = async (): Promise<Session | undefined> => {
    const params = new URLSearchParams(location.hash.slice(1));

    if (params.has("state") && (params.has("code") || params.has("error"))) {
      history.replaceState(null, "", location.pathname + location.search);

      const session = await finalizeAuthorization(params);
      console.log("Finalizing authorization...", session);
      const agent = new OAuthUserAgent(session);
      console.log(await agent.getSession());
      const did = session.info.sub;

      localStorage.setItem("currentUser", did);
      return session;
    } else {
      const currentUser = localStorage.getItem("currentUser");

      if (currentUser) {
        try {
          console.log("Retrieving session...");
          return await getSession(currentUser as Did);
        } catch (err) {
          deleteStoredSession(currentUser as Did);
          localStorage.removeItem("currentUser");
          throw err;
        }
      }
    }
  };

  const session = await init().catch(() => {});

  if (session) {
    console.log("Retrieved session!", session);
    agent = new OAuthUserAgent(session);
    setLoginState(true);
  }
};

const killSession = async (): Promise<void> => {
  await agent.signOut();
  setLoginState(false);
  localStorage.removeItem("currentUser");
  location.href = "/";
};

export { agent, killSession, Login, retrieveSession };
