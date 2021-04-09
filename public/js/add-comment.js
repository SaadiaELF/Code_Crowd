// Adding comments
const commentHandler = async (event) => {
    event.preventDefault();
    var comments = document.querySelectorAll('.comment')
    for (i of comments) {
        let x = i.value.trim();
        if (x) {
            const content = i.value.trim();
            const post_id = event.target.getAttribute("value");

            if (content && post_id) {
                // Send a POST request to the API endpoint
                const response = await fetch('/api/comment', {
                    method: 'POST',
                    body: JSON.stringify({ content, post_id }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    // If successful, refresh the page
                    document.location.reload();
                } else {
                    alert('Failed to create a comment');
                }
            }
        }
    }
    // }
};

var commentBtns = document.querySelectorAll('.submitBtn')
for (i of commentBtns) {
    i.addEventListener('click', commentHandler);
}
