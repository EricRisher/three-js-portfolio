export type MenuItem = {
  id: string;
  label: string;
  icon: string;
  url?: string;
  content?: string;
  subheading?: string;
  submenu?: MenuItem[];
  photos?: { src: string; label: string; subheading: string }[];
  videos?: { src: string; label: string; subheading: string }[];
  music?: { src: string; label: string; subheading: string }[];
  game?: { src: string; label: string; subheading: string }[];
  isDisc?: boolean;
};

const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "/icons/home.svg",
    submenu: [
      {
        id: "home1",
        label: "Info",
        url: "",
        icon: "/icons/info.svg",
        content: "",
        subheading: "Navigate using the arrow keys and select with Enter.",
      },
      {
        id: "home3",
        label: "Eric",
        url: "ericrisher.com",
        icon: "/icons/user.svg",
        content: "",
        subheading: "Learn more about me and my work.",
      },
      {
        id: "home4",
        label: "Create New User",
        url: "",
        icon: "/icons/create-user.svg",
        content: "",
      },
      {
        id: "home2",
        label: "Turn Off System",
        url: "",
        icon: "/icons/power.svg",
        content: "",
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "/icons/projects.svg",
    submenu: [
      {
        id: "proj1",
        label: "CaliGo",
        url: "www.caligo.site",
        icon: "/icons/caligo.svg",
        content: "",
        subheading:
          "CaliGo is a community-driven platform where users find and share hidden places and experiences off the beaten path.",
      },
      {
        id: "proj2",
        label: "Driveway Blasters",
        url: "www.drivewayblaster.com",
        icon: "/icons/drivewayblasters.png",
        content: "",
        subheading:
          "Designed for a fast, responsive experience across all devices, optimized for search engines using niche keywords to enhance visibility and attract targeted traffic.",
      },
    ],
  },
  {
    id: "Photo",
    label: "Photo",
    icon: "/icons/camera.svg",
    submenu: [
      {
        id: "cam1",
        label: "Belle",
        url: "",
        icon: "/icons/folder.svg",
        content: "",
        subheading: "8 Images",
        photos: [
          {
            src: "/photos/belle (1).jpg",
            label: "Belle 1",
            subheading: "A beautiful photo of Belle.",
          },
          {
            src: "/photos/belle (2).jpg",
            label: "Belle 2",
            subheading: "Another stunning shot of Belle.",
          },
        ],
      },
    ],
  },
  {
    id: "music",
    label: "Music",
    icon: "/icons/music.svg",
    submenu: [
      {
        id: "music1",
        label: "Little Big Planet 1 & 2",
        url: "",
        icon: "/icons/lbp-disc.png",
        content: "",
        subheading: "4 Tracks",
        music: [
          {
            src: "/music/Passion Pit - Sleepyhead.mp4",
            label: "Little Big Planet Theme",
            subheading: "Songs from Little Big Planet.",
          },
          {
            src: "/music/The Orb Of Dreamers.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
          {
            src: "/music/Ferry Corsten - Rock Your Body Rock.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
          {
            src: "/music/Trüby Trio - A Go Go.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },
      {
        id: "music2",
        label: "Lease - Takeshi Abo",
        url: "",
        icon: "/icons/lease-disc.png",
        content: "",
        subheading: "1 Track",
        music: [
          {
            src: "/music/LEASE by Takeshi Abo.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },
      {
        id: "music3",
        label: "Scizzie - Aquatic Ambience",
        url: "",
        icon: "/icons/scizzie-disc.png",
        content: "",
        subheading: "1 Track",
        music: [
          {
            src: "/music/scizzie - aquatic ambience.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },

      {
        id: "music4",
        label: "Trance - 009 Sound System Dreamscape",
        url: "",
        icon: "/icons/trance-disc.png",
        content: "",
        subheading: "1 Track",
        music: [
          {
            src: "/music/Trance - 009 Sound System Dreamscape.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },
      {
        id: "music5",
        label: "2004 Ur Mall - zan",
        url: "",
        icon: "/icons/2004-disc.png",
        content: "",
        subheading: "1 Track",
        music: [
          {
            src: "/music/2004 ur mall - zan.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },
      {
        id: "music6",
        label: "End of Small Sanctuary - Akira Yamaoka",
        url: "",
        icon: "/icons/sh3-disc.png",
        content: "",
        subheading: "1 Track",
        music: [
          {
            src: "/music/End of Small Sanctuary.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },
      {
        id: "music7",
        label: "BGM 08 - Tori no Hoshi Aerial Planet",
        url: "",
        icon: "/icons/tori-disc.png",
        content: "",
        subheading: "1 Track",
        music: [
          {
            src: "/music/Tori no Hoshi Aerial Planet.mp4",
            label: "Little Big Planet Theme",
            subheading: "The theme song from Little Big Planet.",
          },
        ],
        isDisc: true,
      },
    ],
  },
  {
    id: "videos",
    label: "Videos",
    icon: "/icons/video.svg",
    submenu: [
      {
        id: "little-big-planet",
        label: "Little Big Planet Tutorials",
        url: "",
        icon: "/icons/folder-lbp.png",
        content: "",
        subheading: "4 Videos",
        videos: [
          {
            src: "/videos/Little Big Planet 2 Introduction -  Orb of Dreamers .mp4",
            label: "LBP 2 Introduction",
            subheading: "Introduction to LBP 2.",
          },
          {
            src: "/videos/lbp-stuck.mp4",
            label: "LBP Stuck",
            subheading: "Tutorial on getting unstuck in LBP.",
          },
          {
            src: "/videos/lbp-controls.mp4",
            label: "LBP Controls",
            subheading: "Tutorial on controls in LBP.",
          },
          {
            src: "/videos/lbp-acting.mp4",
            label: "LBP Acting",
            subheading: "Tutorial on acting in LBP.",
          },
        ],
      },
      {
        id: "desert-1",
        label: "Desert Trip",
        url: "",
        icon: "/icons/folder-desert.png",
        content: "",
        subheading: "1 Video",
        videos: [
          {
            src: "/videos/4runner.mov",
            label: "4Runner",
            subheading: "A video of the 4Runner in the desert.",
          },
        ],
      },
    ],
  },
  {
    id: "games",
    label: "Games",
    icon: "/icons/games.svg",
    submenu: [
      {
        id: "game1",
        label: "Snake",
        url: "",
        icon: "/icons/snake-disc.png",
        content: "",
        subheading: "The classic Snake game. - JavaScript",
        isDisc: true,
        game: [
          {
            src: "/games/snake/index.html",
            label: "Snake Game",
            subheading: "Play the classic Snake game.",
          }
        ]
      }
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "/icons/contact.svg",
    submenu: [
      {
        id: "contact1",
        label: "Email",
        url: "mailto:risherdev@gmail.com",
        icon: "/icons/email.svg",
        content: "",
        subheading: "Get in touch via email.",
      },
      {
        id: "contact2",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/eric-risher/",
        icon: "/icons/linkedln.svg",
        content: "",
        subheading: "Connect with me on LinkedIn.",
      },

      {
        id: "contact3",
        label: "GitHub",
        url: "https://github.com/EricRisher",
        icon: "/icons/github.svg",
        content: "",
        subheading: "Check out my GitHub profile.",
      },
      {
        id: "contact4",
        label: "EricRisher.com",
        url: "https://ericrisher.com",
        icon: "/icons/logo.png",
        content: "",
        subheading: "Visit my personal website.",
      },
    ],
  },
];

export default menuItems;
