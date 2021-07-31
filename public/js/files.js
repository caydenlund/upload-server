function sendDelete(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/files/${target}`);
    xhr.send();

    xhr.on("error", function(err) {
        // TODO: Handle error
        console.log(err);
    });

    xhr.on("load", function() {
        window.location.reload();
    });
}