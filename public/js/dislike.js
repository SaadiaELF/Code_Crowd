const dislikeBtnHandler = async (event) => {
  if (event.target.matches('#dislikeBtn') && event.target.hasAttribute('data-id')) {
    // Collect values from the edit post form
    let dislike = parseInt(document.querySelector('#dislikeBtn').innerText);
    if (dislike > 0) {
      dislike = dislike - 1
    } else { dislike = 0 }
    console.log(dislike)
    const id = document.querySelector('#dislikeBtn').getAttribute("data-id");
    console.log(dislike, id)

    if (dislike && id) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/post/dislike/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, dislike }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.reload();
      } else {
        alert('Failed to update post');
      }
    }
  }
};


document
  // .querySelector('#dislikeBtn')
  .addEventListener('click', dislikeBtnHandler);
