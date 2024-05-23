import { Weight } from "./Weight.js";
import { PersonalMenu } from "./PersonalMenu.js";

export class Person {
  name;
  age;
  gender;
  height;
  extraInfo;
  weights = [];
  personalMenu;

  constructor(...arr) {
    if (arr.length == 1) {
      this.name = arr[0].name;
      this.age = arr[0].age;
      this.gender = arr[0].gender;
      this.height = arr[0].height;
      this.extraInfo = arr[0].extraInfo;
      arr[0].weights.map((w) => this.weights.push(new Weight(w)));
      this.personalMenu = new PersonalMenu(arr[0].personalMenu);
    } else {
      this.name = arr[0];
      this.age = arr[1];
      this.gender = arr[2];
      this.height = arr[3];
      this.extraInfo = arr[4];
      this.weights.push(new Weight(arr[5]));
      this.personalMenu = new PersonalMenu(
        arr[6][0],
        arr[6][1],
        arr[6][2],
        arr[6][3]
      );
    }
  }

  addWeight(weight) {
    this.weights.push(new Weight(weight));
  }

  changeMenu(kkal, proteins, carbs, fats) {
    this.personalMenu = new PersonalMenu(kkal, proteins, fats, carbs);
  }
}
