const dislikeBtnHandler = async (event) => {

    let dislike = parseInt(event.target.innerText);
    dislike = dislike + 1
    const id = event.target.getAttribute("data-id");

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
};

var dislikeBtns = document.querySelectorAll('#dislikeBtn');
for (var i = 0 ; i < dislikeBtns.length ; i++){
  dislikeBtns[i].addEventListener('click', dislikeBtnHandler)
}
