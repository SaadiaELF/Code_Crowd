const showCommentHandler = async (event) => {
    event.preventDefault();
    if (event.target.matches('#commentBtn') ) {
      var showComment = document.querySelectorAll('.new-comment-form');
      for (var i = 0; i < showComment.length; i++) {
        showComment[i].removeAttribute("hidden")
      }
    }
  };
  
  var commentBtns = document.querySelectorAll('#commentBtn')
  for (var i = 0; i < commentBtns.length; i++) {
    commentBtns[i].addEventListener('click', showCommentHandler)
  }
  
  
  const commentHandler = async (event) => {
    event.preventDefault();
    // Collect values from the new comment form
    const content = document.querySelector('.comment').value.trim();
    const post_id = document.querySelector('.submitBtn').getAttribute("value");
  
    if (content && post_id ) {
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
  };
  
  
  document
    .querySelector('.submitBtn')
    .addEventListener('click', commentHandler);
