function sendDelete(event) {
  event.preventDefault();
  const target = event.currentTarget.dataset.target;

  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `/files/${target}`);
  xhr.send();

  xhr.addEventListener("error", function (err) {
    // TODO: Handle error
    console.log(err);
  });

  xhr.addEventListener("load", function () {
    window.location.reload();
  });
}

function filterFiles(event) {
  const name = event.target.value;
  const files = document.getElementsByClassName("file");
  for (let file of files) {
    let filename = file.dataset.filename.toLowerCase();
    if (filename.indexOf(name.toLowerCase()) === -1 && name !== "") {
      file.style.display = "none";
    } else {
      file.style.display = "";
    }
  }
}
