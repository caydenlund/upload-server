function sendDelete(event) {
  event.preventDefault();
  const target = event.currentTarget.dataset.target;

  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/files/" + target);
  xhr.send();

  xhr.addEventListener("error", function (err) {
    console.error(err);
  });

  xhr.addEventListener("load", function () {
    window.location.reload();
  });
}

function filterFiles(event) {
  const name = event.target.value;
  const files = document.getElementsByClassName("file");
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    let filename = file.dataset.filename.toLowerCase();
    if (filename.indexOf(name.toLowerCase()) === -1 && name !== "") {
      file.style.display = "none";
    } else {
      file.style.display = "";
    }
  }
}
