const signupClickHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email-address').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    console.log(email);
    console.log(password);

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('#sign-up-button')
  .addEventListener('click', signupClickHandler);

