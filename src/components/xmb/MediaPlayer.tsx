import React, { useRef, useEffect } from "react";
import "./MediaPlayer.css";

// MediaPlayer props
interface MediaPlayerProps {
  src: string;
  onClose: () => void;
  minimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
  onNextTrack?: () => void; // Add this
  onPrevTrack?: () => void; // Add this
  hasNext?: boolean; // Add this (optional, for disabling)
  hasPrev?: boolean; // Add this (optional, for disabling)
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  src,
  onClose,
  minimized = false,
  onMinimize,
  onRestore,
  onNextTrack,
  onPrevTrack,
  hasNext,
  hasPrev,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element
  const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu element
  const isAudio = src && src.toLowerCase().endsWith(".mp3"); // Check if the source is an audio file

  // Toggle play/pause
  const handleTogglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } else {
      console.log("Video reference is null");
    }
  };

  // Add spacebar keydown handler
  useEffect(() => {
    if (minimized) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleTogglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [minimized]);

  // Auto play the video when src changes and not minimized
  useEffect(() => {
    if (videoRef.current && src && !minimized) {
      videoRef.current.play().catch(() => {});
    }
  }, [src, minimized]);

  // Handle menu button click
  const handleMenuButtonClick = () => {
    console.log("Menu button clicked");
  };

  // Handle close player click
  const handleCloseButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  // Handle minimize button click
  const handleMinimizeButtonClick = () => {
    if (minimized) {
      if (onRestore) onRestore();
      console.log("Restore button clicked");
    } else {
      if (onMinimize) {
        onMinimize();
        setTimeout(() => menuRef.current?.focus(), 0);
      }
      console.log("Minimize button clicked");
    }
  };

  // Handle reset track button click
  const handleToggleResetClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    } else {
      console.log("Video reference is null");
    }
  };

  return (
    <div className="media-container">
      <div
        className={`media-player${minimized ? " minimized" : ""}`}
        tabIndex={-1}
        style={minimized ? { pointerEvents: "auto" } : {}}
      >
        {/* Overlay with buttons */}
        <div className="media-overlay">
          <button
            className="media-button main-media-btn"
            onClick={handleTogglePlayPause}
          ></button>
          <button
            className="media-button cir-media-btn menu-btn"
            onClick={handleMenuButtonClick}
          />
          <button
            className="media-button cir-media-btn close-btn"
            onClick={handleCloseButtonClick}
          ></button>
          <button
            className="media-button cir-media-btn minimize-btn"
            onClick={handleMinimizeButtonClick}
          ></button>
          <button
            className="media-button reset-btn"
            onClick={handleToggleResetClick}
          ></button>
          <button
            className="media-button pill-btn next-track-btn"
            onClick={onNextTrack}
            disabled={!hasNext}
          />
          <button
            className="media-button pill-btn prev-track-btn"
            onClick={onPrevTrack}
            disabled={!hasPrev}
          />
        </div>

        {/* Video content */}
        <div className={`media-content${minimized ? " minimized" : ""}`}>
          {src ? (
            isAudio ? (
              <div className="media-element audio-bg">
                <audio
                  ref={videoRef as React.RefObject<HTMLAudioElement>}
                  src={src}
                  controls
                  autoPlay
                  style={{ width: "100%" }}
                />
              </div>
            ) : (
              <video
                ref={videoRef}
                src={src}
                className="media-element"
                disablePictureInPicture
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
