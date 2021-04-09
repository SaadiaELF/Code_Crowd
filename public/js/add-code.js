// Add code inside the label on the click of the Code-Snippet button
const addCodeHandler = async (event) => {
  event.preventDefault();
  document.querySelector('#code').removeAttribute("hidden");
};

// Call button from post-form.handlebars to apply function to
document
  .querySelector('#code_snippet')
  .addEventListener('click', addCodeHandler);