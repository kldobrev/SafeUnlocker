import gsap from "gsap";
import { Container, FederatedPointerEvent, Ticker } from "pixi.js";
import SimpleTexture from "./SimpleTexture";
import config from "../config";
import * as constfl from "../constants";
import { Pair, SafeCombination } from "../utils/types/global.d";
import Game from "../scenes/Game"


export class Handle extends Container {
  private handleSprite: SimpleTexture;
  private handleShadowSprite: SimpleTexture;
  public safeCombination!: SafeCombination;
  private enteredPair!: Pair;
  private numPairsEntered;
  private enterPairTimer: number;
  private enterPairTicker: Ticker;

  constructor(width: number, height: number) {
    super();
    this.scale.set(constfl.HANDLE_SCALE);
    this.handleSprite = new SimpleTexture(config.foregrounds.handle);
    this.handleSprite.tilingSprites[0].anchor.x = constfl.HANDLE_ANCHOR.x;
    this.handleSprite.tilingSprites[0].anchor.y = constfl.HANDLE_ANCHOR.y;

    this.handleShadowSprite = new SimpleTexture(config.foregrounds.handleShadow);
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
    this.enterPairTimer = 0;
    this.numPairsEntered = 0;
    this.safeCombination = new SafeCombination(constfl.NUMBER_OF_PAIRS);
    this.safeCombination.randomizeCombinations();
    this.safeCombination.logSafeCombination();
    this.resetEnteredPair();
    this.enterPairTicker = new Ticker();
    this.enterPairTicker.add((deltaTime) => {
      this.enterPairTimer += deltaTime;
      if(this.enterPairTimer > constfl.TIME_TO_ENTER_PAIR) {
        this.compareEnteredPair();
      }
    });
  }

  async turnHandle(event: FederatedPointerEvent) {

    let currentDirection = (this.handleSprite.x < event.global.x) ? 1 : -1;
    if(this.enteredPair.direction == 0 || this.enteredPair.direction == currentDirection) {
      this.enteredPair.direction = currentDirection;
      this.enteredPair.displaceNum = this.enteredPair.displaceNum == 9 ? 1 : this.enteredPair.displaceNum + 1;
      this.enterPairTimer = 0;  // Reset timer after each handle turn
      this.enterPairTicker.start();
      // Rotation is 1 because I figured out for some reason the function is executing on every frame, so 60 fps = 60 degrees
      // Could not figure out why the animations play only once
      this.turnHandleAnim(1, currentDirection);
    } else {  // Reset game when turning handle in the opposite direction
      this.resetComparisonProps();
    }
  }

  private compareEnteredPair() {
    this.enterPairTimer = 0;
    this.enterPairTicker.stop();
    console.log(this.enteredPair);
    if(this.safeCombination.equalsPairAtIdx(this.numPairsEntered, this.enteredPair)) {
      this.numPairsEntered++;
      this.resetEnteredPair();
      if(this.numPairsEntered == 3) {
        Game.gameWon = true;
        this.resetComparisonProps();
      }
    } else {
      this.resetComparisonProps();
    }
  }

  private resetEnteredPair() {
    this.enteredPair = { displaceNum: 0, direction: 0 };
  }

  private resetComparisonProps() {
    console.log("Resetting game...");
    this.enterPairTimer = 0;
    this.enterPairTicker.stop();
    this.numPairsEntered = 0;
    this.resetEnteredPair();
    this.safeCombination.randomizeCombinations();
    this.safeCombination.logSafeCombination();
  }

  private turnHandleAnim(degrees: number, direction: number) {
    gsap.to(this.handleShadowSprite, {rotation: degrees * direction, duration: 0.3, transformOrigin: "center", ease: "none"});
    gsap.to(this.handleSprite, {rotation: degrees * direction, duration: 0.3, transformOrigin: "center", ease: "none"});
  }

}
