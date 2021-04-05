const likeBtnHandler = async (event) => {
  if (event.target.matches('#likeBtn') && event.target.hasAttribute('data-id')) {
  // Collect values from the edit post form
  let like = parseInt(document.querySelector('#likeBtn').innerText);
  like = like + 1;
  console.log(like)
  const id = document.querySelector('#likeBtn').getAttribute("data-id");
  console.log(like, id)

  if (like && id) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/profile');
    } else {
      alert('Failed to update post');
    }
  }
  }
};


document
  // .querySelector('#likeBtn')
  .addEventListener('click', likeBtnHandler);
