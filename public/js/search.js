// Search for people by clicking on the Search button
const searchHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const search = document.querySelector('#searchBtn').value.trim();

  if (search) {
    const response = await fetch(`/search/${search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the search page
      document.location.replace(`/search/${search}`);
    } else {
      alert('Error');
    }
  }
};

// Call button from the navbar.handlebars to apply function to
document
  .querySelector('.search-form')
  .addEventListener('submit', searchHandler);
