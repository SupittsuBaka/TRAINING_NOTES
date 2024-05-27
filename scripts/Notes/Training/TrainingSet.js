export class TrainingSet {
  weight;
  reps;

  constructor(...arr) {
    if (arr.length == 1) {
      this.weight = arr[0].weigth;
      this.reps = arr[0].reps;
    } else {
      this.weight = arr[0];
      this.reps = arr[1];
    }
  }
}
