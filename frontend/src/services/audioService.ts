import { patternPlaybackState, SoundPacks } from "../soundsConfig";

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
    const audio = new Audio(soundFileSrc);
    audio.volume = Math.max(0, Math.min(1, volume / 100));
    audio.play().catch((error) => {
      console.error(`Error playing sound "${soundFileSrc}":`, error);
    });
  }
}
