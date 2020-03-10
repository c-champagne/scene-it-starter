document.addEventListener('DOMContentLoaded', function(){
    localStorage.getItem("watchlist");
    function renderMovies(movieArray) {
        var movieHTML = [];
        movieHTML = movieArray.map(function (currentMovie) {
            if (currentMovie.Poster == "N/A") {
                return `
                <div class="col-3 card movie">
                            <img class="card-img-top poster" src="no_image.png"/>
                            <div class= card-body>
                                <h4 class="movieTitle">${currentMovie.Title}</h4>
                                <h5 class="releaseDate">${currentMovie.Year}</h5>
                                <button class="btn btn-outline-primary btn-lg add" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
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
						    <button class="btn btn-outline-primary btn-lg add" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
                        </div>
             </div>
            `}
        })
        return movieHTML.join("")
    }
    var moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = renderMovies(JSON.parse(localStorage.getItem("watchlist")));
    

});

