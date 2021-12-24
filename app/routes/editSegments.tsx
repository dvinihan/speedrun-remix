import { Segment } from "@prisma/client";
import { useState } from "react";
import { Form, LoaderFunction, Outlet, useLoaderData } from "remix";
import { EditableSegmentItem } from "~/components/EditableSegmentItem";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const segments = await db.segment.findMany();
  return segments;
};

export default function EditSegments() {
  const segments = useLoaderData<Segment[]>();
  const [newSegments, setNewSegments] = useState<{}[]>([]);

  const addNewSegment = () => {
    setNewSegments((current) => [...current, {}]);
  };

  const removeNewSegment = (indexToRemove: number) => {
    setNewSegments((current) =>
      current.filter((s, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <Form action="/editSegments/save" method="post">
        {segments.map((segment, index) => (
          <EditableSegmentItem
            key={`${segment.name}-${index}`}
            segment={segment}
          />
        ))}
        {newSegments.map((_, index) => (
          <div key={index}>
            <input name="index" value={index} hidden readOnly />
            <input name="newName" />
            <button onClick={() => removeNewSegment(index)}>Discard</button>
          </div>
        ))}
        <button onClick={addNewSegment} type="button">
          Add Segment
        </button>
        <button type="submit">Save</button>
      </Form>
      <Outlet />
    </div>
  );
}
