import { DataPoint } from "../types/types";

export const calculateCPMData = (
  clickTimes: number[],
  startTime: number,
  testDuration: number
): DataPoint[] => {
  if (!startTime || clickTimes.length === 0) {
    return [];
  }

  const clicksPerSecond: Record<number, number> = {};

  for (let i = 1; i <= testDuration; i++) {
    clicksPerSecond[i] = 0;
  }

  // Count clicks for each completed second
  clickTimes.forEach((time) => {
    // Calculate which second this click belongs to
    const secondsSinceStart = Math.ceil((time - startTime) / 1000);

    // Only count clicks that occurred during complete seconds
    if (secondsSinceStart >= 1 && secondsSinceStart <= testDuration) {
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

export const calculateAverageCPM = (
  clickTimes: number[],
  startTime: number,
  endTime: number,
  testDuration: number,
  timerDuration: number
): number => {
  if (!startTime || clickTimes.length === 0) {
    return 0;
  }

  // subtract one click if test ended before timer runs out or timer was infinite
  let validClicksCount = clickTimes.length;
  if (testDuration < timerDuration || timerDuration === 0) {
    validClicksCount = clickTimes.length - 1;
  }

  const totalGameDurationSeconds = Math.round((endTime - startTime) / 1000);

  return totalGameDurationSeconds > 0
    ? Math.round((validClicksCount / totalGameDurationSeconds) * 60)
    : 0;
};
