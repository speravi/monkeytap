import { SoundPacks, SoundPack } from "../soundsConfig";

let audioContext: AudioContext | null = null;
const audioBuffers: Record<string, AudioBuffer[]> = {};
const currentIndex: Record<string, number> = {};

// Initialize AudioContext (must be done after user interaction)
function initAudioContext(): void {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }
}

async function preloadSoundPack(pack: SoundPack): Promise<void> {
  if (pack.id === "none") return;

  // Initialize AudioContext if not already done
  initAudioContext();

  // Initialize index
  currentIndex[pack.id] = 0;

  // Create array to hold audio buffers
  audioBuffers[pack.id] = [];

  // Load each file
  for (let i = 0; i < pack.files.length; i++) {
    const file = pack.files[i];

    try {
      const audioBuffer = await loadAudioBuffer(file.src);
      audioBuffers[pack.id].push(audioBuffer);
      console.log(`Loaded: ${file.src}`);
    } catch (error) {
      console.error(`Failed to load: ${file.src}`, error);
    }
  }
}

async function loadAudioBuffer(src: string): Promise<AudioBuffer> {
  if (!audioContext) {
    throw new Error("AudioContext not initialized");
  }

  // Fetch the audio file as array buffer
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  // Decode the audio data
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return audioBuffer;
}

// Get the next sound index based on the pattern
function getNextSoundIndex(soundPackId: string): number {
  const pack = SoundPacks.find((p) => p.id === soundPackId);
  if (!pack || !audioBuffers[soundPackId]) {
    return 0;
  }

  const buffers = audioBuffers[soundPackId];
  const pattern = pack.pattern || "sequential"; // Default to sequential if no pattern

  let index: number;

  switch (pattern) {
    case "random":
      index = Math.floor(Math.random() * buffers.length);
      break;

    case "sequential":
      index = currentIndex[soundPackId];
      currentIndex[soundPackId] =
        (currentIndex[soundPackId] + 1) % buffers.length;
      break;

    default:
      // Handle custom patterns
      if (typeof pattern === "string" && pattern.includes(",")) {
        const patternArray = pattern
          .split(",")
          .map((num) => parseInt(num.trim()));
        const patternIndex = currentIndex[soundPackId] % patternArray.length;
        index = patternArray[patternIndex];
        // Make sure the index is valid
        index = Math.min(index, buffers.length - 1);
        currentIndex[soundPackId] =
          (currentIndex[soundPackId] + 1) % patternArray.length;
      } else {
        // Fallback to sequential for unknown patterns
        index = currentIndex[soundPackId];
        currentIndex[soundPackId] =
          (currentIndex[soundPackId] + 1) % buffers.length;
      }
      break;
  }

  return index;
}

export async function preloadAllSoundPacks(): Promise<void> {
  console.log("Starting to preload all sound packs...");
  for (const pack of SoundPacks) {
    await preloadSoundPack(pack);
  }
  console.log("All sound packs preloaded");
}

export function playSound(soundPackId: string, volume: number): void {
  if (soundPackId === "none") return;

  if (!audioContext) {
    console.warn("AudioContext not initialized");
    return;
  }

  // Resume AudioContext if it's suspended (browser autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const buffers = audioBuffers[soundPackId];
  if (!buffers || buffers.length === 0) {
    console.warn(`No audio loaded for sound pack: ${soundPackId}`);
    return;
  }

  // Get the index based on the pattern
  const index = getNextSoundIndex(soundPackId);
  const buffer = buffers[index];
  // Create a new source node for this playback
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  // Create gain node for volume control
  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume;

  // Connect: source -> gain -> destination
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start playback immediately
  source.start(0);

  // Note: BufferSource nodes are one-time use and will be garbage collected
  // after playback finishes, so no cleanup needed
}

// Initialize audio context on first user interaction
export function initializeAudio(): void {
  initAudioContext();
}

// Clean up resources when needed
export function cleanup(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
