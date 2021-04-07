const searchHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the new post form
    const search = document.querySelector('#searchBtn').value.trim();
    console.log(search)
  
    if (search) {
      const response = await fetch(`/search/${search}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace(`/search/${search}`);
      } else {
        alert('Failed to create a post');
      }
    }
  };
  
  
  document
    .querySelector('.search-form')
    .addEventListener('submit', searchHandler);
  