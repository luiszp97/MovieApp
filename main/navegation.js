window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);



function navigator(){
    if(location.hash.startsWith('#home')){
        trandingMovies();
        trandingTv();
    } else{
        location.hash = '#home'
    }
}

