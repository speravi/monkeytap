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

const CPMChart = () => {
  const { state } = useGame();

  const calculateCPMData = (): DataPoint[] => {
    if (!state.startTime || state.clickTimes.length === 0) {
      return [];
    }

    const clicksPerSecond: Record<number, number> = {};

    for (let i = 1; i <= state.testDuration; i++) {
      clicksPerSecond[i] = 0;
    }

    // Count clicks for each completed second
    state.clickTimes.forEach((time) => {
      // Calculate which second this click belongs to
      const secondsSinceStart = Math.ceil((time - state.startTime) / 1000);

      // Only count clicks that occurred during complete seconds
      if (secondsSinceStart >= 1 && secondsSinceStart <= state.testDuration) {
        clicksPerSecond[secondsSinceStart] =
          (clicksPerSecond[secondsSinceStart] || 0) + 1;
      }
    });

    // Convert to CPM data points
    const data: DataPoint[] = Object.entries(clicksPerSecond).map(
      ([second, clicks]) => ({
        second: parseInt(second, 10),
        cpm: clicks * 60, // Convert clicks per second to clicks per minute
      })
    );

    return data.sort((a, b) => a.second - b.second);
  };

  const chartData = calculateCPMData();

  // No graph for games under 2 sec
  if (chartData.length < 2) {
    return (
      <div className="text-center text-inactive my-4">
        game too short to display CPM graph
      </div>
    );
  }

  // Calculate average CPM
  // subtract one click if test ended before timer runs out or timer was infinite
  var validClicksCount = state.clickTimes.length;
  if (state.testDuration < state.timerDuration || state.timerDuration === 0) {
    validClicksCount = state.clickTimes.length - 1;
  }

  const totalGameDurationSeconds = Math.round(
    (state.endTime - state.startTime) / 1000
  );

  const averageCPM =
    totalGameDurationSeconds > 0
      ? Math.round((validClicksCount / totalGameDurationSeconds) * 60)
      : 0;

  return (
    <div className="w-full">
      <div className="text-center mb-2">
        <span className="text-md text-active">average CPM: {averageCPM}</span>
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
                value: "seconds",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "clicks per minute",
                angle: -90,
                position: "insideTopleft",
                padding: 30,
                dx: -15,
              }}
              domain={[0, "auto"]}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value} CPM`,
                "clicks per Minute",
              ]}
              labelFormatter={(label: number) => `Second ${label}`}
              contentStyle={{
                backgroundColor: "var(--color-elementBg)",
                border: "none",
                borderRadius: "0.375rem",
                color: "var(--color-text)",
              }}
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
