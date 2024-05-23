import { Notes } from "./Notes/Notes.js";
import { Training } from "./Notes/Training/Training.js";
import { Exercise } from "./Notes/Training/Exercise.js";
import { TrainingSet } from "./Notes/Training/TrainingSet.js";

let uploadedNote = null;

let uploadButton = document.getElementById("upload-button");
uploadButton.addEventListener("click", () => {
  let file = document.getElementById("file-upload").files[0];
  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = () => {
    console.log(reader.result);
    uploadedNote = new Notes(JSON.parse(reader.result));
    document.getElementById("upload-status").innerText +=
      " " + uploadedNote.person.name.toUpperCase();
    console.log(uploadedNote);
  };

  reader.onerror = () => {
    console.log(reader.error);
    alert("Виникла помилка зчитування файлу.");
  };

  document.getElementById("upload-form").reset();
});

let newWeightButton = document.getElementById("new-weight-button");
newWeightButton.addEventListener("click", () => {
  let newWeight = document.getElementById("new-weight").value;
  if (newWeight == "") {
    alert("Спочатку введіть вагу");
    return;
  }
  if (uploadedNote == null) {
    alert("Спочатку додайте файл");
    return;
  }
  if (confirm(`Додати вагу ${newWeight}кг?`)) {
    uploadedNote.person.addWeight(newWeight);
    let lastWeight =
      uploadedNote.person.weights[uploadedNote.person.weights.length - 1];
    alert(`Додано вагу ${lastWeight.weight}кг ${lastWeight.date}.`);
  } else {
    alert("Нову вагу не додано.");
    return;
  }

  console.log(JSON.stringify(uploadedNote));
});

let newMenuButton = document.getElementById("new-menu-button");
newMenuButton.addEventListener("click", () => {
  let newKkal = document.getElementById("new-kkal").value;
  let newProteins = document.getElementById("new-proteins").value;
  let newFats = document.getElementById("new-fats").value;
  let newCarbs = document.getElementById("new-carbs").value;

  if (newKkal == "" || newProteins == "" || newFats == "" || newCarbs == "") {
    alert("Спочатку заповніть форму");
    return;
  }
  if (uploadedNote == null) {
    alert("Спочатку додайте файл");
    return;
  }
  if (
    confirm(
      `Змінити БЖВ на:\nКкал: ${newKkal}\nБілки: ${newProteins}\nЖири: ${newFats}\nВуглеводи: ${newCarbs}?`
    )
  ) {
    uploadedNote.person.changeMenu(newKkal, newProteins, newCarbs, newFats);
    alert(`БЖВ змінено.`);
  } else {
    alert("БЖВ залишено без змін.");
    return;
  }

  console.log(JSON.stringify(uploadedNote));
});

let newTrainingButton = document.getElementById("training-button");
newTrainingButton.addEventListener("click", () => {
  let trainingType = document.getElementById("training-type").value;

  if (trainingType == "") {
    alert("Спочатку оберіть тип тренування");
    return;
  }
  if (uploadedNote == null) {
    alert("Спочатку додайте файл");
    return;
  }
  if (confirm(`Додати тренування з типом ${trainingType}?`)) {
    uploadedNote.addTraining(trainingType);
    let lastTraining =
      uploadedNote.trainings[uploadedNote.trainings.length - 1];
    alert(
      `Додане ${uploadedNote.trainings.length} тренування ${lastTraining.date}.`
    );
  } else {
    alert("Нове тренування не додано.");
  }
});
