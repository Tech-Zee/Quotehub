// ==== SELECTORS ====
const cardContainer = document.querySelector(".cardContainer");
const categoryFilter = document.getElementById("categoryFilter");
const favoritesContainer = document.querySelector(".favoritesContainer");

// ==== DATA ====
let allQuotes = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentDisplayedQuotes = []; // currently shown quotes

// ==== CATEGORIES ====
const categories = ["love", "Motivation", "Friendship", "Happiness", "Sadness", "Growth"];
function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

// ==== FETCH QUOTES ====
fetch("https://dummyjson.com/quotes")
  .then(response => response.json())
  .then(data => {
    // add random category to each quote
    allQuotes = data.quotes.map(item => ({
      ...item,
      category: getRandomCategory()
    }));

    // display initial 5 quotes
    displayQuotes(allQuotes.slice(0,4));

    // attach category filter
    categoryFilter.addEventListener("change", function() {
      const selected = this.value.toLowerCase();

      if (selected === "all") {
        displayQuotes(allQuotes.slice(0,4));
      } else {
        const filtered = allQuotes.filter(
          item => item.category.toLowerCase() === selected
        );
        displayQuotes(filtered);
      }
    });
  });

// ==== HELPER FUNCTIONS ====
function isFavorited(item) {
  return favorites.some(fav => fav.id === item.id);
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ==== DISPLAY QUOTES FUNCTION ====
function displayQuotes(quotes) {
  currentDisplayedQuotes = quotes;
  cardContainer.innerHTML = "";

  quotes.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>"${item.quote}"</h3>
      <p>- ${item.author}</p>
      <small>Category: ${item.category}</small> <br>
      <button class="fav-btn">${isFavorited(item) ? '❤️' : '♡'}</button>
    `;

    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
      if (isFavorited(item)) {
        favorites = favorites.filter(fav => fav.id !== item.id);
      } else {
        favorites.push(item);
      }
      saveFavorites();
      displayFavorites();           // refresh favorites section
      displayQuotes(currentDisplayedQuotes); // update heart in main section
    });

    cardContainer.appendChild(card);
  });
}

// ==== DISPLAY FAVORITES ====
function displayFavorites() {
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorites yet. Click ♡ on a quote to save it!</p>";
    return;
  }

  favorites.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>"${item.quote}"</h3>
      <p>- ${item.author}</p>
      <small>Category: ${item.category}</small> <br>
      <button class="fav-btn">❤️</button>
    `;

    // allow removing from favorites
    card.querySelector(".fav-btn").addEventListener("click", () => {
      favorites = favorites.filter(fav => fav.id !== item.id);
      saveFavorites();
      displayFavorites();
      displayQuotes(currentDisplayedQuotes); // keep main section updated
    });

    favoritesContainer.appendChild(card);
  });
}

// ==== INITIAL FAVORITES RENDER ====
displayFavorites();

// CATEGORIES SEARCH BUTTON


document.addEventListener("DOMContentLoaded", () => {
  const categorySearchBtn = document.getElementById("search_btn");

  categorySearchBtn.addEventListener("click", () => {
    e.preventDefault();
    const selectedCategory = categoryFilter.value.toLowerCase();
    if (selectedCategory === "all") {
      displayQuotes(allQuotes.slice(0,4));
    } else {
      const filtered = allQuotes.filter(
        item => item.category.toLowerCase() === selectedCategory
      );
      displayQuotes(filtered);
    }
    
  });
});

                // Navbar

const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");
const navLinks = document.getElementById("links");

function toggleMenu() {
  const isOpen = navLinks.style.display === "flex";

  if (isOpen) {
    navLinks.style.display = "none";
    hamburgerIcon.style.display = "inline";
    closeIcon.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    hamburgerIcon.style.display = "none";
    closeIcon.style.display = "inline";
  }
}

hamburgerIcon.addEventListener("click", toggleMenu);
closeIcon.addEventListener("click", toggleMenu);

// Optional: close menu when a link is clicked (mobile)
// navLinks.querySelectorAll("a").forEach(link => {
//   link.addEventListener("click", () => {
//     navLinks.style.display = "none";
//     hamburgerIcon.style.display = "inline";
//     closeIcon.style.display = "none";
//   });
// });

