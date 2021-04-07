//retrieving values from signup form and sending them to signup route
const signupClickHandler = async (event) => {
    event.preventDefault();


    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const date_of_birth = document.querySelector('#date-of-birth').value.trim();
    const city = document.querySelector('#city').value.trim();
    const country = document.querySelector('#country').value.trim();
    const programming_languages = document.querySelector('#programming-languages').value.trim();
    const email = document.querySelector('#email').value.toLowerCase().trim();
    const password = document.querySelector('#password').value.trim();
    const verifyPassword = document.querySelector('#verify-password').value.trim();
    
// ensure date is in the past
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

//send values to database
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



document
    .querySelector('#sign-up-button')
    .addEventListener('click', signupClickHandler);

