import { useEffect } from "react";
import { useOutletContext } from "remix";
import { OutletContextTypes } from "~/root";

export const Stopwatch = () => {
  const {
    isRunning,
    setIsRunning,
    startedAtTime,
    setStartedAtTime,
    runningTime,
    setRunningTime,
    currentRunSegments,
    setCurrentRunSegments,
  } = useOutletContext<OutletContextTypes>();

  // timer
  useEffect(() => {
    let interval: NodeJS.Timer | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setRunningTime(Date.now() - startedAtTime + runningTime);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // we can't include runningTime or the timer will tick too quickly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, startedAtTime]);

  const performSplit = async () => {
    const newRunSegment = {
      runId,
      segmentId: currentSegmentId!,
      segmentTime,
      isCompleted,
    };

    setStartedAtTime(Date.now());
    setCurrentRunSegments((runSegments) => {
      const runSegment = runSegments.find(
        (r) => r.segmentId === currentSegmentId
      );
      if (runSegment) {
        return runSegments.map((r) =>
          r.segmentId === currentSegmentId ? newRunSegment : r
        );
      } else {
        return [...runSegments, newRunSegment];
      }
    });

    const res = await fetch(`/api/split?runType=${runType}`, {
      method: "POST",
      body: newRunSegment,
    });

    return data;
  };

  const start = () => {
    setIsRunning(true);
    setStartedAtTime(Date.now());
  };

  const resume = () => {
    setIsRunning(true);
    setStartedAtTime(Date.now());
  };

  const stop = () => {
    setIsRunning(false);
    performSplit({ isCompleted: false });
  };

  const reset = async () => {
    setIsRunning(false);
    setStartedAtTime(0);
    setRunningTime(0);

    const { data } = await axios.post<SplitRequestBody>(
      `/api/split?runType=${runType}`,
      {
        runId: (runId ?? 0) + 1,
        segmentId: segments[0].id,
        segmentTime: 0,
        isCompleted: false,
      }
    );
    queryClient.setQueryData([RUNS_QUERY_KEY, runType], data);
  };

  const split = () => {
    performSplit({ isCompleted: true });
  };

  const finish = () => {
    performSplit({ isCompleted: true });
    setIsRunning(false);
  };

  const isOnLastSegment = useMemo(() => {
    const lastSegment = segments.slice(-1)[0];
    return lastSegment ? lastSegment.id === currentSegmentId : false;
  }, [currentSegmentId, segments]);

  const isFinished = currentRunSegments.length === segments.length;

  return (
    <>
      <div>
        <div>
          {isRunning ? (
            <button onClick={stop}>Stop</button>
          ) : (
            <button
              disabled={isFinished}
              onClick={runningTime ? resume : start}
            >
              {runningTime ? "Resume" : "Start"}
            </button>
          )}
          <button
            color={isRunning ? "lightgreen" : ""}
            disabled={!isRunning}
            onClick={isOnLastSegment ? finish : split}
          >
            {isOnLastSegment ? "Finish" : "Split"}
          </button>
        </div>
        {isFinished && <div>Done!</div>}
        <div>{getDisplayTime(runningTime)}</div>
        <button disabled={isRunning} onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};
