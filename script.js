const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch the movie data
const getMovieInfo = async (movie) => {
    try {
    const apiKey = "705c0f44"
    const url = `https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to fetch the movie data.');
    }
    const data = await response.json();
    showMovieData(data);
    }     
    catch (error) {
        showErrorMessage('Movie not found');    
    }

}
// Show the movie data
const showMovieData = (data) => {

    moviecontainer.innerHTML = '';
    moviecontainer.classList.remove('noBackground');
    // Destructure the data object to get the required data
    const { Title, Year, imdbRating, Genre, Runtime, Director, Actors, Plot, Poster, Released } = data;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title} (${Year})</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(',').forEach(element => {
        const p = document.createElement('p');
        p.innerText= element;
        movieGenreElement.appendChild(p);
    })
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `
                          <p><strong>Release Date:</strong> ${Released}</p>
                          <p><strong>Duration: ${Runtime}</strong></p>
                          <p><strong>Plot:</strong> ${Plot}</p>
                          <p><strong>Actors:</strong> ${Actors}</p>
                          `;
// Create a div element to display the movie poster
    const moviePosterElemnt = document.createElement('div');
    moviePosterElemnt.classList.add('movie-poster');
    moviePosterElemnt.innerHTML = `<img src="${Poster}">`;
    moviecontainer.appendChild(moviePosterElemnt);
    moviecontainer.appendChild(movieElement);
}

// Function to display error message
const showErrorMessage = (message) => {
    moviecontainer.innerHTML = `<h2>${message}</h2>`;
    moviecontainer.classList.add('noBackground');
}
// Function to handle the form submission
const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log(inputBox.value);
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage('Fetching the movie data...');
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage('Please enter a movie name.');
    }
}

//  Add event listener to the movie container
searchForm.addEventListener('submit', handleFormSubmission);
