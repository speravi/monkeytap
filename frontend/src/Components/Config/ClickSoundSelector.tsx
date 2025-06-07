import { useGame } from "../../GameContext";
import { playSound } from "../../services/audioService";
import { SoundPacks } from "../../soundsConfig";

const ClickSoundSelector = () => {
  const { state, dispatch } = useGame();

  const handleSoundChange = (clickSound: string) => {
    playSound(clickSound, state.clickSoundVolume);
    dispatch({ type: "SET_CLICK_SOUND", payload: clickSound });
  };
  const handleVolumeChange = (volume: number) => {
    dispatch({ type: "SET_CLICK_SOUND_VOLUME", payload: volume });
  };

  return (
    <>
      <div className="flex space-x-2 mb-2 px-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={state.clickSoundVolume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="range-slider"
        />
        <label className="block text-sm font-medium w-full">
          {Math.round(state.clickSoundVolume * 100)}%
        </label>
      </div>

      <div className="grid grid-cols-2  lg:grid-cols-3 gap-2">
        {SoundPacks.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => handleSoundChange(id)}
            className={`
              px-3 
              flex items-center justify-between
              hover:text-text
              ${state.clickSound === id ? `text-active` : `text-inactive`}
            `}
          >
            <span>{name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default ClickSoundSelector;
