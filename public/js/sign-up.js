//retrieving values from signup form and sending them to signup route
const signupClickHandler = async (event) => {
    event.preventDefault();


    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const date_of_birth = document.querySelector('#textinput').value.trim();
    const city = document.querySelector('#city').value.trim();
    const country = document.querySelector('#country').value.trim();
    const programming_languages = document.querySelector('#programming-languages').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const verifyPassword = document.querySelector('#verify-password').value.trim();

    

     if (verifyPassword.value === password.value) {
        if (first_name && last_name && date_of_birth && city && country && programming_languages && email && password ) {
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
    } else {
       alert('passwords do not match')    }
        
        
    

    }

    
    
};

// function onChange() {
//     const password = document.querySelector('#password');
//     const confirm = document.querySelector('#verify-password');
//     if (confirm.value === password.value) {
//       confirm.setCustomValidity('');
//     } else {
//       confirm.setCustomValidity('Passwords do not match');
//     }
//   }

document
  .querySelector('#sign-up-button')
  .addEventListener('click', signupClickHandler);

