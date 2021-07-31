function sendDelete(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/files/${target}`);
    xhr.send();

    xhr.addEventListener("error", function(err) {
        // TODO: Handle error
        console.log(err);
    });

    xhr.addEventListener("load", function() {
        window.location.reload();
    });
}