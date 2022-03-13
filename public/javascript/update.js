async function updateFormHandler(event) {
    event.preventDefault();


    const title = document.querySelector('input[name="text-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/text/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
            id
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

document.querySelector('.update-text-form').addEventListener('submit', updateFormHandler);