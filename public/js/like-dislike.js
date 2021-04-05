const likeBtnHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the edit post form
    const like = parseInt(document.querySelector('#likeBtn').value)+ 1;
    const id = document.querySelector('#likeBtn').getAttribute("data");
    console.log(like,id)
  
    if (like && id) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/post/profile/${id}`, {
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
  };
  
  
  document
    .querySelector('#likeBtn')
    .addEventListener('click', likeBtnHandler);
  