import gsap from "gsap";
import { Container, DisplayObject } from "pixi.js";
import SimpleBackground from "../prefabs/SimpleBackground";
import Keyboard from "../core/Keyboard";
import config from "../config";

enum Directions {
  LEFT = -1,
  RIGHT = 1,
}

type AnimState = {
  anim: string;
  soundName?: string;
  loop?: boolean;
  speed?: number;
};

export class Door extends Container {
  private keyboard = Keyboard.getInstance();
  private closedSprite: SimpleBackground;
  private openedSprite: SimpleBackground;
  currentState: AnimState | null = null;

  private decelerationTween?: gsap.core.Tween;

  constructor() {
    super();

    this.scale.set(0.62);
    this.closedSprite = new SimpleBackground(config.foregrounds.door);
    this.closedSprite.tilingSprites[0].anchor.x = 1.41;
    this.closedSprite.tilingSprites[0].anchor.y = 1.02;

    this.openedSprite = new SimpleBackground(config.foregrounds.openedDoor);
    this.openedSprite.tilingSprites[0].anchor.x = 0.82;
    this.openedSprite.tilingSprites[0].anchor.y = 1.018;

    this.addChild(this.closedSprite);
    this.addChild(this.openedSprite);
    this.openedSprite.visible = false;
  }

}
