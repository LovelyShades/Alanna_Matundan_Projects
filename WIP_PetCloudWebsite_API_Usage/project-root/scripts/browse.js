document.addEventListener("DOMContentLoaded", function () {
    const filterToggle = document.querySelector(".toggle-btn");
    const filterContent = document.querySelector(".filter-content");
    const petContainer = document.querySelector(".pet-container");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const searchButton = document.querySelector(".search-btn");

    
    const API_KEY = 'Es1zqvQv'; // Your API key
    const API_URL = 'https://api.rescuegroups.org/v5/public/animals/search';

    let currentPage = 1;
    const limit = 250; // Number of pets to display per page
    let totalResults = 0;
    let allPets = []; // Array to hold all fetched pets
    let displayedPets = []; // Array to hold pets currently displayed on the page
    let fetching = false; // To avoid multiple simultaneous fetches

    // Function to fetch pets from RescueGroups.org API
    async function fetchPets(page) {
        // Collect filter values
        const type = document.getElementById("type").value;
        const age = document.getElementById("age").value;
        const size = document.getElementById("size").value;
        const location = document.getElementById("location").value;

        console.log(`Fetching pets from page ${page} from API`);
        console.log(`Filters - Type: ${type}, Age: ${age}, Size: ${size}, Location: ${location}`);

        // Build the query parameters based on filters
        const query = {
            status: 'Available',
            type: type !== 'other' ? type : undefined,
            ageGroup: age || undefined,
            sizeGroup: size || undefined,
            location: location || undefined,
            limit: limit, // Fetch 250 pets per page
            page: page
        };

        // Construct URL with query parameters
        const queryString = Object.keys(query)
            .filter(key => query[key] !== undefined) // Filter out undefined values
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
            .join('&');

        const url = `${API_URL}?${queryString}`;
        console.log('Fetching URL:', url); // Debugging line

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': ` ${API_KEY}`, // Ensure correct authorization format
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data); // Debugging line

            // Use meta.count for totalResults
            totalResults = data.meta.count || 0;
            console.log('Total results:', totalResults);

            // Filter available pets and accumulate
            const availablePets = data.data.filter(pet => pet.attributes.isAdoptionPending);
            allPets = allPets.concat(availablePets);
            console.log(`Total pets fetched: ${allPets.length}`);

            // If we have reached the current page's limit
            if (allPets.length >= currentPage * limit) {
                displayPets(allPets);
                updatePagination();
            } else {
                console.log('Fetching more pets for the current page...');
                fetchPets(page + 1);
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
            fetching = false; // Reset fetching flag on error
        }
    }

    // Function to display pets on the page
    function displayPets(pets) {
        petContainer.innerHTML = ''; // Clear the container first
        displayedPets = pets; // Update displayed pets array

        // Calculate start and end indices for the current page
        const startIdx = (currentPage - 1) * limit;
        const endIdx = currentPage * limit;

        console.log(`Displaying pets from index ${startIdx} to ${endIdx}`);

        // Slice the pets array to only display the pets for the current page
        const petsToDisplay = pets.slice(startIdx, endIdx);
        console.log('Displaying pets:', petsToDisplay.length);

        petsToDisplay.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.dataset.petId = pet.id;

            const petImage = pet.attributes.pictureThumbnailUrl || '../images/default-image.jpg';
            const petName = pet.attributes.name || 'No Name';
            const petBreed = pet.attributes.breedPrimary || 'Unknown Breed';
            const petAge = pet.attributes.ageString || 'Unknown Age';
            const petGender = pet.attributes.sex || 'Unknown Gender';

            petCard.innerHTML = `
                <div class="pet-card-image">
                    <img src="${petImage}" alt="${petName}">
                </div>
                <div class="pet-card-info">
                    <h3>${petName}</h3>
                    <p><strong>Breed:</strong> ${petBreed}</p>
                    <p><strong>Age:</strong> ${petAge}</p>
                    <p><strong>Gender:</strong> ${petGender}</p>
                    <button class="adopt-btn">Adopt</button>
                </div>
            `;

            petContainer.appendChild(petCard);
        });

        // Add event listeners to the "Adopt" buttons
        document.querySelectorAll('.adopt-btn').forEach(button => {
            button.addEventListener('click', function () {
                const petCard = this.closest('.pet-card');
                const petId = petCard.dataset.petId;
                window.location.href = `pet-details.html?id=${petId}`;
            });
        });
    }

    // Update pagination buttons based on the current page and total pages
    function updatePagination() {
        const totalPages = Math.ceil(totalResults / limit);
        console.log(`Updating website pagination - Current page: ${currentPage}, Total pages: ${totalPages}`);
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage >= totalPages;
    }

    // Pagination button event listeners
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPets(allPets);
            updatePagination();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage * limit < totalResults && !fetching) {
            fetching = true; // Prevent multiple fetches
            currentPage++;

            if (allPets.length < currentPage * limit) {
                fetchPets(currentPage);
            } else {
                displayPets(allPets);
                updatePagination();
            }
            fetching = false; // Reset fetching flag after fetch completes
        }
    });

    // Search button event listener
    searchButton.addEventListener('click', () => {
        currentPage = 1; // Reset to the first page
        allPets = []; // Clear accumulated pets
        fetchPets(currentPage);
    });

    // Toggle Filter Section
    if (filterToggle && filterContent) {
        filterToggle.addEventListener("click", function () {
            filterContent.classList.toggle("show");
            filterToggle.textContent = filterContent.classList.contains("show") ? "Hide Filters" : "Show Filters";
        });
    }

    // Initial fetch of pets on page load
    fetchPets(currentPage);
});
