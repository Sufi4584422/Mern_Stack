let universitiesData = []; 
let currentPage = 1; 
let perPage = 10;
let favorites = []; 

async function fetchUniversitiesByCountry(country) {
  try {
    const url = 'data.json'; // Use the correct path to your data.json file
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const universities = await response.json();
    
    // Filter universities based on the given country
    const universitiesByCountry = universities.filter(university => university.country.toLowerCase() == country.toLowerCase() );
    
    return universitiesByCountry;
  } catch (error) {
    console.error("Error fetching universities:", error.message);
    return [];
  }
}




function displayUniversitiesOnPage(page) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const universitiesToShow = universitiesData.slice(startIndex, endIndex);
  const universitiesList = document.getElementById("universitiesList");
  universitiesList.innerHTML = universitiesToShow
    .map((university) => createUniversityCard(university))
    .join("");
}

function updatePerPage() {
  const perPageInput = document.getElementById('perPageInput');
  const newPerPage = parseInt(perPageInput.value, 10);
    perPage = newPerPage;
    currentPage = 1;
    displayUniversitiesOnPage(currentPage, perPage);
    handlePaginationButtons();
}
// Event listener for update btn
const updatePerPageBtn = document.getElementById('updatePerPageBtn');
updatePerPageBtn.addEventListener('click', updatePerPage);

function createUniversityCard(university) {
  console.log(university)
  const isUniversityInFavorites = favorites.some((favUniversity) => favUniversity.name == university.name);
  return `
    <div class="card mt-4 FavoriteHead">
      <div class="card-body d-flex justify-content-between">
        <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#universityModal" data-university-id="${university.name}">
          ${university.name}
        </h5>
        <i class="heart-icon ${isUniversityInFavorites ? 'fas' : 'far'} fa-heart" data-university-id="${university.name}"></i>
      </div>
    </div>
  `;
}
// uni details in modal
function showUniversityDetails(universityId) {
  const university = universitiesData.find((univ) => univ.name === universityId);
  if (!university) return;
  const modalContent = document.getElementById('universityDetailsContent');
  modalContent.innerHTML = `
    <h4>${university.name}</h4>
    <p><b>Country:</b> ${university.country}</p>
    <p><b>Domains:</b> ${university.domains}</p>
    <p><b>Websites:</b> ${university.web_pages}</p>
    <p><b>State/Province:</b> ${university["state-province"]}</p>
  `;
  // updateAddToFavoritesBtnStatus(university.name);
}

// update btn status and heart status
function updateAddToFavoritesBtnStatus(universityId, isAdded) {
  const heartIcon = document.querySelector(`.heart-icon[data-university-id="${universityId}"]`);
  if (!heartIcon) return;

  if (isAdded) {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
    heartIcon.style.color = '#dc3545'; 
  } else {
    heartIcon.classList.remove('fas');
    heartIcon.classList.add('far');
    heartIcon.style.color = '#777'; 
  }
}

function addToFavorites(universityId) {
  const university = universitiesData.find((univ) => univ.name === universityId);
  if (!university) return;
  const isUniversityInFavorites = favorites.some((favUniversity) => favUniversity.name === university.name);
  if (!isUniversityInFavorites) {
    favorites.push(university);
    updateFavoritesList();
    updateAddToFavoritesBtnStatus(universityId, true); 
    saveFavoritesToLocalStorage(); 
    createUniversityCard();

    const heartIcon = document.querySelector(`.heart-icon[data-university-id="${universityId}"]`);
    if (heartIcon) {
      heartIcon.classList.add('red-heart');
    }
  } else {
    alert("Already available in the favorites list.");
  }
}

