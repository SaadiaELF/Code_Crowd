// Delete the post from the feeds page
const delButtonHandler = async (event) => {
  if (event.target.matches('#delete-btn') && event.target.hasAttribute('data-id')) {

    // Collect values from the delete button
    const id = event.target.getAttribute('data-id');
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // If successful, reload page
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

// Apply function to button
document
  .addEventListener('click', delButtonHandler);