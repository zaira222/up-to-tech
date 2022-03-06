async function blogsFormHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[name="content-body"]').value.trim();

    const text_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    if(content) {
        const response = await fetch('/api/content', {
            method: 'POST',
            body: JSON.stringify({
                text_id,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.blogs-form').addEventListener('submit', blogsFormHandler);