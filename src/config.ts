import type { BgConfig } from "./prefabs/ParallaxBackground";

type Config = {
  backgrounds: Record<string, BgConfig>;
};

export default {
  backgrounds: {
    safe: {
      layers: [
        "bg"
      ],
      panSpeed: 0,
    },
  },

  foregrounds: {
    blink: {
      image:
        "bling"
    },
    door: {
      image:
        "door"
    },
    openedDoor: {
      image:
        "doorOpen"
    },
    openedDoorShadow: {
      image:
        "doorOpenShadow"
    },
    handle: {
      image:
        "handle"
    },
    handleShadow: {
      image:
        "handleShadow"
    },
  }
} as Config;
