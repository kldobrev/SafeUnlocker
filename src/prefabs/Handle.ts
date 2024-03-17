import gsap from "gsap";
import { Container, DisplayObject, FederatedPointerEvent } from "pixi.js";
import SimpleBackground from "./SimpleBackground";
import config from "../config";
import * as constfl from "../constants";


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

export class Handle extends Container {
  private handleSprite: SimpleBackground;
  private handleShadowSprite: SimpleBackground;
  currentState: AnimState | null = null;

  constructor(width: number, height: number) {
    super();

    this.scale.set(constfl.HANDLE_SCALE);
    this.handleSprite = new SimpleBackground(config.foregrounds.handle);
    this.handleSprite.tilingSprites[0].anchor.x = constfl.HANDLE_ANCHOR.x;
    this.handleSprite.tilingSprites[0].anchor.y = constfl.HANDLE_ANCHOR.y;

    this.handleShadowSprite = new SimpleBackground(config.foregrounds.handleShadow);
    this.handleShadowSprite.tilingSprites[0].anchor.x = constfl.HANDLE_ANCHOR_SHADOW.x;
    this.handleShadowSprite.tilingSprites[0].anchor.y = constfl.HANDLE_ANCHOR_SHADOW.y;
    this.pivot.x = width / constfl.HANDLE_PIVOT.x;
    this.pivot.y = height /constfl.HANDLE_PIVOT.y;
    this.handleShadowSprite.x = width / constfl.HANDLE_SHADOW_OFFSET.x;
    this.handleShadowSprite.y = height / constfl.HANDLE_SHADOW_OFFSET.y;

    this.addChild(this.handleShadowSprite);
    this.addChild(this.handleSprite);
    this.on('pointerdown', (event) => this.turnHandle(event));
    this.eventMode = 'static';
  }

  async turnHandle(event: FederatedPointerEvent) {
    gsap.to(this.handleShadowSprite, {rotation: 1, duration: 0.3, transformOrigin: "center", ease: "none"});
    gsap.to(this.handleSprite, {rotation: 1, duration: 0.3, transformOrigin: "center", ease: "none"});
  }

}
