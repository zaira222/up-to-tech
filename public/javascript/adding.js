async function addingFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="text-title"]').value;
    const content = document.querySelector('input[name="content-body"]').value;

    const response = await fetch('/api/text', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-content').addEventListener('submit', addingFormHandler);