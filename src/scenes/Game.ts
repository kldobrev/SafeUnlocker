import config from "../config";
import SimpleBackground from "../prefabs/SimpleBackground";
import { Player } from "../prefabs/Player";
import { Door } from "../prefabs/Door";
import Scene from "../core/Scene";
import { centerObjects } from "../utils/misc";

export default class Game extends Scene {
  name = "Game";

  private player!: Player;
  private background!: SimpleBackground;
  private door!: Door;
  private doorRatio!: {x: number, y: number};

  load() {
    this.background = new SimpleBackground(config.backgrounds.safe);
    this.door = new Door();
    this.doorRatio = {x: this.background.width / this.door.width, 
      y: this.background.height / this.door.height};
    centerObjects(this.door);
    this.addChild(this.background, this.door);
  }

  onResize(width: number, height: number) {
    if (this.background) {
      this.background.resize(width, height);
      
      this.door.width = this.background.width / this.doorRatio.x;
      this.door.height = this.background.height / this.doorRatio.y;
      centerObjects(this.door);
    }
  }
}
