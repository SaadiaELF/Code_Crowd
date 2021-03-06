// Retrieve values from signup form and send them to signup route
const signupClickHandler = async (event) => {
    event.preventDefault();

    const firstName= document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim(); 

    const first_name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const last_name = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const date_of_birth = document.querySelector('#date-of-birth').value.trim();
    const city = document.querySelector('#city').value.trim();
    const country = document.querySelector('#country').value.trim();
    const programming_languages = document.querySelector('#programming-languages').value.trim();
    const email = document.querySelector('#email').value.toLowerCase().trim();
    const password = document.querySelector('#password').value.trim();
    const verifyPassword = document.querySelector('#verify-password').value.trim();
    

    const now = new Date();
    let date1 = Date.parse(date_of_birth);
    let date2 = Date.parse(now);
    if (date1 > date2) {
        alert ("date must be in the past")
    }
    

// check  both password input fields match
    else if (verifyPassword != password) {

        alert('passwords do not match')
    }
    else {

// Send values to database
        if (first_name && last_name && date_of_birth && city && country && programming_languages && email && password) {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                body: JSON.stringify({ first_name, last_name, date_of_birth, city, country, programming_languages, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });


            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert(response.statusText);
            }

        }

    }
};


// Call button from the homepage.handlebars to apply function to
document
    .querySelector('#sign-up-button')
    .addEventListener('click', signupClickHandler);
