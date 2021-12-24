import { ActionFunction, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id");
  await db.segment.delete({ where: { id: id?.toString() } });
  return redirect("/");
};
