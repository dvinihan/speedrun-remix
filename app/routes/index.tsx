import { Segment } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { SegmentItem } from "~/components/SegmentItem";

export const loader: LoaderFunction = async () => {
  const segments = await db.segment.findMany();
  return segments;
};

export default function Index() {
  const segments = useLoaderData<Segment[]>();

  return (
    <div>
      <h3>Segments:</h3>
      <div>
        <div>
          <div>
            {segments.map((segment) => (
              <SegmentItem key={segment.id} segment={segment} />
            ))}
          </div>
          <button onClick={() => (window.location.href = "/editSegments")}>
            Edit Route
          </button>
        </div>
        {/* <div>
          <Stopwatch />
          <Stats />
        </div> */}
      </div>
    </div>
  );
}
