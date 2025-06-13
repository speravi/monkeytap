export interface SoundFile {
  src: string;
}

export interface SoundPack {
  id: string;
  name: string;
  files: SoundFile[];
  pattern?: string;
}

export const SoundPacks: SoundPack[] = [
  {
    id: "none",
    name: "none",
    files: [],
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
    pattern: "0,1,0,2",
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
    pattern: "random",
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
    pattern: "random",
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
    pattern: "random",
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
    pattern: "sequential",
  },
];
