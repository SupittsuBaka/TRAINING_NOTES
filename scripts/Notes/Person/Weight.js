export class Weight {
  date;
  weight;

  constructor(data) {
    if (typeof data == "string") {
      this.date = new Date().toDateString();
      this.weight = data;
    } else {
      this.date = data.date;
      this.weight = data.weight;
    }
  }
}
