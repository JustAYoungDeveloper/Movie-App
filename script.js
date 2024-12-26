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
            return;
        }

        // Process the movie information
        console.log(data); // Display movie info in the console or on the UI
    } catch (error) {
        console.error('Error fetching movie information:', error);
    }
};

getMovieInfo('');


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
                          <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>`;

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

    // Append movieDiv to the container
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

