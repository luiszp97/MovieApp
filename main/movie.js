const Img_Url ='https://image.tmdb.org/t/p/w500/';
const Api_Key = 'e9f1a36d7b4f761f8a4fbf4fe67eb64f'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers : {'Content-Type': 'aplication/json;charset=utf-8'},
    params:{
        'api_key': Api_Key,
    }
});

const options = {
    root: document.getElementById('cast-movie-container'),
};

const callback = (entries, lazyLoader) => {
        entries.forEach (entry => {
            if(entry.isIntersecting){
                const url = entry.target.getAttribute('data-img');
                entry.target.setAttribute('src', url)
            }
            
        }) 
    };

const lazyLoader = new IntersectionObserver(callback, options);

const hash = location.hash.slice(1);

async function movieDetails(){
    const {status, data} = await api.get(`/movie/${hash}`);

    const posterPath = data.poster_path
    const img = document.getElementById('movie-img');
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');
    const pg = document.getElementById('pg');
    const imdb = document.getElementById('imdb');
    const descriptionContainer = document.getElementById('description-movie-container');
    const movieDescription = document.getElementById('movie-description');
    const categorieContainer = document.getElementById('categorie-container');
    

    img.src = Img_Url + posterPath;
    img.setAttribute('alt', `${data.original_title}`)

    title.innerHTML = data.original_title;

    subtitle.innerHTML = data.original_title;

    imdb.innerHTML = `IMdb ${data.vote_average}`;

    movieDescription.innerHTML = data.overview;


    if(img.src.startsWith('https')){
        img.className = 'movie-img';
        title.className = 'main-title';
        categorieContainer.className = 'categorie-container';
        pg.className = 'pg';
        imdb.className = 'imdb';
        descriptionContainer.className = 'description-movie-container';
    };

    
   
};

// function loadMovieDetails(item){
    
// };

async function movieCategorie(){
    const {data} = await api.get('genre/movie/list');
    const genresFilter = data.genres.slice(0,2);

        genresFilter.forEach(element =>{
            const categorie = document.getElementById("categirie-movie");
            const categorie1 = document.createElement('p');
            categorie1.className = 'categorie';
            categorie1.innerHTML = element.name

            categorie.appendChild(categorie1);
        })
};

async function movieCast(){
    const {data} = await api.get(`movie/${hash}/credits`)
    const cast = data.cast;
    const castFirst = cast.slice(0,10)
    const mainContainer = document.getElementById('cast-movie-container');
    mainContainer.innerHTML = '';  
    castFirst.forEach(element => {
        
        const container = document.createElement('div');
        const div = document.createElement('div');
        const imgActor = document.createElement('img');
        const actorName = document.createElement('h2');
        const actorcharacter = document.createElement('p');

        container.className = 'actor-img-container';

        div.className = 'actor-container';

        imgActor.setAttribute('data-img', `${Img_Url}${element.profile_path}`); 
        imgActor.setAttribute('alt', `${element.name}`)

        actorName.className = 'actor-name'
        actorName.innerHTML = element.name;
        
        actorcharacter.className = 'actor-papel';
        actorcharacter.innerHTML = element.character;

        div.appendChild(imgActor);

        container.appendChild(div);
        container.appendChild(actorName);
        container.appendChild(actorcharacter);

        lazyLoader.observe(imgActor);
        mainContainer.appendChild(container);
    });
};

function favClick(){
    const favButton = document.getElementById('fav');

    if(favButton.className === 'fav'){
        favButton.className = 'fav-click';
    } else {
        favButton.className = 'fav';
    }
};

async function prueba(){
    const {data} = await api.get('/genre/movie/list');
}

movieDetails();
movieCategorie();
movieCast();
prueba()


