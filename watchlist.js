document.addEventListener('DOMContentLoaded', function(){
    localStorage.getItem("watchlist");
    function renderMovies(movieArray) {
        var movieHTML = [];
        movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="col-3 card movie">
						<img class="card-img-top poster" src="${currentMovie.Poster}" />
						<h4 class="movieTitle">${currentMovie.Title}</h4>
						<h5 class="releaseDate">${currentMovie.Year}</h5>
						<!--<button class="add")">Add</button>-->
					</div>
            `
        })
        return movieHTML.join("")
    }
    var moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = renderMovies(JSON.parse(localStorage.getItem("watchlist")));
    

});

