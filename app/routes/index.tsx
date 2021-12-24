import { RunSegment, Segment } from "@prisma/client";
import { LoaderFunction, useLoaderData, useOutletContext } from "remix";
import { db } from "~/utils/db.server";
import { SegmentItem } from "~/components/SegmentItem";
import { useEffect } from "react";
import { OutletContextTypes } from "~/root";

type LoaderData = {
  segments: Segment[];
  runSegments: RunSegment[];
};

export const loader: LoaderFunction = async () => {
  const segments = await db.segment.findMany();
  const runSegments = await db.runSegment.findMany();

  return { segments, runSegments } as LoaderData;
};

export default function Index() {
  const { segments, runSegments } = useLoaderData<LoaderData>();
  const { setCurrentRunSegments } = useOutletContext<OutletContextTypes>();

  useEffect(() => {
    setCurrentRunSegments(runSegments);
  }, [runSegments]);

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
