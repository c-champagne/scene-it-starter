var returnedMovies;
document.addEventListener('DOMContentLoaded', function(){
    let renderMovies = (movieArray) => {
    //function renderMovies(movieArray) {
        var movieHTML = [];
        movieHTML = movieArray.map(function (currentMovie) {
            if (currentMovie.Poster == "N/A") {
                return `
                <div class="col-3 card movie">
                            <img class="card-img-top poster" src="no_image.png"/>
                            <div class= card-body>
                                <h4 class="movieTitle">${currentMovie.Title}</h4>
                                <h5 class="releaseDate">${currentMovie.Year}</h5>
                                <button class="btn btn-outline-primary btn-lg add" onclick="savheToWatchlist('${currentMovie.imdbID}')">Add</button>
                                <button class="btn btn-outline-danger btn-lg remove" onclick="#">Remove</button>
                            </div>
                 </div>
                `    
            }else {
            return `
            <div class="col-3 card movie">
						<img class="card-img-top poster" src="${currentMovie.Poster}"/>
                        <div class= card-body>
                            <h4 class="movieTitle">${currentMovie.Title}</h4>
						    <h5 class="releaseDate">${currentMovie.Year}</h5>
                            <button class="btn btn-outline-primary btn-lg add" onclick="savegToWatchlist('${currentMovie.imdbID}')">Add</button>
                            <button class="btn btn-outline-danger btn-lg remove" onclick="removeFromWatchlist('${currentMovie.imdbID}')">Remove</button>
                        </div>
             </div>
            `}
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
    let movie = returnedMovies.find(currentMovie => currentMovie.imdbID == imdbID) 
    /* let movie = returnedMovies.find(function (currentMovie){
        return currentMovie.imdbID == imdbID;  
    }) */;
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null) {
        watchlist = [];
    }
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);

}
function removeFromWatchlist(imdbID){
    var movie = returnedMovies.find(function (currentMovie){
        return currentMovie.imdbID == imdbID;  
    });
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null) {
        watchlist = [];
    }
    var removeMovie = watchlist.filter(function(imdbID) {
        return imdbID != movie;
    })
    watchlist = removeMovie;
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);

}