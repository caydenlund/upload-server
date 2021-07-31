function sendDelete(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/files/${target}`);
    xhr.send();
}