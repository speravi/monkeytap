import ActiveTileCountSelector from "./Config/ActiveTileCountSelector";
import GridSizeSelector from "./Config/GridSizeSelector";
import GridTileGapSelector from "./Config/GridTileGapSelector";
import LayoutSelector from "./Config/LayoutSelector";
import TimerSelector from "./Config/TimerSelector";
import Spacer from "./Spacer";

const QuickConfig = () => {
  return (
    <div
      className={`
          bg-elementBg rounded-md text-sm flex mb-2 p-2 flex-col
        `}
    >
      <div className="lg:pb-5">
        <div className="flex justify-center">
          <LayoutSelector />
        </div>
        <Spacer />
        <div className="flex justify-center">
          <GridSizeSelector />
        </div>
      </div>
      <div className="flex justify-center content-center md:flex-row flex-col ">
        <div>
          <div className={`flex justify-center text-inactive`}>timer</div>
          <div className="flex justify-center">
            <TimerSelector />
          </div>
        </div>
        <Spacer />
        <div>
          <div className={`flex justify-center text-inactive`}>
            active tile count
          </div>
          <div className="flex justify-center">
            <ActiveTileCountSelector />
          </div>
        </div>
        <Spacer />
        <div>
          <div className={`flex justify-center text-inactive`}>
            grid tile gap
          </div>
          <div className="flex justify-center">
            <GridTileGapSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickConfig;
