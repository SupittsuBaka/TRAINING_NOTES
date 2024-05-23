import { Notes } from "./Notes/Notes.js";

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

  let jsonn = JSON.stringify(
    new Notes(name, age, gender, height, extraInfo, weight, menu)
  );

  let file = new Blob([jsonn], { type: "application/json" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download =
    document.getElementById("name").value.split(" ").join("_").trim() + ".json";
  a.click();
  form.reset();
});
