import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { RunType } from "./types/RunType";
import { useState } from "react";
import { RunSegment } from "@prisma/client";

export type OutletContextTypes = {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  showEditSegments: boolean;
  setShowEditSegments: (showEditSegments: boolean) => void;
  runningTime: number;
  setRunningTime: (time: number) => void;
  startedAtTime: number;
  setStartedAtTime: (time: number) => void;
  runType: RunType;
  setRunType: (runType: RunType) => void;
  currentRunSegments: RunSegment[];
  setCurrentRunSegments: (
    segments:
      | RunSegment[]
      | ((currentRunSegments: RunSegment[]) => RunSegment[])
  ) => void;
};

export const meta: MetaFunction = () => {
  return { title: "Speedrun" };
};

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [runningTime, setRunningTime] = useState(0);
  const [startedAtTime, setStartedAtTime] = useState(0);
  const [runType, setRunType] = useState(RunType.ANY_PERCENT);
  const [currentRunSegments, setCurrentRunSegments] = useState<RunSegment[]>(
    []
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>SMO Speedrun Timer</h1>
        <select
        // defaultValue={runType}
        // disabled={isRunning}
        // onChange={handleRunTypeSelect}
        >
          <option value={RunType.WORLD_PEACE}>World Peace</option>
          <option value={RunType.ANY_PERCENT}>Any%</option>
        </select>
        <Outlet
          context={{
            isRunning,
            setIsRunning,
            runningTime,
            setRunningTime,
            startedAtTime,
            setStartedAtTime,
            runType,
            setRunType,
            currentRunSegments,
            setCurrentRunSegments,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
