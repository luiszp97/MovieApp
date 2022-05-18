function favClick(){
    const favButton = document.getElementById('fav');

    if(favButton.className === 'fav'){
        favButton.className = 'fav-click';
    } else {
        favButton.className = 'fav';
    }
};

function movieDetails(id) {
    console.log(id)
}
