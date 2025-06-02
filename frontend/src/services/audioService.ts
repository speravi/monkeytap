import { patternPlaybackState, SoundPacks } from "../soundsConfig";

const preloadedAudioCache: Record<string, HTMLAudioElement> = {};

export function preloadSoundPack(soundPackId: string): Promise<void[]> {
  const theme = SoundPacks.find((t) => t.id === soundPackId);
  if (!theme || theme.id === "none") {
    return Promise.resolve([]);
  }
  const preloadPromises = theme.files.map((file) => {
    return new Promise<void>((resolve, reject) => {
      if (!preloadedAudioCache[file.src]) {
        const audio = new Audio(file.src);
        // Event 'canplaythrough' indicates the browser believes it can play the audio through without stopping for buffering
        audio.oncanplaythrough = () => {
          preloadedAudioCache[file.src] = audio;
          resolve();
        };
        audio.onerror = (e) => {
          console.error(`Error preloading sound: ${file.src}`, e);
          reject(new Error(`Failed to load ${file.src}`));
        };
        audio.load(); // Explicitly tell the browser to load the audio file
      } else {
        resolve(); // Already preloaded
      }
    });
  });

  return Promise.all(preloadPromises);
}

export function playSound(soundPackId: string, volume: number): void {
  if (soundPackId === "none") return;

  const selectedSoundPack = SoundPacks.find((t) => t.id === soundPackId);
  if (!selectedSoundPack || selectedSoundPack.files.length === 0) {
    console.log(`Sound pack "${soundPackId}" not found or has no files.`);
    return;
  }

  const playbackState = patternPlaybackState[selectedSoundPack.id];
  let soundFileSrc: string | undefined;

  switch (selectedSoundPack.pattern) {
    case "random":
      soundFileSrc =
        selectedSoundPack.files[
          Math.floor(Math.random() * selectedSoundPack.files.length)
        ].src;
      break;
    case "sequential":
      if (!playbackState) break;
      soundFileSrc = selectedSoundPack.files[playbackState.currentIndex].src;
      playbackState.currentIndex =
        (playbackState.currentIndex + 1) % selectedSoundPack.files.length;
      break;
    case "ping-pong":
      if (!playbackState || selectedSoundPack.files.length === 0) break;
      if (selectedSoundPack.files.length === 1) {
        // single file case for ping-pong
        soundFileSrc = selectedSoundPack.files[0].src;
        break;
      }

      soundFileSrc = selectedSoundPack.files[playbackState.currentIndex].src;
      if (playbackState.direction === "forward") {
        if (playbackState.currentIndex >= selectedSoundPack.files.length - 1) {
          playbackState.direction = "backward";
          // Move to the second to last, or 0 if only two files
          playbackState.currentIndex = Math.max(
            0,
            selectedSoundPack.files.length - 2
          );
        } else {
          playbackState.currentIndex++;
        }
      } else {
        // 'backward'
        if (playbackState.currentIndex <= 0) {
          playbackState.direction = "forward";
          // Move to the second file, or the last if only two files
          playbackState.currentIndex = Math.min(
            1,
            selectedSoundPack.files.length - 1
          );
        } else {
          playbackState.currentIndex--;
        }
      }
      break;
    case "first":
      soundFileSrc = selectedSoundPack.files[0]?.src;
      break;
    default:
      console.warn(`Unknown sound pattern: ${selectedSoundPack.pattern}`);
      return;
  }

  if (soundFileSrc) {
    const audio = preloadedAudioCache[soundFileSrc];
    if (audio) {
      audio.currentTime = 0; // Crucial: Rewind the sound to the beginning
      audio.volume = Math.max(0, Math.min(1, volume));
      // .play() returns a Promise, which should be handled
      audio.play().catch((error) => {
        // Common error: "The play() request was interrupted..." if you click very fast.
        // This is usually fine for click sounds as you just want the latest one.
        if (error.name !== "AbortError") {
          console.error(
            `Error playing preloaded sound "${soundFileSrc}":`,
            error
          );
        }
      });
    } else {
      // Fallback or warning: This means the sound wasn't preloaded for some reason.
      console.warn(
        `Sound "${soundFileSrc}" not found in preload cache. Attempting to play directly (may cause lag).`
      );
      const fallbackAudio = new Audio(soundFileSrc);
      fallbackAudio.volume = Math.max(0, Math.min(1, volume));
      fallbackAudio
        .play()
        .catch((error) =>
          console.error(
            `Error playing fallback sound "${soundFileSrc}":`,
            error
          )
        );
    }
  }
}
