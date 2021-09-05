function upload(files) {
  var formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload");
  xhr.send(formData);
}

document.addEventListener("dragover", function (event) {
  event.preventDefault();
  document.body.classList.add("dragover");
});

document.addEventListener("drop", function (event) {
  event.preventDefault();
  document.body.classList.remove("dragover");
  upload(event.dataTransfer.files);
});
