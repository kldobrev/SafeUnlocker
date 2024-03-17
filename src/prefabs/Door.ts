import { Container, DisplayObject } from "pixi.js";
import SimpleTexture from "./SimpleTexture";
import config from "../config";
import * as constfl from "../constants";
import { Handle } from "./Handle";


export class Door extends Container {
  private closedSprite: SimpleTexture;
  private openedSprite: SimpleTexture;
  private openedShadowSprite: SimpleTexture;
  private handle: Handle;


  constructor() {
    super();
    this.scale.set(constfl.DOOR_SCALE);
    this.closedSprite = new SimpleTexture(config.foregrounds.door);
    this.closedSprite.getSpriteObject().anchor.x = constfl.DOOR_ANCHOR_CLOSED.x;
    this.closedSprite.getSpriteObject().anchor.y = constfl.DOOR_ANCHOR_CLOSED.y;

    this.openedSprite = new SimpleTexture(config.foregrounds.openedDoor);
    this.openedSprite.getSpriteObject().anchor.x = constfl.DOOR_ANCHOR_OPENED.x;
    this.openedSprite.getSpriteObject().anchor.y = constfl.DOOR_ANCHOR_OPENED.y;

    this.openedShadowSprite = new SimpleTexture(config.foregrounds.openedDoorShadow);
    this.openedShadowSprite.getSpriteObject().anchor.x = constfl.DOOR_ANCHOR_OPENED_SHADOW.x;
    this.openedShadowSprite.getSpriteObject().anchor.y = constfl.DOOR_ANCHOR_OPENED_SHADOW.y;

    this.handle = new Handle(this.closedSprite.width, this.closedSprite.height);

    this.addChild(this.closedSprite);
    this.addChild(this.handle);
    this.addChild(this.openedShadowSprite);
    this.addChild(this.openedSprite);
    this.closeDoor();
  }

  public async openDoor() {
    this.closedSprite.visible = false;
    this.openedShadowSprite.visible = true;
    this.openedSprite.visible = true;
    this.handle.visible = false;
  }

  public async closeDoor() {
    this.openedShadowSprite.visible = false;
    this.openedSprite.visible = false;
    this.closedSprite.visible = true;
    this.handle.visible = true;
  }
  
}
