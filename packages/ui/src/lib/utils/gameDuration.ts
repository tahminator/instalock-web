export function formatGameDuration(ms: number): string {
  if (ms < 0 || !Number.isFinite(ms)) {
    throw new Error("Invalid milliseconds input");
  }

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (seconds === 0) {
    return `${minutes}m`;
  }

  const minPart = minutes > 0 ? `${minutes}m` : "";
  const secPart = `${seconds}s`;

  return minPart ? `${minPart} ${secPart}` : secPart;
}
