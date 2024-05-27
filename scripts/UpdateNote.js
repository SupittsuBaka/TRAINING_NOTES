import { Notes } from "./Notes/Notes.js";
import { Training } from "./Notes/Training/Training.js";

let clientNote = null;
let date = new Date();

let createButton = document.getElementById("create-button");
createButton.addEventListener("click", () => {
  let form = document.getElementById("create-form");
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let height = document.getElementById("height").value;
  let extraInfo = document.getElementById("extra-info").value;
  let weight = document.getElementById("weight").value;
  let menu = [
    document.getElementById("kkal").value,
    document.getElementById("proteins").value,
    document.getElementById("fats").value,
    document.getElementById("carbs").value,
  ];

  if (
    !name ||
    !age ||
    !gender ||
    !height ||
    !extraInfo ||
    !weight ||
    !menu[0] ||
    !menu[1] ||
    !menu[2] ||
    !menu[3]
  ) {
    alert("Заповніть усі поля.");
    return;
  }

  clientNote = new Notes(name, age, gender, height, extraInfo, weight, menu);
  updateClientStatus("Cтворено");
  showNote();
  enableWritingFunctions();
  form.reset();
});

let uploadButton = document.getElementById("upload-button");
uploadButton.addEventListener("click", () => {
  let file = document.getElementById("file-upload").files[0];
  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = () => {
    console.log(reader.result);
    clientNote = new Notes(JSON.parse(reader.result));
    updateClientStatus("Отримано");
    showNote();
    enableWritingFunctions();
    console.log(clientNote);
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
  if (clientNote == null) {
    alert("Спочатку додайте файл");
    return;
  }
  if (confirm(`Додати вагу ${newWeight}кг?`)) {
    clientNote.person.addWeight(newWeight);
    let lastWeight =
      clientNote.person.weights[clientNote.person.weights.length - 1];
    alert(`Додано вагу ${lastWeight.weight}кг ${lastWeight.date}.`);
  } else {
    alert("Нову вагу не додано.");
    return;
  }

  console.log(JSON.stringify(clientNote));
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
  if (clientNote == null) {
    alert("Спочатку додайте файл");
    return;
  }
  if (
    confirm(
      `Змінити БЖВ на:\nКкал: ${newKkal}\nБілки: ${newProteins}\nЖири: ${newFats}\nВуглеводи: ${newCarbs}?`
    )
  ) {
    clientNote.person.changeMenu(newKkal, newProteins, newCarbs, newFats);
    alert(`БЖВ змінено.`);
  } else {
    alert("БЖВ залишено без змін.");
    return;
  }

  console.log(JSON.stringify(clientNote));
});

let newTrainingButton = document.getElementById("training-button");
newTrainingButton.addEventListener("click", () => {
  if (clientNote == null) {
    alert("Спочатку додайте файл");
    return;
  }

  let lastTraining = clientNote.trainings[clientNote.trainings.length - 1];

  if (!(lastTraining instanceof Training)) {
    clientNote.addTraining();
    lastTraining = clientNote.trainings[clientNote.trainings.length - 1];
  } else if (lastTraining.date == date.toDateString()) {
    if (!confirm("Cьогоднішнє тренування вже додано.\nПереписати його? ")) {
      return;
    } else {
      clientNote.trainings.pop();
      clientNote.addTraining();
    }
  }

  addExerciseOptions();
  document
    .getElementById("add-exercise-button")
    .classList.remove("disabled-button");
  document.getElementById("new-set-button").classList.add("disabled-button");
  document.getElementById("add-sets-button").classList.add("disabled-button");

  document.getElementById("exercises-count").innerText = 0;
  document.getElementById("sets-count").innerText = 0;

  alert(`Тренування додано ${lastTraining.date}.\nПриступайте до заповнення`);
});

let exerciseButton = document.getElementById("add-exercise-button");
exerciseButton.addEventListener("click", () => {
  let optionExerciseName = document.getElementById("exercise-select").value;
  let inputExerciseName = document.getElementById("new-exercise-name").value;

  if (!optionExerciseName && !inputExerciseName) {
    alert("Спочатку оберіть назву вправи");
    return;
  }
  if (optionExerciseName && inputExerciseName) {
    alert("Оберіть один тип вводу назву");
    return;
  }

  let lastTraining = clientNote.trainings[clientNote.trainings.length - 1];
  if (optionExerciseName) {
    lastTraining.addExercise(optionExerciseName);
  } else {
    lastTraining.addExercise(inputExerciseName);
  }
  console.log(clientNote);
  let exercisesCount = document.getElementById("exercises-count");
  exercisesCount.innerText = (++exercisesCount.innerText).toString();
  document.getElementById("new-set-button").classList.remove("disabled-button");
  document
    .getElementById("add-sets-button")
    .classList.remove("disabled-button");
  exerciseButton.classList.add("disabled-button");
  document.getElementById("add-exercise-form").reset();
});

let newSetButton = document.getElementById("new-set-button");
newSetButton.addEventListener("click", () => {
  let lastTraining = clientNote.trainings[clientNote.trainings.length - 1];
  let lastExercise = lastTraining.exercises[lastTraining.exercises.length - 1];
  let setReps = document.getElementById("new-set-reps").value;
  let setWeight = document.getElementById("new-set-weight").value;
  let sameSetsNumber = document.getElementById("same-sets-number");

  if (!setReps || !setWeight) {
    alert("Заповніть поля.");
    return;
  }
  if (+sameSetsNumber.value < 1 || !sameSetsNumber.value) {
    alert("Оберіть валідне значення кількості однакових підходів.");
    return;
  }

  for (let i = 0; i < sameSetsNumber.value; i++) {
    lastExercise.addSet(setWeight, setReps);
  }

  alert(
    `Додано підходи:\nКількість:${sameSetsNumber.value}\nВага:${setWeight}\nПовтори:${setReps}`
  );
  document.getElementById("add-sets-form").reset();
  let setsCount = document.getElementById("sets-count");
  setsCount.innerText = (
    +setsCount.innerText + sameSetsNumber.value
  ).toString();
  console.log(JSON.stringify(clientNote));
});

let addSetsButton = document.getElementById("add-sets-button");
addSetsButton.addEventListener("click", () => {
  let setsCount = document.getElementById("sets-count");
  if (+setsCount.innerText == 0) {
    alert("Додайте підходи");
    return;
  }
  setsCount.innerText = "0";
  addSetsButton.classList.add("disabled-button");
  newSetButton.classList.add("disabled-button");
  exerciseButton.classList.remove("disabled-button");
});

let updateShowNoteButton = document.getElementById("update-show-note-button");
updateShowNoteButton.addEventListener("click", () => {
  showNote();
});

let downloadNoteButton = document.getElementById("download-note-button");
downloadNoteButton.addEventListener("click", () => {
  if (clientNote == null) {
    alert("НЕМА НОТАТОК, ЩОБ СКАЧАТИ");
    return;
  }
  let lastTraining = clientNote.trainings[clientNote.trainings.length - 1];
  if (lastTraining.exercises.length == 0) {
    if (confirm("Останнє тренування не заповнено.\nСкачати без нього?")) {
      clientNote.trainings.pop();
    } else {
      alert("Продовжуйте обробку.");
      return;
    }
  }
  let jsonn = JSON.stringify(clientNote);

  let file = new Blob([jsonn], { type: "application/json" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download =
    clientNote.person.name.split(" ").join("_").trim() +
    "_" +
    date.getDate().toString() +
    "_" +
    date.getMonth().toString() +
    "_" +
    date.getFullYear().toString() +
    ".json";
  a.click();
});

function updateClientStatus(type) {
  document.getElementById("client-status").innerText =
    "КЛІЄНТ ДЛЯ ОБРОБКИ: " + clientNote.person.name.toUpperCase();
  alert(`${type} нотатки для ${clientNote.person.name}.`);
}

function showNote() {
  if (clientNote == null) {
    return;
  }
  let noteWrapper = document.getElementById("note-wrapper");

  let noteAsHTML = "";
  noteAsHTML += `<p>ІМ'Я: ${clientNote.person.name.toUpperCase()}</p>`;
  noteAsHTML += `<p>СТАТЬ: ${clientNote.person.gender.toUpperCase()}</p>`;
  noteAsHTML += `<p>ВІК: ${clientNote.person.age}</p>`;
  noteAsHTML += `<p>ЗРІСТ: ${clientNote.person.height}СМ</p>`;
  noteAsHTML += `<p>ПОТОЧНА ВАГА: ${
    clientNote.person.weights[clientNote.person.weights.length - 1].weight
  }КГ</p>`;
  noteAsHTML += `<p>ДОДАТКОВА ІНФОРМАЦІЯ: ${clientNote.person.extraInfo}</p>`;
  noteAsHTML += `<p>ККAЛ: ${clientNote.person.personalMenu.kkal}</p>`;
  noteAsHTML += `<p>БЖВ: ${clientNote.person.personalMenu.proteins}|${clientNote.person.personalMenu.fats}|${clientNote.person.personalMenu.carbs}</p>`;
  for (let i = clientNote.trainings.length - 1; i >= 0; i--) {
    noteAsHTML += `<p class="training-paragraph">ТРЕНУВАННЯ №${i + 1}</p>`;
    noteAsHTML += `<div class="show-training">`;
    noteAsHTML += `<p>ДАТА ТРЕНУВАННЯ: ${clientNote.trainings[i].date}</p>`;
    for (let j = 0; j < clientNote.trainings[i].exercises.length; j++) {
      noteAsHTML += `<div class="show-exercise">`;
      noteAsHTML += `<p>${j + 1} ВПРАВА: ${
        clientNote.trainings[i].exercises[j].name
      }</p>`;
      for (
        let k = 0;
        k < clientNote.trainings[i].exercises[j].sets.length;
        k++
      ) {
        noteAsHTML += `<div class="show-set">`;
        let setToShow = clientNote.trainings[i].exercises[j].sets[k];
        noteAsHTML += `<p>${k + 1} ПІДХІД</p>`;
        noteAsHTML += `<p>ВАГА: ${setToShow.weight}</p>`;
        noteAsHTML += `<p>ПОВТОРЕННЯ: ${setToShow.reps}</p>`;
        noteAsHTML += `</div>`;
      }
      noteAsHTML += `</div>`;
    }
    noteAsHTML += `</div>`;
  }

  noteWrapper.innerHTML = noteAsHTML;
}

function enableWritingFunctions() {
  if (clientNote == null) {
    return;
  }

  let disabledSections = document.getElementsByClassName("disabled-section");

  while (disabledSections.length > 0) {
    disabledSections[0].classList.remove("disabled-section");
  }
}

function addExerciseOptions() {
  let exerciseSelectHTML = `<option value="">ОБЕРІТЬ НАЗВУ ВПРАВИ</option>`;
  let exercisesNamesSet = new Set();

  for (let i = clientNote.trainings.length - 1; i >= 0; i--) {
    for (let j = 0; j < clientNote.trainings[i].exercises.length; j++) {
      exercisesNamesSet.add(clientNote.trainings[i].exercises[j].name);
    }
  }

  exercisesNamesSet = Array.from(exercisesNamesSet);
  for (let i = 0; i < exercisesNamesSet.length; i++) {
    exerciseSelectHTML += `<option value="${
      exercisesNamesSet[i]
    }">${exercisesNamesSet[i].toUpperCase()}</option>`;
  }

  document.getElementById("exercise-select").innerHTML = exerciseSelectHTML;
}
