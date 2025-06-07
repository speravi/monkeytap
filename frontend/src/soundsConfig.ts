export type SoundPattern = "random" | "sequential" | "ping-pong" | "first";

export interface SoundFile {
  src: string;
}

export interface SoundPack {
  id: string;
  name: string;
  files: SoundFile[];
  pattern: SoundPattern;
}

export const SoundPacks: SoundPack[] = [
  {
    id: "none",
    name: "none",
    files: [],
    pattern: "first",
  },
  {
    id: "pop",
    name: "pop",
    files: [
      { src: `${import.meta.env.BASE_URL}sounds/pop/pop_0.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/pop/pop_1.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/pop/pop_2.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/pop/pop_3.wav` },
    ],
    pattern: "random",
  },
  {
    id: "guitar_notes",
    name: "guitar notes",
    files: [
      {
        src: `${
          import.meta.env.BASE_URL
        }/sounds/guitar_notes/guitar_notes_0.wav`,
      },
      {
        src: `${
          import.meta.env.BASE_URL
        }/sounds/guitar_notes/guitar_notes_1.wav`,
      },
      {
        src: `${
          import.meta.env.BASE_URL
        }/sounds/guitar_notes/guitar_notes_2.wav`,
      },
    ],
    pattern: "ping-pong", // Plays 0, 1, 2, 3, 2, 1, 0...
  },
  {
    id: "keyboard",
    name: "keyboard",
    files: [
      { src: `${import.meta.env.BASE_URL}sounds/keyboard/keyboard_0.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/keyboard/keyboard_1.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/keyboard/keyboard_2.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/keyboard/keyboard_3.wav` },
    ],
    pattern: "random",
  },
  {
    id: "knock",
    name: "knock",
    files: [
      { src: `${import.meta.env.BASE_URL}sounds/knock/knock_0.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/knock/knock_1.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/knock/knock_2.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/knock/knock_3.wav` },
    ],
    pattern: "random",
  },
  {
    id: "clack",
    name: "clack",
    files: [
      { src: `${import.meta.env.BASE_URL}sounds/clack/clack_0.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/clack/clack_1.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/clack/clack_2.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/clack/clack_3.wav` },
    ],
    pattern: "sequential", // Plays 0, 1, 2, 3, 0, 1, 2, 3...
  },
  {
    id: "mouse_click",
    name: "mouse click",
    files: [
      {
        src: `${import.meta.env.BASE_URL}sounds/mouse_click/mouse_click_0.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/mouse_click/mouse_click_1.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/mouse_click/mouse_click_2.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/mouse_click/mouse_click_3.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/mouse_click/mouse_click_4.wav`,
      },
    ],
    pattern: "sequential", // Plays 0, 1, 2, 3, 0, 1, 2, 3...
  },
  {
    id: "finger_snap",
    name: "finger snap",
    files: [
      {
        src: `${import.meta.env.BASE_URL}sounds/finger_snap/finger_snap_0.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/finger_snap/finger_snap_1.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/finger_snap/finger_snap_2.wav`,
      },
      {
        src: `${import.meta.env.BASE_URL}sounds/finger_snap/finger_snap_3.wav`,
      },
    ],
    pattern: "ping-pong",
  },
  {
    id: "sticks",
    name: "sticks",
    files: [
      { src: `${import.meta.env.BASE_URL}sounds/sticks/sticks_0.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/sticks/sticks_1.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/sticks/sticks_2.wav` },
      { src: `${import.meta.env.BASE_URL}sounds/sticks/sticks_3.wav` },
    ],
    pattern: "ping-pong",
  },
];

// This object will store the current playback state (e.g., index, direction)
// for patterns that need it. It will be managed by the audio service.
export interface PatternPlaybackState {
  currentIndex: number;
  direction?: "forward" | "backward"; // For 'ping-pong'
}
export const patternPlaybackState: Record<string, PatternPlaybackState> = {};

// Initialize playback state for themes that require it
SoundPacks.forEach((soundPack) => {
  if (
    soundPack.files.length > 0 &&
    (soundPack.pattern === "sequential" || soundPack.pattern === "ping-pong")
  ) {
    patternPlaybackState[soundPack.id] = {
      currentIndex: 0,
      direction: "forward",
    };
  }
});
