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
import { calculateAverageCPM, calculateCPMData } from "../utils/CPMCalculator";

const CPMChart = () => {
  const { state } = useGame();

  // No graph for games under 2 sec
  if (state.testDuration < 2) {
    return (
      <div className="text-center text-inactive my-4">
        game too short to display CPM graph
      </div>
    );
  }

  const chartData = calculateCPMData(
    state.clickTimes,
    state.startTime,
    state.testDuration
  );

  const averageCPM = calculateAverageCPM(
    state.clickTimes,
    state.startTime,
    state.endTime,
    state.testDuration,
    state.timerDuration
  );

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
