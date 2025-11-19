"use client";
import { PSPStartupProvider } from "@/context/PSPStartupContext";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./XMBMenu.css";
import PS3Header from "./PS3Header";
import MediaPlayer from "./MediaPlayer";
import TVPlayer from "./TVPlayer";
import menuItems from "../../app/data/menuItems";
import { navigateTo, getYOffset } from "../../../utils/helpers";
import {
  handlePhotoListKeyDown,
  handleVideoPlayerKeyDown,
  handleMainMenuKeyDown,
  handleMusicPlayerKeyDown,
} from "../../../utils/xmbKeyHandlers";

export default function XMBMenu() {

  // All hooks must be called unconditionally
  const [selected, setSelected] = useState(0);
  const [subSelectedMapping, setSubSelectedMapping] = useState<{
    [key: string]: number;
  }>({});
  const [activeSubmenu] = useState<string | null>(null);
  const [isPhotoListActive, setIsPhotoListActive] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVideoPlayerActive, setIsVideoPlayerActive] = useState(false);
  const [isVideoPlayerMinimized, setIsVideoPlayerMinimized] = useState(false);
  const [currentVideoList, setCurrentVideoList] = useState<
    { src: string; label: string; subheading: string }[]
  >([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentMusicList, setCurrentMusicList] = useState<
    { src: string; label: string; subheading: string }[]
  >([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isMusicPlayerActive, setIsMusicPlayerActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const musicOverlayRef = useRef<HTMLDivElement>(null);
  const [isGamePlayerActive, setIsGamePlayerActive] = useState(false);
  const [currentGameSrc, setCurrentGameSrc] = useState<string | null>(null);
  const [isInputLocked, setIsInputLocked] = useState(false);

  useEffect(() => {
    if (isVideoPlayerActive && videoOverlayRef.current) {
      videoOverlayRef.current.focus();
    }
  }, [isVideoPlayerActive]);

  useEffect(() => {
    if (isMusicPlayerActive && musicOverlayRef.current) {
      musicOverlayRef.current.focus();
    }
  }, [isMusicPlayerActive]);

  const currentSubSelected = useMemo(() => {
    return subSelectedMapping[menuItems[selected].id] ?? 0;
  }, [subSelectedMapping, selected]);

  const currentSubmenu = useMemo(() => {
    return menuItems[selected].submenu?.[currentSubSelected];
  }, [selected, currentSubSelected]);

  const currentPhotos = useMemo(() => {
    return currentSubmenu?.photos;
  }, [currentSubmenu]);

  const currentVideos = useMemo(() => {
    return currentSubmenu?.videos;
  }, [currentSubmenu]);

  const currentContent = useMemo(() => {
    return (
      menuItems[selected].submenu?.[currentSubSelected]?.content ||
      menuItems[selected].content ||
      ""
    );
  }, [selected, currentSubSelected]);

  const itemWidth = 120;
  const containerWidth = 680;
  const centerOffset = containerWidth / 5 - itemWidth / 2;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isInputLocked) return;
      if (
        (isVideoPlayerActive && !isVideoPlayerMinimized) ||
        (isMusicPlayerActive && !isVideoPlayerMinimized)
      ) {
        return;
      }
      if (isPhotoListActive) {
        handlePhotoListKeyDown(
          e,
          menuItems,
          selected,
          currentSubSelected,
          currentPhotoIndex,
          setCurrentPhotoIndex,
          setIsPhotoListActive
        );
        return;
      }
      handleMainMenuKeyDown(
        e,
        menuItems,
        selected,
        setSelected,
        currentSubSelected,
        setSubSelectedMapping,
        setIsPhotoListActive,
        setCurrentPhotoIndex,
        setCurrentVideoList,
        setCurrentVideoIndex,
        setIsVideoPlayerActive,
        setCurrentMusicList,
        setCurrentMusicIndex,
        setIsMusicPlayerActive,
        setIsGamePlayerActive,
        setCurrentGameSrc,
        isGamePlayerActive
      );
    },
    [
      isInputLocked,
      isVideoPlayerActive,
      isMusicPlayerActive,
      isVideoPlayerMinimized,
      isPhotoListActive,
      selected,
      currentSubSelected,
      currentPhotoIndex,
      setSelected,
      setSubSelectedMapping,
      setIsPhotoListActive,
      setCurrentPhotoIndex,
      setCurrentVideoList,
      setCurrentVideoIndex,
      setIsVideoPlayerActive,
      setCurrentMusicList,
      setCurrentMusicIndex,
      setIsMusicPlayerActive,
      setIsGamePlayerActive,
      setCurrentGameSrc,
      isGamePlayerActive,
    ]
  );

  // Only render UI when phase is "showUI"
  const isVisible = true;

  return (
    <div
      className={`transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.8s" }}
    >
      {/* <PS3Header /> */}

      <div
        ref={menuRef}
        className="outline-none flex flex-col h-screen relative overflow-visible pt-18"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full overflow-visible mt-0">
          <motion.div
            className="category-container flex overflow-visible"
            animate={{ x: centerOffset - selected * itemWidth }}
            transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id + index}
                className="category relative flex flex-col justify-center items-center cursor-pointer min-w-[120px] transition-transform duration-300 ease-in-out"
                animate={{
                  opacity: Math.abs(selected - index) > 2 ? 0.3 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={item.icon}
                  alt={item.label}
                  width="auto"
                  height={48}
                  style={{ maxWidth: 48, maxHeight: 48 }}
                  className={`transition ${
                    selected === index
                      ? "opacity-100 scale-110 filter drop-shadow-glow"
                      : "opacity-50"
                  }`}
                  animate={{
                    scale: selected === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="mt-2 text-white text-xl drop-shadow-glow"
                  animate={{ opacity: selected === index ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>

                {selected === index && item.submenu && (
                  <div className="absolute flex flex-col items-start z-50 w-[400px] top-20 left-7">
                    {item.submenu.map((sub, subIndex) => (
                      <motion.div
                        key={sub.id}
                        className={`flex flex-row items-center cursor-pointer relative z-50 m-2 ${
                          activeSubmenu === item.id &&
                          currentSubSelected !== subIndex
                            ? "hidden"
                            : ""
                        }`}
                        onClick={() => {
                          if (sub.url) navigateTo(sub.url);
                          if (sub.music && sub.music.length > 0) {
                            // Flatten all tracks from all music submenus
                            const allTracks =
                              menuItems
                                .find((item) => item.id === "music")
                                ?.submenu?.flatMap((sub) => sub.music || []) ||
                              [];
                            // Find the index of the clicked track in the flattened list
                            const clickedTrack = sub.music?.[0];
                            const startIndex = allTracks.findIndex(
                              (track) => track.src === clickedTrack?.src
                            );
                            setCurrentMusicList(allTracks);
                            setCurrentMusicIndex(
                              startIndex >= 0 ? startIndex : 0
                            );
                            setIsMusicPlayerActive(true);
                            setIsPhotoListActive(false);
                            setIsVideoPlayerActive(false);
                          }
                        }}
                        animate={{
                          y: getYOffset(subIndex, currentSubSelected),
                          opacity: currentSubSelected === subIndex ? 1 : 0.5,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <Image
                          src={sub.icon}
                          alt={sub.label}
                          width={48}
                          height={48}
                          style={{ maxWidth: 48, maxHeight: 48 }}
                          className={[
                            "submenu-icon",
                            "transition",
                            "mr-12",
                            sub.isDisc ? "disc-icon" : "",
                            sub.isDisc && currentSubSelected === subIndex
                              ? "spin"
                              : "",
                          ].join(" ")}
                        />

                        <motion.div className="flex flex-col">
                          <motion.span
                            className={`text-white text-2xl whitespace-nowrap ${
                              currentSubSelected === subIndex
                                ? "submenu-glow"
                                : ""
                            }`}
                            animate={{
                              opacity:
                                currentSubSelected === subIndex ? 1 : 0.8,
                            }}
                          >
                            {sub.label}
                          </motion.span>

                          {currentSubSelected === subIndex &&
                            sub.subheading && (
                              <motion.span
                                className="mt-1 text-gray-300 text-sm leading-4"
                                animate={{
                                  opacity: 1,
                                }}
                                initial={{
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.2,
                                }}
                              >
                                {sub.subheading}
                              </motion.span>
                            )}
                        </motion.div>

                        {currentSubSelected === subIndex && currentContent && (
                          <motion.div className="flex flex-col">
                            <motion.div
                              className="absolute top-0 ml-100 bg-[#000e55ad] border p-6 rounded-md shadow-lg text-white w-[400px] z-50"
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              {currentContent}
                            </motion.div>
                            {currentSubSelected === subIndex &&
                              sub.subheading && (
                                <motion.span
                                  className="mt-1 text-gray-300 text-sm leading-4"
                                  animate={{
                                    opacity: 1,
                                  }}
                                  initial={{
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                  }}
                                >
                                  {sub.subheading}
                                </motion.span>
                              )}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {isPhotoListActive && currentPhotos && (
          <div className="absolute top-130 left-100 w-auto h-full overflow-y-auto bg-[#000e5580] border p-6 rounded-md shadow-lg text-white z-50">
            {currentPhotos.map((photo, index) => (
              <motion.div
                key={index}
                className={`flex items-center p-4 cursor-pointer ${
                  currentPhotoIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-gray-300"
                }`}
                animate={{
                  scale: currentPhotoIndex === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  width={60}
                  height={60}
                  className="rounded-md mr-4"
                />
              </motion.div>
            ))}
          </div>
        )}

        {isPhotoListActive && currentVideos && (
          <div className="absolute top-130 left-100 w-auto h-full overflow-y-auto bg-[#000e55ad] border p-6 rounded-md shadow-lg text-white z-50">
            {currentVideos.map((video, index) => (
              <motion.div
                key={index}
                className={`flex items-center p-4 cursor-pointer ${
                  currentPhotoIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-gray-300"
                }`}
                animate={{
                  scale: currentPhotoIndex === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setCurrentVideoList(currentVideos); // keep as array of objects
                  setCurrentVideoIndex(index);
                  setIsVideoPlayerActive(true);
                  setIsPhotoListActive(false);
                }}
              >
                <span className="mr-4">{video.label}</span>
                <span className="text-xs text-gray-400">
                  {video.subheading}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {isVideoPlayerActive && (
          <div
            ref={videoOverlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            tabIndex={0}
            onKeyDown={(e) =>
              handleVideoPlayerKeyDown(e, setIsVideoPlayerActive, () =>
                menuRef.current?.focus()
              )
            }
          >
            <MediaPlayer
              src={currentVideoList[currentVideoIndex]?.src || ""}
              onClose={() => {
                setIsVideoPlayerActive(false);
                setIsVideoPlayerMinimized(false);
                setTimeout(() => menuRef.current?.focus(), 0);
              }}
              minimized={isVideoPlayerMinimized}
              onMinimize={() => {
                setIsVideoPlayerMinimized(true);
                setTimeout(() => menuRef.current?.focus(), 0);
              }}
              onRestore={() => setIsVideoPlayerMinimized(false)}
              onNextTrack={() => {
                if (currentVideoIndex < currentVideoList.length - 1) {
                  setCurrentVideoIndex(currentVideoIndex + 1);
                }
              }}
              onPrevTrack={() => {
                if (currentVideoIndex > 0) {
                  setCurrentVideoIndex(currentVideoIndex - 1);
                }
              }}
              hasNext={currentVideoIndex < currentVideoList.length - 1}
              hasPrev={currentVideoIndex > 0}
            />
          </div>
        )}

        {isMusicPlayerActive && (
          <div
            ref={musicOverlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            tabIndex={0}
            onKeyDown={(e) =>
              handleMusicPlayerKeyDown(e, setIsMusicPlayerActive, () =>
                menuRef.current?.focus()
              )
            }
          >
            <MediaPlayer
              src={currentMusicList[currentMusicIndex]?.src || ""}
              onClose={() => {
                setIsMusicPlayerActive(false);
                setTimeout(() => menuRef.current?.focus(), 0);
              }}
              minimized={isVideoPlayerMinimized}
              onMinimize={() => setIsVideoPlayerMinimized(true)}
              onRestore={() => setIsVideoPlayerMinimized(false)}
              onNextTrack={() => {
                if (currentMusicIndex < currentMusicList.length - 1) {
                  setCurrentMusicIndex(currentMusicIndex + 1);
                }
              }}
              onPrevTrack={() => {
                if (currentMusicIndex > 0) {
                  setCurrentMusicIndex(currentMusicIndex - 1);
                }
              }}
              hasNext={currentMusicIndex < currentMusicList.length - 1}
              hasPrev={currentMusicIndex > 0}
            />
          </div>
        )}
        {isGamePlayerActive && currentGameSrc && (
          <TVPlayer
            src={currentGameSrc}
            onClose={() => setIsGamePlayerActive(false)}
            setIsInputLocked={setIsInputLocked}
          />
        )}
      </div>
    </div>
  );
}
