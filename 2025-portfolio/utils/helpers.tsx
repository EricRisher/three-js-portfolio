export function navigateTo(url: string): void {
  if (typeof window !== "undefined") {
    try {
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error while navigating to URL: ", error);
    }
  }
}

export const getYOffset = (childIndex: number, selectedStep: number) => {
  // The offsets are based on the index of the child element
  // object (MenuItem) and the selected main category index
  const offsetConfig = {
    0: [0, 0, 0, 0, 0, 0, 0], // No offset for first category (index 0), home
    1: [-160, -60, -60, -60, -60, -60, -60],
    2: [-220, -220, -120, -120, -190, -190, -190],
    3: [-430, -430, -430, -285, -285, -285, -285],
    4: [-525, -525, -525, -525, -380, -380, -380],
    5: [-620, -620, -620, -620, -620, -475, -475],
    6: [-715, -715, -715, -715, -715, -715, -570],
    7: [-810, -810, -810, -810, -810, -810, -810],
  };
  const offsets = offsetConfig[selectedStep as keyof typeof offsetConfig];
  if (offsets && offsets[childIndex] !== undefined) {
    return offsets[childIndex];
  }
};