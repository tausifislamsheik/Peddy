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

// Footer section

const footerContainer = () =>{
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
                        <a class="link link-hover">Email: info@yourdomain.com</a>
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
                            <input
                            type="text"
                            placeholder="username@site.com"
                            class="input input-bordered join-item text-black" />
                            <button class="btn bg-teal-700 text-white join-item">Subscribe</button>
                        </div>
                        </fieldset>
                    </form>
            </footer>
    `
    footerSection.appendChild(footer)
}

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
            
            <button class='btn px-16 my-8 py-8 font-bold text-lg rounded-full'>
            
                ${category.category}
            </button>
        `
        categorySection.append(categoryBtn)
    });
};


// Display card

const loadCard = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayCard(data.pets)
}

const displayCard = (pets) =>{
    const cardContainer = document.querySelector('#card-container');
    pets.forEach(pet =>{
        const card = document.createElement('div');
        card.innerHTML = `
           <div class="card">
                <figure class='h-[200px]'>
                    <img class='w-full h-full'
                    src=${pet.image}
                    alt="" />
                </figure>
                <div class="card-body px-0 py-4 ">
                    <h2 class="card-title font-bold text-2xl">${pet.pet_name}</h2>
                    <div class='font-semibold text-gray-600 text-sm border-b'>
                        <p>Breed: ${pet.breed}</p>
                        <p>Birth: ${pet.date_of_birth}</p>
                        <p>Gender: ${pet.gender}</p>
                        <p>Price: ${pet.price}<span></span>$</p>
                    </div>
                    
                    </div>
                    <div class='text-center'>
                      <button class='btn rounded-xl mr-4 btn-outline border-teal-700 text-teal-700 hover:bg-teal-900'><img class='w-7' src="https://img.icons8.com/sf-regular/48/737373/facebook-like.png" alt="like"/></button>
                      <button class='btn rounded-xl mr-4 btn-outline hover:bg-teal-900 hover:text-white border-teal-700 text-teal-700'>Adopt</button>
                      <button class='btn rounded-xl btn-outline hover:bg-teal-900 hover:text-white border-teal-700 text-teal-700'>Details</button>
                    </div>
           </div>
        `;
        cardContainer.appendChild(card)
    })
}


loadCard();
loadCategory();
footerContainer();
posterContainer();
navbarContainer();