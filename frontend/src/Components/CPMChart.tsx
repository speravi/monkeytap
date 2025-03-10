import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGame } from "../GameContext";

type DataPoint = {
  second: number;
  cpm: number;
};

// TODO: known issues:
// sometimes chart shows x+1 of gameDuration
// last second (when game ends) is 0 wpm
// not sure if cpm is calculated correctly
// ...?
const CPMChart = () => {
  const { state } = useGame();
  const { clickTimes, startTime } = state;

  const calculateCPMData = (): DataPoint[] => {
    if (!startTime || clickTimes.length === 0) {
      return [];
    }

    // Determine the duration of the game
    const gameEndTime = clickTimes[clickTimes.length - 1]; // Last click is when the game ended
    const totalGameDurationSeconds = Math.ceil(
      (gameEndTime - startTime) / 1000
    );

    // Group clicks by second
    const clicksPerSecond: Record<number, number> = {};

    // Initialize all seconds with 0 clicks
    for (let i = 0; i <= totalGameDurationSeconds; i++) {
      clicksPerSecond[i] = 0;
    }

    // Count clicks per second (excluding the last click which was likely the failing click)
    const validClicks =
      state.timerDuration === 0
        ? clickTimes.slice(0, -1) // In unlimited mode, exclude the last click (the failing click)
        : clickTimes; // In timed mode, include all clicks

    validClicks.forEach((time) => {
      const secondsSinceStart = Math.floor((time - startTime) / 1000);
      if (
        secondsSinceStart >= 0 &&
        secondsSinceStart <= totalGameDurationSeconds
      ) {
        clicksPerSecond[secondsSinceStart] =
          (clicksPerSecond[secondsSinceStart] || 0) + 1;
      }
    });

    // Convert to CPM and create data points
    const data: DataPoint[] = Object.entries(clicksPerSecond).map(
      ([second, clicks]) => ({
        second: parseInt(second, 10),
        cpm: clicks * 60, // Convert clicks per second to clicks per minute
      })
    );

    return data.sort((a, b) => a.second - b.second);
  };

  const chartData = calculateCPMData();

  // If no data, show a message instead
  if (chartData.length === 0) {
    return (
      <div className="text-center text-inactive my-4">
        No click data available
      </div>
    );
  }

  // Calculate average CPM
  const totalClicks =
    state.timerDuration === 0
      ? clickTimes.length - 1 // In unlimited mode, don't count the last click (failing click)
      : clickTimes.length; // In timed mode, count all clicks

  // Calculate test duration - different for timed vs unlimited mode
  // TODO: could be simplified
  let testDurationSeconds: number;
  if (state.timerDuration > 0) {
    // For timed mode, use the timer duration minus time left
    testDurationSeconds = state.timerDuration - state.timeLeft;
  } else if (clickTimes.length > 0) {
    // For unlimited mode, use the time between first and last click
    testDurationSeconds =
      (clickTimes[clickTimes.length - 1] - startTime) / 1000;
  } else {
    testDurationSeconds = 0;
  }

  const averageCPM =
    testDurationSeconds > 0
      ? Math.round((totalClicks / testDurationSeconds) * 60)
      : 0;

  return (
    <div className="w-full">
      <div className="text-center mb-2">
        <span className="text-md text-active">Average CPM: {averageCPM}</span>
        {state.timerDuration === 0 && (
          <span className="text-sm text-inactive ml-2">
            (Duration: {Math.round(testDurationSeconds)}s)
          </span>
        )}
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="second"
              label={{
                value: "Seconds",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Clicks per Minute",
                angle: -90,
                position: "insideLeft",
              }}
              domain={[0, "auto"]}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value} CPM`,
                "Clicks per Minute",
              ]}
              labelFormatter={(label: number) => `Second ${label}`}
            />
            <Line
              type="monotone"
              dataKey="cpm"
              stroke="var(--color-active)"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CPMChart;
