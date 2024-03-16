import { Container, Sprite, Ticker, Texture } from "pixi.js";
import { centerObjects } from "../utils/misc";

export type BgConfig = {
  image: string;
};

export default class ParallaxBackground extends Container {
  name = "Background";

  layers: string[] = [];
  tilingSprites: Sprite[] = [];

  constructor(
    protected config: BgConfig = {
      image: ""
    }
  ) {
    super();

    this.init();

    centerObjects(this);
  }

  init() {
    const texture = Texture.from(this.config.image)
    const scaleFactor = window.innerHeight / texture.height;

      const sprite = new Sprite(
        texture,
      );

      sprite.scale.set(scaleFactor);

      sprite.name = this.config.image;
      sprite.anchor.set(0.5);

      this.tilingSprites.push(sprite);

      this.addChild(sprite);
  }

  resize(width: number, height: number) {
    for (const layer of this.tilingSprites) {
      const scaleFactor = height / layer.texture.height;

      layer.width = width / scaleFactor;
      layer.scale.set(scaleFactor);
    }

    centerObjects(this);
  }
}
