import { AppBskyFeedPost } from "@atcute/bluesky";
import { ProfileViewBasic } from "@atcute/bluesky/types/app/actor/defs";

export type Post = {
  avatar?: string;
  context?: PostContext;
  counts: PostCounts;
  createdAt: Date;
  displayName: string;
  handle: string;
  indexedAt: Date;
  record: AppBskyFeedPost.Main;
};

type PostCounts = {
  bookmarkCount?: number;
  likeCount?: number;
  quoteCount?: number;
  repostCount?: number;
  replyCount?: number;
};

type PostContext = {
  invoker: ProfileViewBasic;
  reason: string;
};
