import RelativeTime from "@yaireo/relative-time";
import { Show } from "solid-js";
import type { Post } from "../types/post";

type PostProps = {
  data: Post;
};

// todo: don't just copy FA svgs in from akko-fe
const BoostIcon = () => {
  return (
    <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <title>Boost</title>
      <path
        class=""
        fill="#5dc94a"
        d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"
      ></path>
    </svg>
  );
};

const Post = (props: PostProps) => {
  return (
    <div class="post">
      <Show when={props.data.context}>
        <div class="post-context">
          <img
            src={props.data.context?.invoker.avatar}
            alt={`Profile picture of ${props.data.context?.invoker.handle}`}
          />
          <span class="post-context-user">
            {props.data.context?.invoker.displayName}
          </span>
          <BoostIcon />
          <span>reposted</span>
        </div>
      </Show>
      <div class="post-content">
        <img
          class="post-avatar"
          src={props.data.avatar}
          alt={`Profile picture of ${props.data.handle}`}
        />
        <div class="post-main">
          <div class="post-header">
            <div class="post-author">
              <span>{props.data.displayName}</span>
              <span class="post-author-handle">@{props.data.handle}</span>
            </div>
            <span class="post-time">
              {new RelativeTime({ options: { style: "narrow" } }).from(
                props.data.createdAt,
              )}
            </span>
          </div>
          <div class="post-body">{props.data.record.text}</div>
        </div>
      </div>
      <div class="post-interactions">
        <p>
          {props.data.counts.replyCount}{" "}
          {props.data.counts.replyCount === 1 ? "reply" : "replies"} |{" "}
          {props.data.counts.repostCount}{" "}
          {props.data.counts.repostCount === 1 ? "repost" : "reposts"} |{" "}
          {props.data.counts.likeCount}{" "}
          {props.data.counts.likeCount === 1 ? "like" : "likes"}
        </p>
      </div>
    </div>
  );
};

export default Post;
