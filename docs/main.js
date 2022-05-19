const Api_Tranding_Movie_Url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'
const Api_Tranding_Tv_Url = 'https://api.themoviedb.org/3/trending/tv/day?api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f'
const Img_Url ='https://image.tmdb.org/t/p/w500/';


async function trandingMovies (){
    const res = await fetch(Api_Tranding_Movie_Url);
    const data = await res.json();
    const results = data.results;

    const err = document.getElementById("error");
    location.hash = '#Home' 

    if(res.status !== 200){
        err.innerHTML = `Error: ${res.status} ${data.status_message}`
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
            
            // aImg.href = './movie.html';
            
            img.src = Img_Url + posterPath;
            img.className = 'movie-popular-img';
            // img.addEventListener('click', validacion(id))
            
            
            // aImg.appendChild(img);
            
            aTitle.href = './movie.html';
            aTitle.appendChild(title);
            
            title.className = 'movie-tittle'
            title.innerHTML = MovieTitle;
            
            // div.appendChild(aImg);
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
    const res = await fetch(Api_Tranding_Tv_Url);
    const data = await res.json();
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
    location.href = '/MovieApp/serch.html'+ '#' + serch;
}
