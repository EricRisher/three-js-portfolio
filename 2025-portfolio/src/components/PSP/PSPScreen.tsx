import { usePSPStartup } from "@/context/PSPStartupContext";
import { useEffect, useState } from "react";
import Startup from "../xmb/Startup";
import VideoBackground from "../xmb/VideoBackground";
import XMBMenu from "../xmb/XMBMenu";

export default function PSPScreen({ showUI }: { showUI: boolean }) {
  const { phase, startPSPSequence } = usePSPStartup();
  const [startupEnded, setStartupEnded] = useState(false);

  useEffect(() => {
    if (showUI) startPSPSequence();
  }, [showUI, startPSPSequence]);

  useEffect(() => {
    if (phase === "showUI") setStartupEnded(true);
  }, [phase]);

  return (
    <div className="absolute w-full h-full flex justify-center items-end">
      <div className="w-[610px] h-[340px] relative overflow-hidden mb-[130px] bg-[#ff989865]">
        {!startupEnded && <Startup phase={phase} />}
        {startupEnded && <VideoBackground />}
        {startupEnded && <XMBMenu />}
      </div>
    </div>
  );
}
