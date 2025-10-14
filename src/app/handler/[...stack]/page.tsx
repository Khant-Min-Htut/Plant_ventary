import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack.tsx/server";

export default function Handler(props: unknown) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
