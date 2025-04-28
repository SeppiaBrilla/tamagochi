
// script.js

let hunger = 5;
let happiness = 5;

// Function to get a cookie by name
function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

// Load pet state from cookies if available
function loadState() {
  const savedHunger = getCookie("hunger");
  const savedHappiness = getCookie("happiness");

  if (savedHunger !== null) {
    hunger = parseInt(savedHunger);
  }
  if (savedHappiness !== null) {
    happiness = parseInt(savedHappiness);
  }

  updateStats();
}

// Save pet state to cookies
function saveState() {
  setCookie("hunger", hunger, 7);  // Save for 7 days
  setCookie("happiness", happiness, 7);  // Save for 7 days
}

function updateStats() {
  document.getElementById('hunger').textContent = hunger;
  document.getElementById('happiness').textContent = happiness;

  const petImage = document.getElementById('pet-image');
  if (hunger >= 8) {
    petImage.src = 'assets/baby-sad.png';
  } else if (happiness <= 3) {
    petImage.src = 'assets/baby-sad.png';
  } else {
    petImage.src = 'assets/baby-happy.png';
  }
}

// Feed pet function
function feedPet() {
  if (hunger > 0) {
    hunger -= 1;
    if(happiness < 10) {
        happiness += 1;
    }
  }
  saveState();  // Save state after change
  updateStats();
}

// Play pet function
function playPet() {
  if (happiness < 10) {
    happiness += 1;
    hunger += 1;
  }
  saveState();  // Save state after change
  updateStats();
}

// Decrease stats over time and save state
setInterval(() => {
  if(hunger < 10){
      hunger += 1;
  }
  if(happiness > 0){
      happiness -= 1;
  }  
  saveState();  // Save state after stats change
  updateStats();

  if (hunger >= 10 || happiness <= 0) {
    alert('Your pet needs you!');
  }
}, 15000); // Every 5 seconds

// Load saved state on page load
loadState();