function removeFromFavorites(universityId) {
  favorites = favorites.filter((univ) => univ.name !== universityId);
  console.log(favorites)
  updateFavoritesList();
  updateAddToFavoritesBtnStatus(universityId, false); 
  saveFavoritesToLocalStorage(); 

  const heartIcon = document.querySelector(`.heart-icon[data-university-id="${universityId}"]`);
  if (heartIcon) {
    heartIcon.classList.remove('red-heart');
  }
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavoritesFromLocalStorage() {
  const favoritesData = localStorage.getItem("favorites");
  if (favoritesData) {
    favorites = JSON.parse(favoritesData);
  }
}

// load from lcal storage
loadFavoritesFromLocalStorage();

function movingUp(universityId) {
  const index = favorites.findIndex((university) => university.name === universityId);
  if (index > 0) {
    const temp = favorites[index];
    console.log(temp)
    favorites[index] = favorites[index - 1];
    favorites[index - 1] = temp;
    updateFavoritesList();
    // updateAddToFavoritesBtnStatus();
  }
}


function movingDown(universityId) {
  const index = favorites.findIndex((university) => university.name === universityId);
  if (index >= 0 && index < favorites.length - 1) {
    const temp = favorites[index];
    favorites[index] = favorites[index + 1];
    favorites[index + 1] = temp;
    updateFavoritesList();
    // updateAddToFavoritesBtnStatus();
  }
}

function moveToTop(universityId) {
  const index = favorites.findIndex((university) => university.name === universityId);

  if (index > 0) {
    const temp = favorites[index];
    favorites.splice(index, 1); // remove from from current position
    favorites.unshift(temp); // start to the favorites array
    updateFavoritesList();
    updateAddToFavoritesBtnStatus();
  }
}

function moveToBottom(universityId) {
  const index = favorites.findIndex((university) => university.name === universityId);

  if (index >= 0 && index < favorites.length - 1) {
    const temp = favorites[index];
    favorites.splice(index, 1); // remove from the current position
    favorites.push(temp); // end of the favorites array
    updateFavoritesList();
    // updateAddToFavoritesBtnStatus();
  }
}

// Function to display the favorites list
function updateFavoritesList() {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = favorites
    .map((university, index) => createFavoriteItem(university, index))
    .join("");
}

// Function to create a favorite item dynamically
function createFavoriteItem(university, index) {
  const isFirstUniversity = index === 0;
  const isLastUniversity = index === favorites.length - 1;
  return `
    <div class="favorite-item mt-4 FavoriteHead">
      <h5>${university.name}</h5>
      <button type="button" class="btn updateBtn btn-secondary btn-sm removeFromFavoritesBtn" data-university-id="${university.name}">Remove</button>
      <button type="button" class="btn updateBtn btn-secondary btn-sm movingUpBtn" data-university-id="${university.name}" ${isFirstUniversity ? 'disabled' : ''}>Up</button>
      <button type="button" class="btn updateBtn btn-secondary btn-sm movingDownBtn" data-university-id="${university.name}" ${isLastUniversity ? 'disabled' : ''}>Down</button>
      ${!isFirstUniversity ? `<button type="button" class="btn updateBtn btn-secondary btn-sm moveToTopBtn" data-university-id="${university.name}">Top</button>` : ''}
      ${!isLastUniversity ? `<button type="button" class="btn updateBtn btn-secondary btn-sm moveToBottomBtn" data-university-id="${university.name}">Bottom</button>` : ''}
    </div>
  `;
}

function handlePaginationButtons() {
  const paginationButtons = document.getElementById("paginationButtons");
  paginationButtons.innerHTML = "";
  const totalPages = Math.ceil(universitiesData.length / perPage);
  if (totalPages > 1) {
    const prevButton = createPaginationButton("Previous", currentPage - 1);
    paginationButtons.appendChild(prevButton);
    // for (let i = 1; i <= totalPages; i++) {
    //   const button = createPaginationButton(i, i);
    //   paginationButtons.appendChild(button);
    // }
    const nextButton = createPaginationButton("Next", currentPage + 1);
    paginationButtons.appendChild(nextButton);
  }
}

function createPaginationButton(text, page) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "btn-secondary", "mx-1");
  button.textContent = text;
  button.addEventListener("click", () => {
    currentPage = page;
    displayUniversitiesOnPage(currentPage);
    handlePaginationButtons();
  });
  return button;
}
// ###############Event listeners###############

// Event listener for the search form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const country = document.getElementById("country").value;
  universitiesData = await fetchUniversitiesByCountry(country);
  currentPage = 1;
  displayUniversitiesOnPage(currentPage);
  handlePaginationButtons();
});
// Event listener for opening the modal to show university details
const universitiesList = document.getElementById("universitiesList");
universitiesList.addEventListener("click", (e) => {
  const target = e.target;
  const universityId = target.getAttribute("data-university-id");
  if (universityId) {
    showUniversityDetails(universityId);
  }
});

// Event listener for both removing universities from favorites and moving universities up
const favoritesList = document.getElementById("favoritesList");
favoritesList.addEventListener("click", (e) => {
  const target = e.target;
  const universityId = target.getAttribute("data-university-id");

  if (universityId) {
    if (target.classList.contains("removeFromFavoritesBtn")) {
      removeFromFavorites(universityId);
    } else if (target.classList.contains("movingUpBtn")) {
      movingUp(universityId);
    } else if ( target.classList.contains("movingDownBtn") ) {
      movingDown(universityId)
    } else if (target.classList.contains("moveToTopBtn")) {
      moveToTop(universityId);
    } else if (target.classList.contains("moveToBottomBtn")) {
      moveToBottom(universityId);
    }
  }
});

// Event listener for opening the modal to show university details
const universitiesContainer = document.getElementById("universitiesList");
universitiesContainer.addEventListener("click", (e) => {
  const target = e.target;
  const universityId = target.getAttribute("data-university-id");
  if (universityId) {
    if (target.classList.contains("btn-primary")) {
      showUniversityDetails(universityId);
    } else if (target.classList.contains("heart-icon")) {
      const isUniversityInFavorites = favorites.some((favUniversity) => favUniversity.name === universityId);
      if (isUniversityInFavorites) {
        removeFromFavorites(universityId);
      } else {
        addToFavorites(universityId);
      }
      updateAddToFavoritesBtnStatus(universityId);
    }}
});

// Event listener for the "per pages" select element
const perPageSelect = document.getElementById('perPageSelect');
if (perPageSelect) {
  perPageSelect.addEventListener('change', (e) => {
    perPage = parseInt(e.target.value, 10);
    currentPage = 1;
    displayUniversitiesOnPage(currentPage, perPage);
    handlePaginationButtons();
  });
}
// Initial page load
displayUniversitiesOnPage(currentPage);
handlePaginationButtons();
updateFavoritesList();
