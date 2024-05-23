let headers = document.getElementsByClassName("header-wrapper");

for (let i = 0; i < headers.length; i++) {
  headers[i].addEventListener("click", () => {
    headers[i].parentElement.classList.toggle("grow");
  });
}
