import config from "../config";
import SimpleBackground from "../prefabs/SimpleBackground";
import { Player } from "../prefabs/Player";
import { Door } from "../prefabs/Door";
import Scene from "../core/Scene";
import { centerObjects } from "../utils/misc";
import * as constfl from "../constants";

export default class Game extends Scene {
  name = "Game";

  private player!: Player;
  private background!: SimpleBackground;
  private door!: Door;
  private doorRatio!: {x: number, y: number};
  private blinkRatio!: {x: number, y: number};
  private blink!: SimpleBackground;

  load() {
    this.background = new SimpleBackground(config.backgrounds.safe);
    this.blink = new SimpleBackground(config.foregrounds.blink);
    this.blink.scale.set(constfl.BLINK_SCALE);
    this.blink.tilingSprites[0].anchor.x = constfl.BLINK_ANCHOR.x;
    this.blink.tilingSprites[0].anchor.y = constfl.BLINK_ANCHOR.y;
    this.blinkRatio = {x: this.background.width / this.blink.width, 
      y: this.background.height / this.blink.height};
    centerObjects(this.blink);

    this.door = new Door();
    this.doorRatio = {x: this.background.width / this.door.width, 
      y: this.background.height / this.door.height};
    centerObjects(this.door);
    this.addChild(this.background, this.blink, this.door);
  }


  onResize(width: number, height: number) {
    if (this.background) {
      this.background.resize(width, height);
      
      if(this.door) {
        this.door.width = this.background.width / this.doorRatio.x;
        this.door.height = this.background.height / this.doorRatio.y;
        centerObjects(this.door);
      }

      if(this.blink) {
        this.blink.width = this.background.width / this.blinkRatio.x;
        this.blink.height = this.background.height / this.blinkRatio.y;
        centerObjects(this.blink);
      }
    }
  }
}
