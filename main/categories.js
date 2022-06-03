const Img_Url ='https://image.tmdb.org/t/p/w500';
const Api_Key = 'e9f1a36d7b4f761f8a4fbf4fe67eb64f'
var y = location.hash.slice(1);

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers : {'Content-Type': 'aplication/json;charset=utf-8'},
    params:{
        'api_key': Api_Key,
    }
})

const callback = (entries, lazyLoader) => {
    
        entries.forEach (entry => {
            
            if(entry.isIntersecting){
                const url = entry.target.getAttribute('data-img');
                entry.target.setAttribute('src', url)
            }
            
        }) 
    };

const lazyLoader = new IntersectionObserver(callback);

window.addEventListener('hashchange', movieCategorie, false);
window.addEventListener('hashchange', filterMovie, false);


function back(){
    history.back()
}

async function movieCategorie(){
    
    const id = location.hash.slice(1);
    const {data} = await api.get('genre/movie/list');
    const categorie = document.getElementById("categories-container");

    const nameCategorie = document.getElementById('categorie-title');
    categorie.innerHTML = '';
    nameCategorie.innerHTML = '';
        
        data.genres.forEach(element =>{
            const categorie1 = document.createElement('a');
            categorie1.className = 'categorie';
            categorie1.setAttribute('href', `/categories.html#${element.id}`)
            categorie1.innerHTML = element.name

            categorie.appendChild(categorie1);
        })
        
        const actualCategorie = data.genres.find(element => element.id == id);
        nameCategorie.innerHTML = actualCategorie.name;
};


async function filterMovie (){
    const id = location.hash.slice(1)
    const {data} = await api.get(`/discover/movie?with_genres=${id}`)
    const container = document.getElementById('movies-main-container');
    container.innerHTML = '';
    data.results.forEach(element => {
        
        const div = document.createElement('div');
        const img = document.createElement('img');

        div.setAttribute('class', 'movie-container');
        div.setAttribute('onclick', `movieInfo(${element.id})`)

        img.setAttribute('data-img', `${Img_Url}${element.poster_path}`);
        img.setAttribute('alt', element.title);

        div.appendChild(img);

        container.appendChild(div)

        lazyLoader.observe(img)
    })
};

function movieInfo(id){
    location.href = `/movie.html#${id}`
}
movieCategorie();
filterMovie();