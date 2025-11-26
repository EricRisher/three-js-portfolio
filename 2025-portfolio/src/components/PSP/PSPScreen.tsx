import Startup from "../xmb/Startup";
import VideoBackground from "../xmb/VideoBackground";
import XMBMenu from "../xmb/XMBMenu";

export default function PSPScreen({ showUI }: { showUI: boolean }) {
  return (
    <div className="absolute w-full h-full flex justify-center items-end">
      <div className="w-[614px] h-[344px] relative overflow-hidden z-100 mb-[118px] rounded-sm">
        {showUI && (
          <>
            <Startup />
            <VideoBackground />
            <XMBMenu />
          </>
        )}
      </div>
    </div>
  );
}
