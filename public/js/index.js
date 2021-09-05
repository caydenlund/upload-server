document.addEventListener("dragover", function (event) {
  event.preventDefault();
  document.body.classList.add("dragover");
});

document.addEventListener("drop", function (event) {
  event.preventDefault();
  document.body.classList.remove("dragover");
  var files = event.dataTransfer.files;

  console.log(files);
});
