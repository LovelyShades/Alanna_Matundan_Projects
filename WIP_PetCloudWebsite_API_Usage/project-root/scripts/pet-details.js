document.addEventListener("DOMContentLoaded", function () {
    const petDetailsContainer = document.querySelector("#pet-details-container");
    const API_KEY = 'Es1zqvQv'; // Replace with your actual API key
    const API_URL = 'https://api.rescuegroups.org/v5/public/animals/';

    // Get the pet ID from the URL
    const params = new URLSearchParams(window.location.search);
    const petId = params.get('id');

    if (!petId) {
        console.error('Pet ID is missing in the URL.');
        return; 
    }

    // Function to fetch and display pet details
    async function fetchPetDetails() {
        try {
            const response = await fetch(`${API_URL}${petId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${API_KEY}`, // Use Bearer token format
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Log the data to inspect its structure
            console.log('Pet details data:', data);

            // Check if data.data exists and is an array
            if (data && data.data && Array.isArray(data.data)) {
                const pet = data.data[0]; // Get the first item from the array
                const included = data.included; // Related data

                // Process and display pet details
                displayPetDetails(pet, included);
            } else {
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching pet details:', error);
        }
    }

    // Function to display pet details on the page
    function displayPetDetails(pet, included) {
        if (!pet || !pet.attributes) {
            console.error('No pet data or attributes received.');
            return;
        }

        // Find the pet's pictures from the included data
        const pictureIds = pet.relationships.pictures.data.map(p => p.id);
        const pictures = included.filter(item => item.type === 'pictures' && pictureIds.includes(item.id));

        // Extract additional details
        const petName = pet.attributes.name || 'No Name';
        const petBreed = pet.attributes.breedPrimary || 'Unknown Breed';
        const petAge = pet.attributes.ageString || 'Unknown Age';
        const petGender = pet.attributes.sex || 'Unknown Gender';
        const petDescription = pet.attributes.descriptionText || 'No description available.';
        const petAdoptUrl = pet.attributes.adoptUrl || '#'; // Replace with actual URL if available
        const petAdoptionStatus = pet.attributes.isAdoptionPending

        // Additional information
        const petEmail = included.find(item => item.type === 'orgs' && item.attributes.email)?.attributes.email || 'No Email';
        const petLocation = included.find(item => item.type === 'locations' && item.id === pet.relationships.locations.data[0]?.id)?.attributes || {};
        const petLocationStr = `${petLocation.city || 'Unknown City'}, ${petLocation.state || 'Unknown State'}, ${petLocation.country || 'Unknown Country'}`;
        const petOrgUrl = included.find(item => item.type === 'orgs' && item.id === pet.relationships.orgs.data[0]?.id)?.attributes.url || 'No URL';

        // Set default image if no pictures available
        const defaultImage = 'images/default-image.jpg';

        petDetailsContainer.innerHTML = `
            <div class="pet-details-images">
                ${pictures.length > 0 ? pictures.map(picture => `
                    <div class="pet-image">
                        <img src="${picture.attributes.large.url}" alt="${petName}">
                    </div>
                `).join('') : `<img src="${defaultImage}" alt="${petName}">`}
            </div>
            <div class="pet-details-info">
                <h1>${petName}</h1>
                <p><strong>Breed:</strong> ${petBreed}</p>
                <p><strong>Age:</strong> ${petAge}</p>
                <p><strong>Gender:</strong> ${petGender}</p>
                <p><strong>Description:</strong> ${petDescription}</p>
                <p><strong>Adoption Status:</strong> ${petAdoptionStatus}</p>
                <p><strong>Email:</strong> ${petEmail}</p>
                <p><strong>Location:</strong> ${petLocationStr}</p>
                <p><strong>Organization Website:</strong> <a href="${petOrgUrl}" target="_blank">${petOrgUrl}</a></p>
            </div>
        `;
    }

    // Call the fetchPetDetails function on page load
    fetchPetDetails();
});
