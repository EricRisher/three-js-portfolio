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
  const offsetConfig = {
    0: [0, 0, 0, 0, 0, 0, 0],
    1: [-240, -95, -95, -95, -95, -95, -95],
    2: [-335, -335, -190, -190, -190, -190, -190],
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