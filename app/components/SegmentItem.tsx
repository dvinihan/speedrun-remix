import { Segment } from "@prisma/client";

type Props = {
  segment: Segment;
};

export function SegmentItem({ segment }: Props) {
  const { name, id } = segment;

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
