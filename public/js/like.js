const likeBtnHandler = async (event) => {

  let like = parseInt(event.target.innerText);
  like = like + 1;
  const id = event.target.getAttribute("data-id");

  if (like && id) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/post/like/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
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


var likeBtns = document.querySelectorAll('#likeBtn');
  
for (var i = 0 ; i < likeBtns.length ; i++){
  likeBtns[i].addEventListener('click', likeBtnHandler);
}