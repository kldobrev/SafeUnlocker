import config from "../config";
import SimpleTexture from "../prefabs/SimpleTexture";
import { Door } from "../prefabs/Door";
import Scene from "../core/Scene";
import { centerObjects } from "../utils/misc";
import * as constfl from "../constants";
import { Ticker } from "pixi.js";
import gsap from "gsap";


export default class Game extends Scene {
  name = "Game";

  private background!: SimpleTexture;
  private door!: Door;
  private doorRatio!: {x: number, y: number};
  private blinkRatio!: {x: number, y: number};
  private blink!: SimpleTexture;
  private mainTicker!: Ticker;
  private closeDoorTimer!: number;
  public static gameWon: boolean;

  load() {
    this.background = new SimpleTexture(config.backgrounds.safe);
    this.blink = new SimpleTexture(config.foregrounds.blink);
    this.blink.scale.set(constfl.BLINK_SCALE);
    this.blink.tilingSprites[0].anchor.x = constfl.BLINK_ANCHOR.x;
    this.blink.tilingSprites[0].anchor.y = constfl.BLINK_ANCHOR.y;
    this.blinkRatio = {x: this.background.width / this.blink.width, 
      y: this.background.height / this.blink.height};
    this.blink.getSpriteObject().alpha = 0;
    centerObjects(this.blink);

    this.door = new Door();
    this.doorRatio = {x: this.background.width / this.door.width, 
      y: this.background.height / this.door.height};
    centerObjects(this.door);
    this.addChild(this.background, this.blink, this.door);
    this.mainTicker = new Ticker();
    this.closeDoorTimer = 0;
    Game.gameWon = false;
  }

  async start() {
    this.mainTicker.add((deltaTime) => {
      if(Game.gameWon) {
        if(this.closeDoorTimer > constfl.TIME_TO_RESTART_GAME) {  // Game won and wait time elapsed
          Game.gameWon = false;
          this.closeDoorTimer = 0;
          this.door.closeDoor();
          this.blink.getSpriteObject().alpha = 0;
        } else if(this.closeDoorTimer == 0) { // Just won the game
          this.door.openDoor();
          gsap.to(this.blink.getSpriteObject(), {alpha: 1, duration: 3});
          this.closeDoorTimer += deltaTime;
        } else {
          this.closeDoorTimer += deltaTime;
        }
      }
    });
    this.mainTicker.start();
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
