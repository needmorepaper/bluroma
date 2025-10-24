import { createResource, For, Match, Show, Switch } from "solid-js";
import Container from "../components/container";
import { agent, killSession, loginState } from "../components/login";
import MiniProfile from "../components/miniProfile";
import PostForm from "../components/postForm";
import { createPostElements, getFollowingTimeline } from "../utils/posts";
import Post from "../components/post";

async function renderTimeline() {
  const feed = await getFollowingTimeline();
  return await createPostElements(feed.feed);
}

const Dashboard = () => {
  if (!loginState()) {
    location.href = "/";
  }

  const [feed] = createResource(renderTimeline);

  return (
    <>
      <div id="sidebar">
        <Container
          title=""
          children={
            <>
              <MiniProfile did={agent.sub} />
              <PostForm />
              <button onClick={killSession}>Log out</button>
            </>
          }
        />
      </div>
      <div id="content">
        <Container
          title="Following"
          children={
            <div class="container-content">
              <div class="dashboard-feed">
                <Switch>
                  <Match when={feed.loading}>
                    <p>Loading...</p>
                  </Match>
                  <Match when={feed.error}>
                    <p>Error while loading timeline: {feed.error}</p>
                  </Match>
                  <Match when={feed()}>
                    <For each={feed()}>{(item) => <Post data={item} />}</For>
                    <p>No more posts</p>
                  </Match>
                </Switch>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default Dashboard;
