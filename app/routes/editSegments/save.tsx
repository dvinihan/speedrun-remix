import { ActionFunction, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const names = form.getAll("name");
  const ids = form.getAll("id");
  const newNames = form.getAll("newName");

  if (!ids && !newNames) {
    throw new Response("no IDs or newNames provided", { status: 404 });
  }

  if (newNames) {
    const createPromises = newNames
      .filter((n) => Boolean(n))
      .map((newName) =>
        db.segment.create({
          data: { name: newName.toString() },
        })
      );
    await Promise.all(createPromises);
  }

  if (ids) {
    const updatePromises = ids.map((id, index) =>
      db.segment.update({
        where: { id: id.toString() },
        data: { name: names[index].toString() },
      })
    );

    await Promise.all(updatePromises);
  }

  return redirect("/");
};
