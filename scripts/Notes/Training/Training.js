import { Exercise } from "./Exercise.js";

export class Training {
  date;
  type;
  exercises = [];

  constructor(data) {
    if (typeof data != "string") {
      this.date = data.date;
      this.type = data.type;
      data.exercises.map((e) => {
        this.exercises.push(new Exercise(e));
      });
    } else {
      this.date = new Date().toDateString();
      this.type = data;
    }
  }

  addExercise(name) {
    this.exercises.push(new Exercise(name));
  }
}
