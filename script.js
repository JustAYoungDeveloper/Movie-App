const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to acquire movie info through API
const getMovieInfo = async (movie) =>{
    const myApiKey = "705c0f44"
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`
    const response = await fetch(url);
    const data = await response.json()

    showMovieInfo(data)
}

// Function to show movie info
const showMovieData = (data) => {
    moviecontainer.innerHTML = '';
    const {Title, Year, Rated, Released, Runtime, Genre, imdbRating, Actors, Plot, Country, Poster, Ratings} = data
    const movieDiv = document.createElement('div')
    movieDiv.classList.add('movie-info');
    movieDiv.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    const GenreDiv = document.createElement('div');
    GenreDiv.classList.add('movie-genre');

    GenreDiv.split(',').forEach(genre => {
        const genreP = document.createElement('p');
        genreP.innerText = genre
        GenreDiv.appendChild(genreP);
    });
    movieDiv.appendChild(GenreDiv);

    movieDiv.innerHTML += `<p><strong>Release date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Actors: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;
    moviecontainer.appendChild(movieDiv);
}

// Adding Eventlistener to form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = inputBox.value.trim();
    if (searchTerm !== '') {
        getMovieInfo(searchTerm);
    }
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`);
});
