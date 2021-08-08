
const btn = document.querySelector('#btn');
const filesInput = document.querySelector("input[type='file']")
btn.addEventListener('click', () => {
    console.log(filesInput.files[0])
})