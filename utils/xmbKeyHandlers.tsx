import { navigateTo } from "./helpers";
import type { MenuItem } from "../src/app/data/menuItems";

export function handlePhotoListKeyDown(
  e: React.KeyboardEvent,
  menuItems: MenuItem[],
  selected: number,
  currentSubSelected: number,
  currentPhotoIndex: number,
  setCurrentPhotoIndex: (i: number) => void,
  setIsPhotoListActive: (b: boolean) => void
) {
  switch (e.key) {
    case "ArrowDown":
      if (
        menuItems[selected].submenu &&
        menuItems[selected].submenu![currentSubSelected]?.photos
      ) {
        const photos =
          menuItems[selected].submenu![currentSubSelected]?.photos || [];
        if (currentPhotoIndex < photos.length - 1) {
          setCurrentPhotoIndex(currentPhotoIndex + 1);
        }
      }
      break;
    case "ArrowUp":
      if (currentPhotoIndex > 0) {
        setCurrentPhotoIndex(currentPhotoIndex - 1);
      }
      break;
    case "Enter":
      console.log(
        `Selected photo: ${
          menuItems[selected].submenu![currentSubSelected]?.photos![
            currentPhotoIndex
          ].label
        }`
      );
      break;
    case "Escape":
      setIsPhotoListActive(false);
      break;
    default:
      break;
  }
}

export function handleVideoPlayerKeyDown(
  e: React.KeyboardEvent,
  setIsVideoPlayerActive: (b: boolean) => void,
  focusMenu?: () => void
) {
  switch (e.key) {
    case "Escape":
      setIsVideoPlayerActive(false);
      if (focusMenu) setTimeout(focusMenu, 0);
      break;
    default:
      break;
  }
}

export function handleMusicPlayerKeyDown(
  e: React.KeyboardEvent,
  setIsMusicPlayerActive: (b: boolean) => void,
  focusMenu?: () => void
) {
  switch (e.key) {
    case "Escape":
      setIsMusicPlayerActive(false);
      if (focusMenu) setTimeout(focusMenu, 0);
      break;
    default:
      break;
  }
}

export function handleGamePlayerKeyDown(
  e: React.KeyboardEvent,
  setIsGamePlayerActive: (b: boolean) => void,
  focusMenu?: () => void
) {
  switch (e.key) {
    case "Escape":
      setIsGamePlayerActive(false);
      if (focusMenu) setTimeout(focusMenu, 0);
      break;
    default:
      break;
  }
}

export function handleMainMenuKeyDown(
  e: React.KeyboardEvent,
  menuItems: MenuItem[],
  selected: number,
  setSelected: (i: number) => void,
  currentSubSelected: number,
  setSubSelectedMapping: (
    fn: (prev: Record<string, number>) => Record<string, number>
  ) => void,
  setIsPhotoListActive: (b: boolean) => void,
  setCurrentPhotoIndex: (i: number) => void,
  setCurrentVideoList: (
    list: { src: string; label: string; subheading: string }[]
  ) => void,
  setCurrentVideoIndex: (i: number) => void,
  setIsVideoPlayerActive: (b: boolean) => void,
  setCurrentMusicList: (
    list: { src: string; label: string; subheading: string }[]
  ) => void,
  setCurrentMusicIndex: (i: number) => void,
  setIsMusicPlayerActive: (b: boolean) => void,
  setIsGamePlayerActive: (b: boolean) => void,
  setCurrentGameSrc: (src: string | null) => void,
  isGamePlayerActive: boolean // 🆕 Add this
) {
  if (isGamePlayerActive) return;
  const currentCategoryId = menuItems[selected].id;
  let newSubIndex: number | null = null;
  let shouldPlaySound = false;

  switch (e.key) {
    case "ArrowRight":
      if (selected < menuItems.length - 1) {
        setSelected(selected + 1);
        shouldPlaySound = true;
      }
      break;
    case "ArrowLeft":
      if (selected > 0) {
        setSelected(selected - 1);
        shouldPlaySound = true;
      }
      break;
    case "ArrowDown":
      if (menuItems[selected].submenu) {
        const maxIndex = menuItems[selected].submenu!.length - 1;
        if (currentSubSelected < maxIndex) {
          newSubIndex = currentSubSelected + 1;
          shouldPlaySound = true;
        }
      }
      break;
    case "ArrowUp":
      if (menuItems[selected].submenu && currentSubSelected > 0) {
        newSubIndex = currentSubSelected - 1;
        shouldPlaySound = true;
      }
      break;
    case "Enter":
      if (menuItems[selected].submenu) {
        const currentItem = menuItems[selected].submenu![currentSubSelected];

        if (currentItem.photos && currentItem.photos.length > 0) {
          setIsPhotoListActive(true);
          setCurrentPhotoIndex(0);
        } else if (currentItem.videos && currentItem.videos.length > 0) {
          setCurrentVideoList(currentItem.videos);
          setCurrentVideoIndex(0);
          setIsVideoPlayerActive(true);
        } else if (currentItem.music && currentItem.music.length > 0) {
          const allTracks =
            menuItems
              .find((item) => item.id === "music")
              ?.submenu?.flatMap((sub) => sub.music || []) || [];
          const clickedTrack = currentItem.music?.[0];
          const startIndex = allTracks.findIndex(
            (track) => track.src === clickedTrack?.src
          );
          setCurrentMusicList(allTracks);
          setCurrentMusicIndex(startIndex >= 0 ? startIndex : 0);
          setIsMusicPlayerActive(true);
        }
        // 🕹️ New Game Logic
        else if (currentItem.game && currentItem.game.length > 0) {
          const gameSrc = currentItem.game[0].src;
          setCurrentGameSrc(gameSrc);
          setIsGamePlayerActive(true);
          console.log(`Launched game: ${currentItem.label}`);
        } else if (currentItem.url && currentItem.url.trim() !== "") {
          navigateTo(currentItem.url);
        } else {
          console.log(`Selected submenu item: ${currentItem.label}`);
        }
      } else {
        if (menuItems[selected].url && menuItems[selected].url.trim() !== "") {
          navigateTo(menuItems[selected].url);
        } else {
          console.log(`Selected main category: ${menuItems[selected].label}`);
        }
      }
      shouldPlaySound = true;
      break;
    case "Escape":
      newSubIndex = 0;
      shouldPlaySound = true;
      break;
    default:
      break;
  }

  if (newSubIndex !== null) {
    setSubSelectedMapping((prev: Record<string, number>) => ({
      ...prev,
      [currentCategoryId]: newSubIndex,
    }));
  }

  if (shouldPlaySound) {
    const audio = new Audio("/sounds/nav.mp3");
    audio.play();
  }
}
