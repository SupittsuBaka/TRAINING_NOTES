import { Person } from "./Person/Person.js";
import { Training } from "./Training/Training.js";

export class Notes {
  person;
  trainings = [];

  constructor(...arr) {
    if (arr.length == 1) {
      this.person = new Person(arr[0].person);
      arr[0].trainings.map((t) => {
        this.trainings.push(new Training(t));
      });
    } else {
      this.person = new Person(
        arr[0],
        arr[1],
        arr[2],
        arr[3],
        arr[4],
        arr[5],
        arr[6]
      );
    }
  }

  addTraining(type) {
    this.trainings.push(new Training(type));
  }
}
