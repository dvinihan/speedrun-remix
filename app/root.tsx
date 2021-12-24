import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
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
          <option
          // value={RunType.WORLD_PEACE}
          >
            World Peace
          </option>
          <option
          // value={RunType.ANY_PERCENT}
          >
            Any%
          </option>
        </select>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
