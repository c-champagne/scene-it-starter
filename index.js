document.addEventListener('DOMContentLoaded', function(){
    function renderMovies(movieArray) {
        var movieHTML = [];
        movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="col-3 card movie">
						<img class="card-img-top poster" src="${currentMovie.Poster}"/>
						<h4 class="movieTitle">${currentMovie.Title}</h4>
						<h5 class="releaseDate">${currentMovie.Year}</h5>
						<button class="add" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
			</div>
            `
        })
        return movieHTML.join("")
    }

    var moviesContainer = document.getElementById("movies-container");
    document.getElementById("search-form").addEventListener("submit", function(e){
        e.preventDefault();
        moviesContainer.innerHTML = renderMovies(movieData);
    })

    
    
});
function saveToWatchlist(imdbID){
    var movie = movieData.find(function (currentMovie){
        return currentMovie.imdbID == imdbID;  
    });
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null) {
        watchlist = [];
    }
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);

}