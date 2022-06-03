const Api_key = 'e9f1a36d7b4f761f8a4fbf4fe67eb64f';
const Img_Url ='https://image.tmdb.org/t/p/w500';
var serch = location.hash.slice(1);

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers : {'Content-Type': 'aplication/json;charset=utf-8'},
    params:{
        'api_key': Api_key,
    }
});

const callback = (entries, lazyLoader) => {
        entries.forEach (entry => {
            if(entry.isIntersecting){
                const url = entry.target.getAttribute('data-img');
                entry.target.setAttribute('src', url)
            }
            
        }) 
    };

const lazyLoader = new IntersectionObserver(callback);


async function serchMovie(serch){
    const {data} = await api.get(`search/movie?&query=${serch}`)
    const results = data.results;
    const mainContainer = document.getElementById('main-container');
   
    if(results.length === 0){

        console.log('lo sentimos no encontramos coincidencias');

    } else {

        mainContainer.innerHTML = '';

        results.forEach(element => {    
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

            button.setAttribute('class', 'more');
            button.id = element.id
    
            img.setAttribute('data-img', `${Img_Url}${element.poster_path}`);
            img.setAttribute('alt', `${element.title}`)


            img.addEventListener('error', ()=>{
                movieImgContainer.innerHTML = '';

                let div = document.createElement('div');
                let title = document.createElement('p');

                title.innerHTML = element.title;

                div.setAttribute('class', 'img-error');
                div.appendChild(title);

                movieImgContainer.appendChild(div);
            });
            
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

            lazyLoader.observe(img);
            const btn = document.getElementById(button.id);
            btn.addEventListener('click', () => movie(button.id));
        });
    }
}

function movie (id){
    location.href = `/movie.html#${id}`
}

serchMovie(serch);

const serch1 = document.getElementById('serch-container').addEventListener('submit', (e)=>{
    e.preventDefault();
    let newSerch = document.getElementById('serch-input');
    let url = location.hash = newSerch.value;
    serchMovie(url);
})

function back(){
    history.back();
}