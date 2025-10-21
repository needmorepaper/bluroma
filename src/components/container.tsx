import { JSX } from "solid-js";

type ContainerProps = {
  title: string;
  children?: JSX.Element;
};

const Container = (props: ContainerProps) => {
  return (
    <div class="container">
      {props.title ? (
        <div class="container-header">
          <span>{props.title}</span>
        </div>
      ) : (
        <></>
      )}
      {props.children}
    </div>
  );
};

export default Container;
