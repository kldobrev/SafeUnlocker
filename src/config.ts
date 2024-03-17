import type { BgConfig } from "./prefabs/SimpleTexture";

type Config = {
  backgrounds: Record<string, BgConfig>,
  foregrounds: Record<string, BgConfig>
};

export default {
  backgrounds: {
    safe: {
      image:
        "bg"
    },
  },

  foregrounds: {
    blink: {
      image:
        "blink"
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
