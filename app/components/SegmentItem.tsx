import { Segment } from "@prisma/client";
import { useActionData } from "remix";

type Props = {
  segment?: Segment;
};

export function SegmentItem({ segment }: Props) {
  const updatedSegment = useActionData<Segment>();
  const { name, id } = updatedSegment ?? segment ?? {};

  return (
    <div
    //   isActive={isActive}
    //   shouldCollapse={shouldCollapse}
    >
      <div>{name}</div>

      {/* <div>
          {bestSegmentTime && isActive && (
            <div>
              <div>Best</div>
              <div>{getDisplayTime(bestSegmentTime)}</div>
            </div>
          )}
          {thisRunSegment?.isCompleted && id && <OverUnder segmentId={id} />}
          <div>{getDisplayTime(timeToShow)}</div>
        </div> */}
    </div>
  );
}
