import { killSession, loginState } from "../components/login";

const Dashboard = () => {
  if (!loginState()) {
    location.href = "/";
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onclick={killSession}>Log out</button>
    </div>
  );
};

export default Dashboard;
