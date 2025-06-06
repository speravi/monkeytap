import { patternPlaybackState, SoundPacks } from "../soundsConfig";

const AUDIO_POOL_SIZE = 10;

// The cache will now store an object containing a pool of audio elements and a counter.
const preloadedAudioCache: Record<
  string,
  {
    pool: HTMLAudioElement[];
    counter: number;
  }
> = {};

// This function now preloads a POOL of audio elements for a single sound file.
function preloadAudioFile(filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Check if already in cache or if filePath is empty/null
    if (!filePath || preloadedAudioCache[filePath]) {
      resolve(); // Already preloaded or nothing to preload
      return;
    }

    const loadPromises: Promise<HTMLAudioElement>[] = [];
    const audioPool: HTMLAudioElement[] = [];

    for (let i = 0; i < AUDIO_POOL_SIZE; i++) {
      const audio = new Audio(filePath);
      audioPool.push(audio);
      const promise = new Promise<HTMLAudioElement>(
        (resolvePromise, rejectPromise) => {
          audio.oncanplaythrough = () => resolvePromise(audio);
          audio.onerror = (e) => {
            console.error(`Error preloading sound: ${filePath}`, e);
            rejectPromise(new Error(`Failed to load ${filePath}`));
          };
          audio.load();
        }
      );
      loadPromises.push(promise);
    }

    Promise.all(loadPromises)
      .then((loadedAudios) => {
        // Once all audio elements for this sound are loaded, add them to the cache.
        preloadedAudioCache[filePath] = {
          pool: loadedAudios,
          counter: 0, // Initialize a counter to cycle through the pool.
        };
        resolve();
      })
      .catch((error) => {
        // If any of the audio files in the pool fail to load, reject the whole process for this file.
        reject(error);
      });
  });
}

export function preloadAllSoundPacks(): Promise<(void | Error)[][]> {
  const allThemesPreloadPromises = SoundPacks.map((clickSound) => {
    if (
      clickSound.id === "none" ||
      !clickSound.files ||
      clickSound.files.length === 0
    ) {
      return Promise.resolve<void[]>([]);
    }

    const clickSoundFilePromises = clickSound.files.map((file) =>
      preloadAudioFile(file.src).catch((error) => error)
    );
    return Promise.all(clickSoundFilePromises);
  });

  return Promise.all(allThemesPreloadPromises.map((p) => p.catch((e) => e)));
}
export function playSound(soundPackId: string, volume: number): void {
  if (soundPackId === "none") return;
  console.log("playing sound at volume:", volume);
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
    // Retrieve the entire pool object for the selected sound file.
    const audioPoolData = preloadedAudioCache[soundFileSrc];

    if (audioPoolData && audioPoolData.pool.length > 0) {
      // Get the next available audio element from the pool using the counter.
      const audio = audioPoolData.pool[audioPoolData.counter];

      // Increment the counter for the next playback, wrapping around if it reaches the end of the pool.
      audioPoolData.counter = (audioPoolData.counter + 1) % AUDIO_POOL_SIZE;

      audio.currentTime = 0; // Rewind the sound to the beginning.
      audio.volume = Math.max(0, Math.min(1, volume / 100)); // GameContext stores volume as 0-100, HTMLAudioElement needs 0-1.

      audio.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error(
            `Error playing preloaded sound "${soundFileSrc}":`,
            error
          );
        }
      });
    } else {
      console.warn(
        `Sound "${soundFileSrc}" not played: not found in preload cache.`
      );
    }
  }
}
