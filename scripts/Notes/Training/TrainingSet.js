export class TrainingSet {
  weigth;
  reps;

  constructor(...arr) {
    if (arr.length == 1) {
      this.weigth = arr[0].weigth;
      this.reps = arr[0].reps;
    } else {
      this.weigth = arr[0];
      this.reps = arr[1];
    }
  }
}
