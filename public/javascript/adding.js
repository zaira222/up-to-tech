async function addingFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="text-title"]').value;

    const response = await fetch('/api/text', {
        method: 'POST',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-content-form').addEventListener('submit', addingFormHandler);