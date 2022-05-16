const Api_Tranding_Url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'
const Img_Url ='https://image.tmdb.org/t/p/w500/';
async function trandingMovies (){
    const res = await fetch(Api_Tranding_Url);
    const data = await res.json();
    const results = data.results;

    
    const err = document.getElementById("error");
    
    
    
    if(res.status !== 200){
        err.innerHTML = `Error: ${res.status} ${data.status_message}`
    } else {
        results.forEach(element => {
            const posterPath = element.poster_path;
            const MovieTitle = element.original_title;
            const trandingContainer = document.getElementById('most-pupulra-container');
            const div = document.createElement('div');
            const aImg = document.createElement('a');
            const img = document.createElement('img');
            const aTitle = document.createElement('a');
            const title = document.createElement('h2');

            
            div.className = 'movie-popular-container';
            
            aImg.href = './movie.html';

            img.src = Img_Url + posterPath;
            img.className = 'movie-popular-img';

            aImg.appendChild(img);

            aTitle.href = './movie.html';
            aTitle.appendChild(title);

            title.className = 'movie-tittle'
            title.innerHTML = MovieTitle;

            div.appendChild(aImg);
            div.appendChild(aTitle);

            trandingContainer.appendChild(div)
        });
        console.log(data);
    }
   
}

trandingMovies();