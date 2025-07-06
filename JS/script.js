const navbarContainer = () =>{
    const navSection = document.querySelector('#navbar');
    const navbar = document.createElement('div');
    navbar.innerHTML = `
            <div class="navbar">
        <div class="navbar-start gap-2">
            <img class='w-6' src='images/logo.webp' />
            <p class='text-2xl font-bold'>Peddy</p>
        </div>
        <div class="navbar-center hidden lg:flex list-none gap-5 font-semibold cursor-pointer text-gray-500">
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


navbarContainer();