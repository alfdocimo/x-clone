import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { user } = useUser();
  return (
    <nav className="border border-b-slate-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/">
          <span className="font-bold">Yitter</span>
        </Link>
        <div className="flex items-center">
          <div className="px-4">
            <SignOutButton>
              <Button variant={"outline"}>Sign out</Button>
            </SignOutButton>
          </div>
          <span className="hidden px-4 md:block">{user?.firstName}</span>
          <Avatar>
            <AvatarImage
              src={
                user?.imageUrl ??
                `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${user?.id}`
              }
            />
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
