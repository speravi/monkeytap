export type CursorType = "default" | "cross" | "dot";

export const getCursorSvg = (
  cursorType: CursorType,
  size: number = 24
): string => {
  const strokeWidth = Math.max(1, size / 12); // Dynamic stroke width based on size

  switch (cursorType) {
    case "cross":
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V22M2 12H22" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    case "dot":
      const radius = size / 4; // Make dot size proportional to cursor size
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="${radius}" fill="currentColor"/>
        </svg>
      `;
    default:
      return "";
  }
};

// TODO: wuh?
export const CURSOR_SVGS = {
  cross: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M2 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  dot: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" fill="currentColor"/>
    </svg>
  `,
};

export const CURSOR_OPTIONS: {
  id: CursorType;
  name: string;
  previewSvg?: string;
}[] = [
  { id: "default", name: "system default" },
  { id: "cross", name: "cross", previewSvg: CURSOR_SVGS.cross },
  { id: "dot", name: "dot", previewSvg: CURSOR_SVGS.dot },
];
