const Img_Url ='https://image.tmdb.org/t/p/w500/';
const Api_Key = 'e9f1a36d7b4f761f8a4fbf4fe67eb64f'


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers : {'Content-Type': 'aplication/json;charset=utf-8'},
    params:{
        'api_key': Api_Key,
    }
})

async function trandingMovies (){
    const  {data, status, status_message} = await api.get('trending/movie/day')
    const results = data.results;
    
    const err = document.getElementById("error");
    location.hash = '#home' 

    if(status !== 200){
        console.log(`Error: ${status} ${status_message}`) 
    } else {
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
            
            img.src = Img_Url + posterPath;
            img.className = 'movie-popular-img'; 
            
            aTitle.href = './movie.html';
            aTitle.appendChild(title);
            
            title.className = 'movie-tittle'
            title.innerHTML = MovieTitle;
            
           
            div.appendChild(img)
            div.appendChild(aTitle);
            
            div.addEventListener('click', () =>{
                location.hash = id
            })
           

            trandingContainer.appendChild(div)
           
        });
    }
}

async function trandingTv(){
    const {data} = await api.get('trending/tv/day');
    
    const tvData = data.results;

    tvData.forEach(element => {
        const urlPoster = element.poster_path;
        const container = document.getElementById('test');

        const div = document.createElement('div')
        div.className = 'movie-uncoming-container'
        const img = document.createElement('img');
        img.className = 'movie-uncoming-img'
        img.src = Img_Url + urlPoster;

        div.appendChild(img)

        container.appendChild(div)

    });
}

function serch(){
    const valor = document.getElementById('serch-button');
    const serch = location.hash = valor.value;
    location.href = '/serch.html'+ '#' + serch;
}
