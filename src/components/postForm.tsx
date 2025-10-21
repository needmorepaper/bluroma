import { Component } from "solid-js";

const PostForm: Component = () => {
  return (
    <>
      <form
        autocomplete="off"
        onclick={(e) => e.preventDefault()}
        class="post-form"
      >
        <textarea
          id="post-textbox"
          name="post-textbox"
          rows="1"
          cols="1"
          placeholder="The car's on fire, and there's no driver at the wheel..."
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default PostForm;
