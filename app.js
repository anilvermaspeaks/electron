
const { ipcRenderer, electronIpcOn } = window.electronApi;
const btn = document.querySelector('#btn');
const filesInput = document.querySelector("input[type='file']")
btn.addEventListener('click', () => {
    const { path: videoPath } = filesInput.files[0];
    ipcRenderer.send('video:submit', videoPath)
})

electronIpcOn('video:receive', (event, data) => {
    console.log(data)
})