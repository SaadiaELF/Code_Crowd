// Show the text area for the comment on the click of the Comment button under any post
const showCommentHandler = async () => {

  var showComment = document.querySelectorAll('.new-comment-form');
  for (i of showComment) {
    i.removeAttribute("hidden");
  }
};

// Apply 'showCommentHandler' function to ALL POSTS on the feeds page
var commentBtns = document.querySelectorAll('.commentBtn')
for (i of commentBtns) {
  i.addEventListener('click', showCommentHandler);
}

