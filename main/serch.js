const Api_serch_Movie = 'https://api.themoviedb.org/3/search/movie?';
const Api_key = 'api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f';
const Img_Url ='https://image.tmdb.org/t/p/w500';
const serch = location.hash.slice(1);

async function serchMovie(){
    const res = await fetch(`${Api_serch_Movie}${Api_key}&query=${serch}`);
    const data = await res.json();
    const results = data.results.slice(0,9);
    
    results.forEach(element => {

        const mainContainer = document.getElementById('main-container');

        const movieContainer = document.createElement('div');
        const movieImgContainer = document.createElement('div');
        const img = document.createElement('img')
        const movieDetails = document.createElement('div');
        const titleContainer = document.createElement('div');
        const movieTitle = document.createElement('h2');
        const categorie = document.createElement('p');
        const movieDescription = document.createElement('p');
        const button = document.createElement('button');

        movieContainer.className = 'movie-container';
        movieImgContainer.className = 'movie-img-container';
        movieDetails.className = 'movie-details-container';
        titleContainer.className = 'title-container';
        movieTitle.className = 'movie-title';
        categorie.className= 'categorie';
        movieDescription.className= 'movie-description';
        button.className = 'more';

        img.src = `${Img_Url}${element.poster_path}`;
        
        movieTitle.innerHTML = element.title;
        
        categorie.innerHTML = 'Accion';
        
        movieDescription.innerHTML = element.overview;
        
        
        movieImgContainer.appendChild(img);
        button.append('More');
        
        titleContainer.appendChild(movieTitle);
        titleContainer.appendChild(categorie);
        
        movieDetails.appendChild(titleContainer);
        movieDetails.appendChild(movieDescription);
        movieDetails.appendChild(button);

        movieContainer.appendChild(movieImgContainer);
        movieContainer.appendChild(movieDetails);

        mainContainer.appendChild(movieContainer);
    });
}

serchMovie();
