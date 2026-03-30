const units = [
  { label: "Y", val: 1000 * 60 * 60 * 24 * 365 },
  { label: "Mo", val: 1000 * 60 * 60 * 24 * 30 },
  { label: "D", val: 1000 * 60 * 60 * 24 },
  { label: "H", val: 1000 * 60 * 60 },
  { label: "M", val: 1000 * 60 },
  { label: "S", val: 1000 },
];

export const getTimeStr = (d: Date): string => {
  const now = new Date().getTime();
  const diff = Math.abs(now - d.getTime());

  for (const { label, val } of units) {
    const count = Math.floor(diff / val);
    if (count >= 1) {
      return `${count}${label}`;
    }
  }

  return "0S";
};
