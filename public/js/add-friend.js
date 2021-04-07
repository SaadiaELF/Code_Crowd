// Add friend to the list of friends in user profile, on the click of the Add Friend button
const addFriendHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const friend_id = event.target.getAttribute('data-id');

  if (friend_id) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/friend', {
      method: 'POST',
      body: JSON.stringify({ friend_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/friends');
    } else {
      alert('Already added as a friend !');
    }
  }

};

// Apply above function to ALL FRIEND ACCOUNTS in the search results, by looping through all of them (from the user.handlebars)
var friendBtns = document.querySelectorAll('#addFriend');

for (var i = 0; i < friendBtns.length; i++) {
  friendBtns[i].addEventListener('click', addFriendHandler);
}