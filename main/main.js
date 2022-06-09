const Img_Url ='https://image.tmdb.org/t/p/w500';
const Api_Key = 'e9f1a36d7b4f761f8a4fbf4fe67eb64f'


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers : {'Content-Type': 'aplication/json;charset=utf-8'},
    params:{
        'api_key': Api_Key,
    }
})

const options = {
    root: document.getElementById('most-popular-main-container'),
};
const options1 = {
    root: document.getElementById('movie-uncoming-main-container'),
};

const callback = (entries, lazyLoader) => {
        entries.forEach (entry => {
            if(entry.isIntersecting){
                const url = entry.target.getAttribute('data-img');
                entry.target.setAttribute('src', url)
            }
            
        }) 
    }

const lazyLoaderTranding = new IntersectionObserver(callback, options);
const lazyLoaderTv = new IntersectionObserver(callback, options1)

async function trandingMovies (){
    const  {data, status, status_message} = await api.get('trending/movie/day')
    const results = data.results;
    const container = document.getElementById('most-pupulra-container')

    location.hash = '#home' 

    if(status !== 200){
        console.log(`Error: ${status} ${status_message}`) 
    } else {
        container.innerHTML = '';
        results.forEach(element => {
            const posterPath = element.poster_path;
            const MovieTitle = element.original_title;
            const id = element.id

            const trandingContainer = document.getElementById('most-pupulra-container');
            const div = document.createElement('div');
            // const aImg = document.createElement('a');
            const img = document.createElement('img');
            const aTitle = document.createElement('a');
            const title = document.createElement('h2');
            
            div.className = 'movie-popular-container';
            div.id = id;
            
            img.setAttribute('alt', MovieTitle);
            img.setAttribute('data-img', `${Img_Url}${posterPath}`);
            img.onclick = () => serchTranding(id);
            img.className = 'movie-popular-img'; 
            
            aTitle.appendChild(title);
            
            title.className = 'movie-tittle'
            title.innerHTML = MovieTitle;
            
           
            div.appendChild(img)
            div.appendChild(aTitle);
            
            div.addEventListener('click', () =>{
                location.hash = id    
            })
           
            lazyLoaderTranding.observe(img);

            trandingContainer.appendChild(div)
           
        });
    }
}

async function trandingTv(){
    const {data} = await api.get('trending/tv/day');
    const container = document.getElementById('test')
    
    const tvData = data.results;
    container.innerHTML = '';
    tvData.forEach(element => {
        const urlPoster = element.poster_path;
        const container = document.getElementById('test');

        const div = document.createElement('div')
        div.className = 'movie-uncoming-container'
        const img = document.createElement('img');
        img.className = 'movie-uncoming-img'
        img.setAttribute('data-img', `${Img_Url}${urlPoster}`);
        img.setAttribute('alt', element.name)

        div.appendChild(img)

        lazyLoaderTv.observe(img);

        container.appendChild(div)

    });
}

async function movieCategorie(){
    const {data} = await api.get('genre/movie/list');
        console.log(data)
        data.genres.forEach(element =>{
            console.log(element)
            const categorie = document.getElementById("categori-list-container");
            const categorie1 = document.createElement('a');
            categorie1.className = 'name-category';
            categorie1.setAttribute('href', `./categories.html#${element.id}`)
            categorie1.innerHTML = element.name

            categorie.appendChild(categorie1);
        })
};

const serchInput = document.getElementById('serch-container').addEventListener('submit', (e)=>{
    e.preventDefault();
    const valor = document.getElementById('serch-input');
    const serchh = location.hash = valor.value;
    location.href = '/MovieApp/serch.html'+ '#' + serchh;
})



function serchTranding(id){
    location.href = `/MovieApp/movie.html#${id}`;
}

movieCategorie();
