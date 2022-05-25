window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);



function navigator(){
    if(location.hash.startsWith('#Home')){
        trandingMovies();
        trandingTv();
    } else if(parseInt(location.hash.slice(1))){
        location.href = '/movie.html' + location.hash;
    } else{
        location.hash = '#Home'
    }
}

