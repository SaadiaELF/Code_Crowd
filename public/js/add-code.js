const addCodeHandler = async (event) => {
    event.preventDefault();
    document.querySelector('#code').removeAttribute("hidden");
  };
    
  document
    .querySelector('#code_snippet')
    .addEventListener('click', addCodeHandler);