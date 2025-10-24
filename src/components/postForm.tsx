import { Component, createSignal } from "solid-js";
import { agent } from "./login";
import { Client } from "@atcute/client";
import * as TID from "@atcute/tid";

const PostForm: Component = () => {
  const [notice, setNotice] = createSignal("");
  const [text, setText] = createSignal("");

  async function handleSubmit() {
    const rpc = new Client({ handler: agent });
    const rawText = text();

    document.querySelector(".submitInfo")?.removeAttribute("hidden");

    try {
      const res = await rpc.post("com.atproto.repo.createRecord", {
        input: {
          collection: "app.bsky.feed.post",
          record: {
            $type: "app.bsky.feed.post",
            text: rawText,
            langs: ["en"],
            createdAt: new Date().toISOString(),
          },
          repo: agent.sub,
          rkey: TID.now(),
        },
      });

      if (!res.ok) {
        throw new Error(`${res.data.error}/${res.data.message}`);
      }

      console.log(res);
      setNotice("Post successful");
      setTimeout(() => {
        setNotice("");
        document.querySelector(".submitInfo")?.setAttribute("hidden", "");
      }, 3000);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setNotice(`Failed to post: ${e.message}`);
      } else {
        setNotice(`Failed to post`);
      }
    }
  }

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
          onchange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" onclick={handleSubmit}>
          Post
        </button>
      </form>
      <p class="submitInfo" hidden>
        {notice()}
      </p>
    </>
  );
};

export default PostForm;
