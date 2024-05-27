import { Exercise } from "./Exercise.js";

export class Training {
  date;
  exercises = [];

  constructor(data = null) {
    if (data != null) {
      this.date = data.date;
      data.exercises.map((e) => {
        this.exercises.push(new Exercise(e));
      });
    } else {
      this.date = new Date().toDateString();
    }
  }

  addExercise(name) {
    this.exercises.push(new Exercise(name));
  }
}
