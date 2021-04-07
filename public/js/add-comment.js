// Show the text area for the comment on the click of the Comment button under any post
const showCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.matches('#commentBtn')) {
    var showComment = document.querySelectorAll('.new-comment-form');
    for (var i = 0; i < showComment.length; i++) {
      showComment[i].removeAttribute("hidden")
    }
  }
};

// Apply 'showCommentHandler' function to ALL POSTS on the feeds page
var commentBtns = document.querySelectorAll('#commentBtn')
for (var i = 0; i < commentBtns.length; i++) {
  commentBtns[i].addEventListener('click', showCommentHandler)
}

// Adding comments
const commentHandler = async (event) => {
  event.preventDefault();
  // Collect values from the new comment form
  const content = document.querySelector('.comment').value.trim();
  const post_id = document.querySelector('.submitBtn').getAttribute("value");
  const user_id = "d0e3a5bf-55e8-434d-972d-8e8b990c08fb";

  if (content && post_id && user_id) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, post_id, user_id }),
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

// Call button from post-info.handlebars to apply function to
document
  .querySelector('.submitBtn')
  .addEventListener('click', commentHandler);
