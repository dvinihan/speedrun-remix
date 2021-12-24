import { ActionFunction, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ params }) => {
  const { id } = params;
  await db.segment.delete({ where: { id } });
  return redirect("/");
};
