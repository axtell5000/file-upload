const filePickerElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("image-preview");

function showPreview() {
  const files = filePickerElement.files; // files - array that has details of file you picked
  console.log(files);
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0]; // making sure its the first one

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
}

filePickerElement.addEventListener("change", showPreview);
