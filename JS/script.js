// Global variables
let allPets = [];
let likedPets = JSON.parse(localStorage.getItem('likedPets')) || [];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  navbarContainer();
  posterContainer();
  footerContainer();
  loadAllPets();
  loadCategory();
  updateLikedPetsDisplay();
});

// Navbar Component
const navbarContainer = () => {
  const navSection = document.querySelector('#navbar');
  const navbar = document.createElement('div');
  navbar.innerHTML = `
    <div class="navbar">
      <div class="navbar-start gap-2">
        <img class='w-6' src='images/logo.webp' />
        <p class='text-2xl font-bold'>Peddy</p>
      </div>
      <div class="navbar-center hidden lg:flex list-none gap-5 font-semibold cursor-pointer">
        <li class='hover:text-teal-800'>Home</li>
        <li class='hover:text-teal-800'>Shop</li>
        <li class='hover:text-teal-800'>Contact</li>
      </div>
      <div class="navbar-end">
        <img class='border cursor-pointer hover:bg-teal-700 p-2 rounded-full w-10 border-teal-500' src="https://img.icons8.com/material-outlined/24/user--v1.png" alt="user--v1"/>
      </div>
    </div>
  `;
  navSection.appendChild(navbar);
};

// Poster Component
const posterContainer = () => {
  const posterSection = document.querySelector('#poster-section');
  const poster = document.createElement('div');
  poster.innerHTML =`
    <p class='text-sm lg:text-2xl font-bold text-gray-500 mb-5'>Bringing Families Together ❤️‍🔥 </p>
    <p class='text-3xl lg:text-6xl font-bold mb-5'>Your Path to Adoption <br> Starts Here</p>
    <p class='text-gray-500 mb-5'>It is a long established fact that a reader will be distracted by the readable content of a page <br> when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
    <button onclick='scrollToViewMore()' class="btn btn-outline hover:bg-teal-900 hover:text-white border-teal-700 text-teal-700">View More</button>
    <img class='w-[700px] mx-auto' src='images/pet.webp' />
  `;
  posterSection.appendChild(poster);
};

// Footer Component
const footerContainer = () => {
  const footerSection = document.querySelector("#footer");
  const footer = document.createElement('div');
  footer.innerHTML = `
    <footer class="footer sm:footer-horizontal bg-black text-white p-10">
      <nav>
        <div class="navbar-start gap-2 mb-4">
          <img class='w-6' src='images/logo.webp' />
          <p class='text-3xl font-bold'>Peddy</p>
        </div>
        <a class="link link-hover">Location: av. Washington 165, NY CA 54003</a>
        <a class="link link-hover">Phone: +31 85 964 47 25</a>
        <a class="link link-hover">Email: info@peddy.com</a>
        <a class="link link-hover">Openings hours: 9.00 AM - 5.00 PM</a>
      </nav>
      <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Shop</a>
        <a class="link link-hover">Pet</a>
      </nav>
      <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <h6 class="footer-title">Newsletter</h6>
        <fieldset class="w-80">
          <label>Enter your email address</label>
          <div class="join mt-4">
            <input type="text" placeholder="username@site.com" class="input input-bordered join-item text-black" />
            <button class="btn bg-teal-700 text-white join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  `;
  footerSection.appendChild(footer);
};

// Load All Pets
const loadAllPets = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    allPets = data.pets || [];
    displayCard(allPets);
  } catch (error) {
    console.error("Error loading pets:", error);
    displayErrorState();
  }
};

// Display Error State
const displayErrorState = () => {
  const cardContainer = document.querySelector('#card-container');
  cardContainer.innerHTML = `
    <div class="text-center py-14 col-span-full bg-[#13131308] rounded-2xl">
      <img class="mx-auto w-50" src="images/error.webp" alt="error" />
      <p class="text-4xl font-bold my-4">Oops! Something went wrong.</p>
      <p class='text-gray-500'>We couldn't load the pets. Please try again later.</p>
      <button onclick="loadAllPets()" class="btn mt-4 btn-outline border-teal-700 text-teal-700">Retry</button>
    </div>
  `;
};

