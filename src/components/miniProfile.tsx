import { Component, Match, Show, Switch, createResource } from "solid-js";
import { Client } from "@atcute/client";
import { agent } from "./login";

type MiniProfileProps = {
  did: `did:${string}:${string}`;
};

async function getProfileDetails(did: `did:${string}:${string}`) {
  const rpc = new Client({ handler: agent });

  const res = await rpc.get("app.bsky.actor.getProfile", {
    params: {
      actor: did,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile details: ${res.status}`);
  }

  return res.data;
}

const MiniProfile = (props: MiniProfileProps) => {
  const [profileInfo] = createResource(agent.sub, getProfileDetails);

  return (
    <>
      <Show when={profileInfo.loading}>
        <p>loading...</p>
      </Show>
      <Switch>
        <Match when={profileInfo.error}>
          <p>Error: {profileInfo.error.message}</p>
        </Match>
        <Match when={profileInfo()}>
          <div
            class="mini-profile"
            // todo: add banner fade
            style={`background-image: linear-gradient(to bottom, rgba(15, 22, 30, 0.85)), url(${profileInfo()?.banner}); background-size: cover; background-repeat: no-repeat;`}
          >
            <img
              src={profileInfo()?.avatar}
              alt={`Profile picture for ${profileInfo()?.handle}`}
            />
            <div class="mini-profile-info">
              <p>{profileInfo()?.displayName}</p>
              <p>@{profileInfo()?.handle}</p>
            </div>
          </div>
        </Match>
      </Switch>
    </>
  );
};

export default MiniProfile;
