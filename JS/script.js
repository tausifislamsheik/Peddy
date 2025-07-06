const navbarContainer = () =>{
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


// Poster section

const posterContainer = () =>{
    const posterSection = document.querySelector('#poster-section');
    const poster = document.createElement('div');
    poster.innerHTML =`
         <p class='text-sm lg:text-2xl font-bold text-gray-500 mb-5'>Bringing Families Together ❤️‍🔥 </p>
         <p class='text-3xl lg:text-6xl font-bold mb-5'>Your Path to Adoption <br> Starts Here</p>
         <p class='text-gray-500 mb-5'>It is a long established fact that a reader will be distracted by the readable content of a page <br> when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
         <button class="btn btn-outline hover:bg-teal-900 hover:text-white border-teal-700 text-teal-700">View More</button>
         <img class='w-[600px] mx-auto' src='images/pet.webp' />
    `;
    posterSection.appendChild(poster);
};

// Category section

const loadCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    categoryContainer(data.categories)
}

const categoryContainer = (categories) =>{
    const categorySection = document.getElementById('category-section');
    categories.forEach(category => {
        const categoryBtn = document.createElement('div');
        categoryBtn.innerHTML = `
            
            <button class='btn px-12 py-8'>
                ${category.category}
            </button>
        `
        categorySection.append(categoryBtn)
    });
}




loadCategory();
posterContainer();
navbarContainer();