// Load Categories
const loadCategory = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    categoryContainer(data.categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

// Category Container
const categoryContainer = (categories) => {
  const categorySection = document.getElementById('category-section');
  categorySection.innerHTML = ''; // Clear existing categories

  categories.forEach(category => {
    const categoryBtn = document.createElement('div');
    categoryBtn.innerHTML = `
      <button id="btn-${category.category}" onclick='handleCategoryClick("${category.category}")' onclick="loadCard('${category.category}')" 
        class='category-button btn gap-2 px-6 lg:px-16 my-8 py-10 font-bold text-sm lg:text-lg rounded-2xl'>
        <img class='w-8 lg:w-10' src='${category.category_icon}' />
        ${category.category}
      </button>`;
    categorySection.append(categoryBtn);
  });
};

// Load Pets by Category
const loadCard = async (categoryName) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    const data = await res.json();
    displayCard(data.data || []);

    // Highlight active category
    document.querySelectorAll('.category-button').forEach(btn => {
      btn.classList.remove('bg-[#0E7A811A]', 'btn-outline', 'border-teal-700', 'rounded-full');
    });
    const activeBtn = document.getElementById(`btn-${categoryName}`);
    if (activeBtn) activeBtn.classList.add('bg-[#0E7A811A]', 'btn-outline', 'border-teal-700', 'rounded-full');
  } catch (error) {
    console.error(`Error loading ${categoryName} pets:`, error);
  }
};

