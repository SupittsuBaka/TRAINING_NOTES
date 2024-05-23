import { TrainingSet } from "./TrainingSet.js";

export class Exercise {
  name;
  sets = [];

  constructor(data) {
    if (typeof data != "string") {
      this.name = data.name;
      data.sets.map((s) => {
        this.sets.push(s);
      });
    } else {
      this.name = data;
    }
  }

  addSet(weight, reps) {
    this.sets.push(new TrainingSet(weight, reps));
  }
}
