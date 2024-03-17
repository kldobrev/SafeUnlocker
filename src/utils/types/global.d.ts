type ConstructorType<T extends abstract new (...args: never) => unknown> = new (
  ...params: ConstructorParameters<T>
) => InstanceType<T>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export interface Pair {
  displaceNum: number,
  direction: number
}

export class SafeCombination {
  private combos: Array<Pair>;

  constructor(numPairs: number) {
    this.combos = new Array<Pair>();
    this.setDefaultCombPairs(numPairs);
  }

  private setDefaultCombPairs(numPairs: number) {
    for(let i = 0; i != numPairs; i++) {
      this.combos.push({ displaceNum: 0, direction: 0 });
    }
  }

  public setPairAtIdx(idx: number, pair: Pair) {
    if(idx < this.combos.length) {
      this.combos[idx] = pair;
    }
  }

  public getPairAtIdx(idx: number) :Pair {
    if(idx < this.combos.length) {
      return combos[idx];
    }
    return {displaceNum: 0, direction: 0};
  }

  public logSafeCombination() {
    this.combos.forEach(el => {
      console.log(el.displaceNum + " displacements " + (el.direction == 1 ? "clockwise" : "counterclockwise"));
    });
  }

  public equalsPairAtIdx(idx: number, pair: Pair) :boolean {
    if(idx < this.combos.length && this.combos[idx].displaceNum == pair.displaceNum &&
      this.combos[idx].direction == pair.direction) {
          return true;
    }
    return false;
  }

  public randomizeCombinations() {
    this.combos.forEach(pair => {
      pair.displaceNum = this.getRandIntBetweenIncl(1, 9);
      pair.direction = this.getRandIntBetweenIncl(1, 2) == 1 ? -1 : 1;
    });
  }

  private getRandIntBetweenIncl(min: number, max: number) : number {
    return Math.floor((Math.random() * (max + 1 - min)) + min);
  }

}