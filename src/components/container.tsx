import { JSX } from "solid-js";

type ContainerProps = {
  title: string;
  children?: JSX.Element;
};

const Container = (props: ContainerProps) => {
  return (
    <div class="container">
      <div class="container-header">
        <span>{props.title}</span>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default Container;