// Display Cards
const displayCard = (pets) => {
  const cardContainer = document.querySelector('#card-container');
  cardContainer.innerHTML = '';

  if (pets.length === 0) {
    cardContainer.innerHTML = `
      <div class="text-center py-14 col-span-full bg-[#13131308] rounded-2xl">
        <img class="mx-auto w-50" src="images/error.webp" alt="empty" />
        <p class="text-4xl font-bold my-4">No pets found</p>
        <p class='text-gray-500'>We couldn't find any pets matching your criteria.</p>
      </div>`;
    return;
  }

  pets.forEach(pet => {
    const isLiked = likedPets.some(likedPet => likedPet.petId === pet.petId);
    const card = document.createElement('div');
    card.className = 'hover:shadow-lg transition-shadow duration-300';
    card.innerHTML = `
      <div class="card border border-gray-300 p-4 h-full flex flex-col">
        <figure class='h-[200px] flex-shrink-0'>
          <img class='w-full h-full object-cover rounded-t-lg' src='${pet.image || "images/placeholder.png"}' alt="${pet.pet_name}" />
        </figure>
        <div class="card-body px-0 py-4 flex-grow">
          <h2 class="card-title font-bold text-2xl">${pet.pet_name || "Unnamed Pet"}</h2>
          <div class='font-semibold text-gray-600 text-sm'>
            <p><span class="font-bold">Breed:</span> ${pet.breed || "N/A"}</p>
            <p><span class="font-bold">Age:</span> ${calculateAge(pet.date_of_birth) || "N/A"}</p>
            <p><span class="font-bold">Gender:</span> ${pet.gender || "N/A"}</p>
            <p><span class="font-bold">Price:</span> $${pet.price || "N/A"}</p>
          </div>
          <div class='divider my-2'></div>
        </div>
        <div class='text-center mt-auto pt-2'>
          <button onclick="toggleLike(${pet.petId})" class='btn rounded-xl mr-2 ${isLiked ? 'bg-teal-100 border-teal-800' : ''} text-teal-700 hover:bg-teal-900 hover:text-white'>
            <img class='w-5' src="${isLiked ? 'https://img.icons8.com/fluency/48/000000/facebook-like.png' : 'https://img.icons8.com/ios/50/000000/facebook-like--v1.png'}" />
          </button>
          <button onclick="handleAdopt(this)" class='btn rounded-xl mr-2 hover:bg-teal-900 hover:text-white text-teal-700'>Adopt</button>
          <button onclick="handleDetailsBtnClick(${pet.petId})" class='btn rounded-xl hover:bg-teal-900 hover:text-white text-teal-700'>Details</button>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
};

// Calculate Age from Birth Date
const calculateAge = (birthDate) => {
  if (!birthDate) return "N/A";
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  return `${currentYear - birthYear} years`;
};

// Toggle Like Status
const toggleLike = (petId) => {
  const pet = allPets.find(p => p.petId === petId);
  if (!pet) return;

  const existingIndex = likedPets.findIndex(p => p.petId === petId);
  
  if (existingIndex >= 0) {
    likedPets.splice(existingIndex, 1);
  } else {
    likedPets.push(pet);
  }

  // Save to localStorage
  localStorage.setItem('likedPets', JSON.stringify(likedPets));
  
  updateLikedPetsDisplay();
  displayCard(allPets); // Update the like buttons
};

// Update Liked Pets Display
const updateLikedPetsDisplay = () => {
  const likedPetsGrid = document.getElementById('liked-pets-grid');
  if (!likedPetsGrid) return;

  likedPetsGrid.innerHTML = '';

  if (likedPets.length === 0) {
    likedPetsGrid.innerHTML = `
      <div class="col-span-2 text-center py-8">
        <img src="https://img.icons8.com/ios/50/000000/like--v1.png" class="mx-auto w-10 h-10 opacity-50"/>
        <p class="text-gray-500 mt-2 text-sm">No liked pets yet</p>
      </div>
    `;
    return;
  }

  likedPets.forEach(pet => {
    const petThumbnail = document.createElement('div');
    petThumbnail.className = 'cursor-pointer group relative';
    petThumbnail.innerHTML = `
      <div class="relative overflow-hidden rounded-lg">
        <img src="${pet.image || 'images/placeholder.png'}" alt="${pet.pet_name}" 
             class="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
        <button onclick="removeLikedPet(${pet.petId}, event)" 
                class="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full transition-all">
          <img src="https://img.icons8.com/ios-filled/50/FA5252/delete-sign.png" class="w-4 h-4" />
        </button>
      </div>
      <div class="mt-2">
        <p class="text-sm font-medium truncate">${pet.pet_name || 'Unnamed Pet'}</p>
        <div class="flex justify-between items-center">
          <p class="text-xs text-gray-500">$${pet.price || 'N/A'}</p>
          <span class="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded">${pet.breed?.split(' ')[0] || 'Pet'}</span>
        </div>
      </div>
    `;
    petThumbnail.onclick = (e) => {
      if (!e.target.closest('button')) {
        loadPetDetails(pet.petId);
      }
    };
    likedPetsGrid.appendChild(petThumbnail);
  });
};

// Remove Liked Pet
const removeLikedPet = (petId, event) => {
  event.stopPropagation();
  const existingIndex = likedPets.findIndex(p => p.petId === petId);
  if (existingIndex >= 0) {
    likedPets.splice(existingIndex, 1);
    localStorage.setItem('likedPets', JSON.stringify(likedPets));
    updateLikedPetsDisplay();
    displayCard(allPets);
  }
};

// Load Pet Details

const loadPetDetails = async (id) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    displayPetDetails(data.petData);
  } catch (error) {
    console.error("Error loading pet details:", error);
  }
};



// Display Pet Details Modal

const displayPetDetails = (details) => {
  const detailContainer = document.querySelector('#modal-details');
  detailContainer.innerHTML = `
    <div>
      <div class="md:order-1">
        <img class='w-full h-64 md:h-full object-cover rounded-xl' src="${details.image || 'images/placeholder.png'}" />
      </div>
      <div class="md:order-2">
        <h2 class='text-3xl font-bold my-4'>${details.pet_name || 'Unnamed Pet'}</h2>
        <div class='grid grid-cols-2 gap-4 mb-6'>
          <div class="bg-teal-50 p-3 rounded-lg">
            <p class="text-sm text-gray-500">Breed</p>
            <p class="font-semibold">${details.breed || 'N/A'}</p>
          </div>
          <div class="bg-teal-50 p-3 rounded-lg">
            <p class="text-sm text-gray-500">Gender</p>
            <p class="font-semibold">${details.gender || 'N/A'}</p>
          </div>
          <div class="bg-teal-50 p-3 rounded-lg">
            <p class="text-sm text-gray-500">Age</p>
            <p class="font-semibold">${calculateAge(details.date_of_birth)}</p>
          </div>
          <div class="bg-teal-50 p-3 rounded-lg">
            <p class="text-sm text-gray-500">Price</p>
            <p class="font-semibold">$${details.price || 'N/A'}</p>
          </div>
        </div>
        <div class='mb-6'>
          <h3 class='text-xl font-semibold mb-2'>About</h3>
          <p class='text-gray-600'>${details.pet_details || 'No additional information available.'}</p>
        </div>
        <div class="flex justify-between">
          <button onclick="toggleLike(${details.petId}); petDetails_modal.close()" class="btn gap-2 ${likedPets.some(p => p.petId === details.petId) ? 'bg-teal-100 text-teal-800' : 'btn-outline border-teal-700 text-teal-700'}">
            <img class='w-5' src="${likedPets.some(p => p.petId === details.petId) ? 'https://img.icons8.com/fluency/48/000000/facebook-like.png' : 'https://img.icons8.com/ios/50/000000/facebook-like--v1.png'}" />
            ${likedPets.some(p => p.petId === details.petId) ? 'Liked' : 'Like'}
          </button>
          <button onclick='handleAdopt(this)' class="btn bg-teal-700 hover:bg-teal-800 text-white gap-2">
            Adopt Now
          </button>
        </div>
      </div>
    </div>
  `;
  document.querySelector('#petDetails_modal').showModal();
};

// Sort by Price
document.querySelector('#sort-by-price').addEventListener('click', () => {
  const sortButton = document.querySelector('#sort-by-price');
  const isAscending = sortButton.getAttribute('data-sort') === 'asc';
  
  const sortedPets = [...allPets].sort((a, b) => {
    const priceA = parseFloat(a.price) || 0;
    const priceB = parseFloat(b.price) || 0;
    return isAscending ? priceA - priceB : priceB - priceA;
  });
  
  displayCard(sortedPets);
  
  // Toggle sort direction
  sortButton.setAttribute('data-sort', isAscending ? 'desc' : 'asc');
  sortButton.textContent = isAscending ? 'Sort by Price (High to Low)' : 'Sort by Price (Low to High)';
});

// Scroll to View More
const scrollToViewMore = () => {
  const viewSection = document.querySelector('#category-section');
  viewSection.scrollIntoView({ behavior: 'smooth' });
};

// Adopt button Sweet Alert


const handleAdopt = (btn) => {
    let countdown = 3;

    Swal.fire({
      title: '🎉<br> <span class="text-5xl">Congratulations</span>',
      html: `Adoption Process is Start For your Pet<br><strong class='text-5xl' id="swal-timer">${countdown}</strong>`,
      
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
         popup: 'custom-swal'
      },
      didOpen: () => {
        const timerEl = Swal.getHtmlContainer().querySelector('#swal-timer');
        const interval = setInterval(() => {
          countdown--;
          timerEl.textContent = countdown;

          if (countdown === 0) {
            clearInterval(interval);
            Swal.close();
            btn.textContent = 'Adopted';
            btn.disabled = true;
            btn.classList.add('bg-gray-500','text-gray-400', 'cursor-not-allowed');
            btn.classList.remove('text-teal-700')
          }
        }, 1000);
      }
    });
  };


 // Spinner for card section

function handleCategoryClick(categoryName) {
  const spinner = document.getElementById('spinner');
  const cardSection =document.getElementById('card-container');
  const likedPetSec = document.getElementById('liked-pet')
  
  spinner.classList.remove('hidden'); // Show spinner
  cardSection.classList.add('hidden');
  likedPetSec.classList.add('fixed');


  setTimeout(() => {
    spinner.classList.add('hidden'); // Hide spinner after 2s
    cardSection.classList.remove('hidden');
    likedPetSec.classList.remove('fixed');

    // Now call your actual category function here
    loadCard(categoryName); // Example function
  }, 1000);
}; 



// Spinner for details button


function handleDetailsBtnClick(petId) {
  const spinnerOverlay = document.getElementById('fullscreen-spinner');
  spinnerOverlay.classList.remove('hidden'); // Show spinner

  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
      .then(res => res.json())
      .then(data => {
        displayPetDetails(data.petData);
      })
      .catch(err => {
        console.error("Error loading pet details", err);
      })
      .finally(() => {
        spinnerOverlay.classList.add('hidden'); // Hide spinner after fetch
      });
  }, 1000); // Delay for spinner smoothness
}







