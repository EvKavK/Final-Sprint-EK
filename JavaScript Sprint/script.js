// Name: Evan Kavanagh
// Date: July 31st, 2024 - August 11th, 2024
// Purpose: Create a html file that contains information on Pokémon,
//          including stats, types, and categories.

document.addEventListener('DOMContentLoaded', () => {
    fetch('pokemon.json')
        .then(response => response.json())
        .then(data => {
            console.log('Pokémon data:', data);
            displayData(data);

            document.getElementById('type-counts').textContent = `Type Counts: ${JSON.stringify(getTypeCounts(data))}`;
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
});

function displayData(data) {
    const container = document.getElementById('pokemon-data');
    container.innerHTML = '';
    data.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        
        const nameElement = document.createElement('h2');
        nameElement.textContent = pokemon.name;
        pokemonElement.appendChild(nameElement);

        const categoryElement = document.createElement('p');
        categoryElement.textContent = `The ${pokemon.category}`;
        pokemonElement.appendChild(categoryElement);

        const typeElement = document.createElement('p');
        typeElement.textContent = `Type: ${pokemon.type}`;
        pokemonElement.appendChild(typeElement);

        const statsList = document.createElement('ul');
        statsList.innerHTML = `
            <li>This Pokémon's HP Stat is: ${pokemon.hp}.</li>
            <li>This Pokémon's Attack Stat is: ${pokemon.attack}.</li>
            <li>This Pokémon's Defense Stat is: ${pokemon.defense}.</li>
            <li>This Pokémon's Special Attack Stat is: ${pokemon.special_attack}.</li>
            <li>This Pokémon's Special Defense Stat is: ${pokemon.special_defense}.</li>
            <li>This Pokémon's Speed Stat is: ${pokemon.speed}.</li>
            <li>This Pokémon's Base Stat Total is: ${calculateBST(pokemon)}.</li>
        `;
        pokemonElement.appendChild(statsList);

        container.appendChild(pokemonElement);
    });
}

function calculateBST(pokemon) {
    return pokemon.hp + pokemon.attack + pokemon.defense +
           pokemon.special_attack + pokemon.special_defense + pokemon.speed;
}

function getTypeCounts(data) {
    return data.reduce((counts, pokemon) => {
        const types = pokemon.type.split('/');
        types.forEach(type => {
            counts[type] = (counts[type] || 0) + 1;
        });
        return counts;
    }, {});
}