// Delete existing comment from a post, on the click of the deleting button
const delCommentBtnHandler = async (event) => {
  if (event.target.matches('#delete-comment') && event.target.hasAttribute('data-id')) {
  
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
};

// Apply function to button
document 
  .addEventListener('click', delCommentBtnHandler);