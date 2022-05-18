const Api_Tranding_Movie_Url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'
const Api_Tranding_Tv_Url = 'https://api.themoviedb.org/3/trending/tv/day?api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'
const Api_Categories_List_Url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'
const Api_Movie_Cast = 'https://api.themoviedb.org/3/movie/'
const Img_Url ='https://image.tmdb.org/t/p/w500/';
const Api_Key = 'api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'

const hash = location.hash.slice(1);

async function movieDetails(){
    const res = await fetch(Api_Tranding_Movie_Url);
    const data = await res.json();
    const results = data.results;
    
    const res1 = await fetch(Api_Categories_List_Url);
    const data1 = await res1.json();
    console.log(data1)
    
    const resCast = await fetch(`${Api_Movie_Cast}${hash}/credits?${Api_Key}`);
    const allCrew = await resCast.json();
    const cast = allCrew.cast;
   
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
    
    
    // console.log(cast);

    results.find(item =>{
        if(item.id === parseInt(hash)){
           loadMovieDetails(item)
        }
    });
   
}
movieDetails();

function loadMovieDetails(item){
    // console.log(item)
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
 
}

function favClick(){
    const favButton = document.getElementById('fav');

    if(favButton.className === 'fav'){
        favButton.className = 'fav-click';
    } else {
        favButton.className = 'fav';
    }
};


