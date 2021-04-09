// Click handler for log out button
const logoutClickHandler = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out');
    }
};

// Call button from the navbar.handlebars to apply function to
document
    .querySelector('#logout')
    .addEventListener('click', logoutClickHandler);


