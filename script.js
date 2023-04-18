//--------Creating DOM Variables & Populating the operations--------
const gradientBox = document.querySelector(".gradient-box"); // Selecting the gradient box element from the DOM
const selectMenu = document.querySelector(".select-box select"); // Selecting the select menu element from the DOM

const colorInputs = document.querySelectorAll(".colors input"); // Selecting all the color input elements from the DOM
const textarea = document.querySelector("textarea"); // Selecting the textarea element from the DOM
const refreshBtn = document.querySelector(".refresh"); // Selecting the refresh button element from the DOM
const copyBtn = document.querySelector(".copy"); // Selecting the copy button element from the DOM

//-----------Generating a random color in hexadecimal format-------------
const getRandomColor = () => {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16); // Generating a random hexadecimal color value
  return `#${randomHex}`; // Returning the random color value in hexadecimal format
};

//------------function that generates a gradient using select menu values and color input values------------

const generateGradient = isRandom => {
  if (isRandom) {
    // If isRandom is true, generate two new random colors
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }

  const gradient = `linear-gradient(${selectMenu.value} , ${colorInputs[0].value}, ${colorInputs[1].value})`; // Generating a gradient using the select menu and color input values
  gradientBox.style.background = gradient; // Setting the gradient as the background of the gradient box element
  textarea.value = `background: ${gradient}`; // Setting the gradient as the value of the textarea element
};

//------------calling the generateGradient function when any of the color inputs change------------
colorInputs.forEach(input => {
  input.addEventListener("input", () => generateGradient(false)); // When the color input changes, call generateGradient with isRandom set to false
});

//------------function that copies the gradient code to the clipboard------------
const copyCode = () => {
  navigator.clipboard.writeText(textarea.value); // Writing the value of the textarea element to the clipboard
  copyBtn.textContent = "Code Copied!"; // Updating the copy button text to indicate that the code has been copied
  setTimeout(() => {
    copyBtn.textContent = "Copy code colors"; // Reverting the copy button text back to its original text after 2 seconds
  }, 2000);
};

selectMenu.addEventListener("change", generateGradient); // Calling generateGradient when the select menu changes

refreshBtn.addEventListener("click", () => generateGradient(true)); // Calling generateGradient with isRandom set to true when the refresh button is clicked

copyBtn.addEventListener("click", copyCode); // Calling copyCode when the copy button is clicked
