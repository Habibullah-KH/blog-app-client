import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function layout({ children, account, utilits }: { children: React.ReactNode; account: React.ReactNode; utilits: React.ReactNode }) {
  return (
    <div>
      <div className="m-5 flex gap-5">
        <Button render={<Link href={"/writeBlog"} />}>write blog</Button>
        <Button render={<Link href={"/utilits"} />}>utilits</Button>
        <Button render={<Link href={"/postInfo"} />}>postingo</Button>
        <Button render={<Link href={"/accountInfo"} />}>account info</Button>
      </div>
      {account}
      {utilits}
      {children}
    </div>
  );
}
