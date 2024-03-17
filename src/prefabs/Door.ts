import gsap from "gsap";
import { Container, DisplayObject } from "pixi.js";
import SimpleBackground from "../prefabs/SimpleBackground";
import Keyboard from "../core/Keyboard";
import config from "../config";
import * as constfl from "../constants";
import { Handle } from "./Handle";


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
  private openedShadowSprite: SimpleBackground;
  private handle: Handle;
  currentState: AnimState | null = null;

  private decelerationTween?: gsap.core.Tween;

  constructor() {
    super();
    this.scale.set(constfl.DOOR_SCALE);
    this.closedSprite = new SimpleBackground(config.foregrounds.door);
    this.closedSprite.tilingSprites[0].anchor.x = constfl.DOOR_ANCHOR_CLOSED.x;
    this.closedSprite.tilingSprites[0].anchor.y = constfl.DOOR_ANCHOR_CLOSED.y;

    this.openedSprite = new SimpleBackground(config.foregrounds.openedDoor);
    this.openedSprite.tilingSprites[0].anchor.x = constfl.DOOR_ANCHOR_OPENED.x;
    this.openedSprite.tilingSprites[0].anchor.y = constfl.DOOR_ANCHOR_OPENED.y;

    this.openedShadowSprite = new SimpleBackground(config.foregrounds.openedDoorShadow);
    this.openedShadowSprite.tilingSprites[0].anchor.x = constfl.DOOR_ANCHOR_OPENED_SHADOW.x;
    this.openedShadowSprite.tilingSprites[0].anchor.y = constfl.DOOR_ANCHOR_OPENED_SHADOW.y;

    this.handle = new Handle(this.closedSprite.width, this.closedSprite.height);

    this.addChild(this.closedSprite);
    this.addChild(this.handle);
    this.addChild(this.openedShadowSprite);
    this.addChild(this.openedSprite);
    this.openedShadowSprite.visible = false;
    this.openedSprite.visible = false;
    this.closedSprite.visible = true;
  }
  

}
