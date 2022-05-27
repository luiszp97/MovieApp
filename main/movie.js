const Img_Url ='https://image.tmdb.org/t/p/w500/';
const Api_Key = 'e9f1a36d7b4f761f8a4fbf4fe67eb64f'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers : {'Content-Type': 'aplication/json;charset=utf-8'},
    params:{
        'api_key': Api_Key,
    }
})

const hash = location.hash.slice(1);

async function movieDetails(){
    const {status, data} = await api.get('trending/movie/day');
    const results = data.results;

    // const data = await res.json();
    
    results.find(item =>{
        if(item.id === parseInt(hash)){
           loadMovieDetails(item)
        }
    });
   
};

function loadMovieDetails(item){

    const posterPath = item.poster_path
    const img = document.getElementById('movie-img');
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');
    const imdb = document.getElementById('imdb');
    const movieDescription = document.getElementById('movie-description');

    img.src = Img_Url + posterPath;
    title.innerHTML = item.original_title;
    subtitle.innerHTML = item.title;
    imdb.innerHTML = `IMdb ${item.vote_average}`;
    movieDescription.innerHTML = item.overview
    
};

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

    castFirst.forEach(element => {
        
        const mainContainer = document.getElementById('cast-movie-container');
        const container = document.createElement('div');
        const div = document.createElement('div');
        const imgActor = document.createElement('img');
        const actorName = document.createElement('h2');
        const actorcharacter = document.createElement('p');

        container.className = 'actor-img-container';

        div.className = 'actor-container';

        imgActor.src = `${Img_Url}${element.profile_path}`

        actorName.className = 'actor-name'
        actorName.innerHTML = element.name;
        
        actorcharacter.className = 'actor-papel';
        actorcharacter.innerHTML = element.character;

        div.appendChild(imgActor);

        container.appendChild(div);
        container.appendChild(actorName);
        container.appendChild(actorcharacter);

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
    console.log(data);
}

movieDetails();
movieCategorie();
movieCast();
prueba()


