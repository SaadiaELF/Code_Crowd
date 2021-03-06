// Take login info and send it to login route
const loginClickHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.toLowerCase().trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('failed to login');
        }
    }
};

// Call button from the homepage.handlebars to apply function to
document
    .querySelector('#login')
    .addEventListener('click', loginClickHandler);

