var returnedMovies;
document.addEventListener('DOMContentLoaded', function(){
    function renderMovies(movieArray) {
        var movieHTML = [];
        movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="col-3 card movie">
						<img class="card-img-top poster" src="${currentMovie.Poster}"/>
                        <div class= card-body>
                            <h4 class="movieTitle">${currentMovie.Title}</h4>
						    <h5 class="releaseDate">${currentMovie.Year}</h5>
						    <button class="btn btn-outline-primary btn-lg add" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
                        </div>
             </div>
            `
        })
        return movieHTML.join("")
    }

    var moviesContainer = document.getElementById("movies-container");
    document.getElementById("search-form").addEventListener("submit", function(e){
        e.preventDefault();
        var searchString = document.getElementById("search-bar").value;
        var urlEncodedSearchString = encodeURIComponent(searchString);
        axios.get("http://www.omdbapi.com/?apikey=84596469&s=" + urlEncodedSearchString).then(function(response) {
            console.log(response.data);
            returnedMovies = response.data.Search;
            moviesContainer.innerHTML = renderMovies(response.data.Search);
            
        });
    })

    
    
});


function saveToWatchlist(imdbID){
    var movie = returnedMovies.find(function (currentMovie){
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
