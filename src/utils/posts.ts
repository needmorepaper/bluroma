import { Client } from "@atcute/client";
import { agent } from "../components/login";
import { FeedViewPost } from "@atcute/bluesky/types/app/feed/defs";
import type { Post } from "../types/post";
import { is } from "@atcute/lexicons";
import { AppBskyFeedPost } from "@atcute/bluesky";

export async function getFollowingTimeline(
  cursor: string = "",
  limit: number = 50,
) {
  const rpc = new Client({ handler: agent });

  const res = await rpc.get("app.bsky.feed.getTimeline", {
    params: {
      cursor,
      limit,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch user's following timeline: ${res.data.error}/${res.data.message}`,
    );
  }

  return { feed: res.data.feed, cursor: res.data.cursor };
}

export async function createPostElements(feed: FeedViewPost[]) {
  let elms: Post[] = [];
  const seenCreators = new Set<string>();

  feed.forEach((post) => {
    if (is(AppBskyFeedPost.mainSchema, post.post.record)) {
      const record = post.post.record as unknown as AppBskyFeedPost.Main;
      const isReply = record.reply !== undefined;
      const creatorDid = post.post.author.did;

      // Skip replies from creators who already have a post in elms
      if (isReply && seenCreators.has(creatorDid)) {
        return;
      }

      if (post.reason) {
        if (post.reason.$type === "app.bsky.feed.defs#reasonRepost") {
          elms.push({
            avatar: post.post.author.avatar,
            context: {
              invoker: post.reason.by,
              reason: post.reason.$type,
            },
            counts: {
              bookmarkCount: post.post.bookmarkCount,
              likeCount: post.post.likeCount,
              quoteCount: post.post.quoteCount,
              repostCount: post.post.repostCount,
              replyCount: post.post.replyCount,
            },
            createdAt: new Date(post.post.record.createdAt),
            displayName:
              post.post.author.displayName || post.post.author.handle,
            handle: post.post.author.handle,
            indexedAt: new Date(post.post.indexedAt),
            record: record,
          });
          seenCreators.add(creatorDid);
        }
      } else {
        elms.push({
          avatar: post.post.author.avatar,
          counts: {
            bookmarkCount: post.post.bookmarkCount,
            likeCount: post.post.likeCount,
            quoteCount: post.post.quoteCount,
            repostCount: post.post.repostCount,
            replyCount: post.post.replyCount,
          },
          createdAt: new Date(post.post.record.createdAt),
          displayName: post.post.author.displayName || post.post.author.handle,
          handle: post.post.author.handle,
          indexedAt: new Date(post.post.indexedAt),
          record: record,
        });
        seenCreators.add(creatorDid);
      }
    }
  });

  return elms;
}
