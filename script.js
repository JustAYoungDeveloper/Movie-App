const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to acquire movie info through API
const getMovieInfo = async (movie) => {
    if (!movie || typeof movie !== 'string') {
        console.error('Invalid movie name provided');
        return;
    }

    const myApiKey = "705c0f44";
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "False") {
            console.error('Movie not found:', data.Error);
            document.getElementById('movie-details').innerHTML = `<p>${data.Error}</p>`;
            return;
        }

        const movieDetails = `
            <img src="${data.Poster}" alt="${data.Title}" />
            <h3>${data.Title} (${data.Year})</h3>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Country:</strong> ${data.Country}</p>
            <p><strong>Rating:</strong> ${data.imdbRating}</p>
            `;
        document.getElementById('movie-details').innerHTML = movieDetails;
    } catch (error) {
        console.error('Error fetching movie information:', error);
        document.getElementById('movie-details').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
};

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const movie = document.querySelector('.inputBox').value.trim();
    if (movie) {
        getMovieInfo(movie);
    } else {
        document.getElementById('movie-details').innerHTML = `<p>Please enter a movie name.</p>`;
    }
});



// Function to show movie info
const showMovieData = (data) => {
    // Ensure moviecontainer is defined and refers to a valid DOM element
    if (!moviecontainer) {
        console.error("moviecontainer is not defined or is null");
        return;
    }

    moviecontainer.innerHTML = ''; // Clear existing content

    // Destructure the data object
    const { Title, Year, Rated, Released, Runtime, Genre, imdbRating, Actors, Plot, Country, Poster, Ratings } = data;

    // Create movie info container
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-info');
    movieDiv.innerHTML = `<h2>${Title}</h2>
                          `;

    // Create genre container
    const GenreDiv = document.createElement('div');
    GenreDiv.classList.add('movie-genre');

    // Split the genre string and create individual genre elements
    Genre.split(',').forEach(genre => {
        const genreP = document.createElement('p');
        genreP.innerText = genre.trim(); // Trim to remove any extra spaces
        GenreDiv.appendChild(genreP);
    });

    // Append GenreDiv to movieDiv
    movieDiv.appendChild(GenreDiv);

    // Add other movie details
    movieDiv.innerHTML += `<p><strong>Release date: </strong>${Released}</p>
                           <p><strong>Duration: </strong>${Runtime}</p>
                           <p><strong>Actors: </strong>${Actors}</p>
                           <p><strong>Plot: </strong>${Plot}</p>`;

    // Create A Div For A Movie Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" />`;

    // Append movieDiv to the container
    moviecontainer.appendChild(moviePosterElement);
    moviecontainer.appendChild(movieDiv);
};

// Adding Event Listener to form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form reload

    // Ensure inputBox is defined
    const inputBox = document.querySelector('.inputBox'); // Replace with the correct selector
    const searchTerm = inputBox.value.trim(); // Get and trim input value

    if (searchTerm !== '') {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Convert response to JSON
            console.log(data); // Log or process data
            getMovieInfo(searchTerm); // Call additional function if needed
        } catch (error) {
            console.error('Fetch error:', error);
        }
    } else {
        console.log('Search term is empty!');
    }
});

