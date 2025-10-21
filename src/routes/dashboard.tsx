import Container from "../components/container";
import { agent, killSession, loginState } from "../components/login";
import MiniProfile from "../components/miniProfile";
import PostForm from "../components/postForm";

const Dashboard = () => {
  if (!loginState()) {
    location.href = "/";
  }

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
                <p>No more posts</p>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default Dashboard;
