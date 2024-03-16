import config from "../config";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import { Player } from "../prefabs/Player";
import Scene from "../core/Scene";

export default class Game extends Scene {
  name = "Game";

  private player!: Player;
  private background!: ParallaxBackground;

  load() {
    this.background = new ParallaxBackground(config.backgrounds.safe);
    this.addChild(this.background);
  }

  onResize(width: number, height: number) {
    if (this.player) {
      this.player.x = width / 2;
      this.player.y = height - this.player.height / 3;
    }

    if (this.background) {
      this.background.resize(width, height);
    }
  }
}
