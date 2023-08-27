import { type RouterOutputs } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { author, post } = props;
  return (
    <Card>
      <CardHeader className="flex flex-row">
        <Avatar>
          <AvatarImage
            src={
              author?.imageUrl ??
              `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${author?.id}`
            }
          />
        </Avatar>
        <CardTitle className="px-4 text-sm text-slate-700">
          <span>{author?.firstName} · </span>
          <span className="">{dayjs(post.createdAt).fromNow()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
};
