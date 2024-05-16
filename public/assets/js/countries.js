document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('country-select');
    
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.textContent = country.name;
                option.value = country.code; // Assuming each country has a unique code
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries data:', error));
});


document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('nationality-select');
    
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.textContent = country.name;
                option.value = country.code; // Assuming each country has a unique code
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries data:', error));
});
