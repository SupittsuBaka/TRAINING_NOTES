export class PersonalMenu {
  kkal;
  proteins;
  fats;
  carbs;

  constructor(...arr) {
    if (arr.length == 1) {
      this.kkal = arr[0].kkal;
      this.proteins = arr[0].proteins;
      this.fats = arr[0].fats;
      this.carbs = arr[0].carbs;
    } else {
      this.kkal = arr[0];
      this.proteins = arr[1];
      this.fats = arr[2];
      this.carbs = arr[3];
    }
  }
}
