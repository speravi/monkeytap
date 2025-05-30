import { patternPlaybackState, SOUNDS } from "../soundsConfig";

export function playSound(soundId: string, volume: number): void {
  if (soundId === "none") return; // No sound if "none" is selected

  const click_sound = SOUNDS.find((t) => t.id === soundId);
  if (!click_sound || click_sound.files.length === 0) {
    console.log(`Sound theme "${soundId}" not found or has no files.`);
    return;
  }

  const playbackState = patternPlaybackState[click_sound.id];
  let soundFileSrc: string | undefined;

  switch (click_sound.pattern) {
    case "random":
      soundFileSrc =
        click_sound.files[Math.floor(Math.random() * click_sound.files.length)]
          .src;
      break;
    case "sequential":
      if (!playbackState) break;
      soundFileSrc = click_sound.files[playbackState.currentIndex].src;
      playbackState.currentIndex =
        (playbackState.currentIndex + 1) % click_sound.files.length;
      break;
    case "ping-pong":
      if (!playbackState || click_sound.files.length === 0) break;
      if (click_sound.files.length === 1) {
        // single file case for ping-pong
        soundFileSrc = click_sound.files[0].src;
        break;
      }

      soundFileSrc = click_sound.files[playbackState.currentIndex].src;
      if (playbackState.direction === "forward") {
        if (playbackState.currentIndex >= click_sound.files.length - 1) {
          playbackState.direction = "backward";
          // Move to the second to last, or 0 if only two files
          playbackState.currentIndex = Math.max(
            0,
            click_sound.files.length - 2
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
            click_sound.files.length - 1
          );
        } else {
          playbackState.currentIndex--;
        }
      }
      break;
    case "first":
      soundFileSrc = click_sound.files[0]?.src;
      break;
    default:
      console.warn(`Unknown sound pattern: ${click_sound.pattern}`);
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
