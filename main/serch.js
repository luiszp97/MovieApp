const Api_serch_Movie = 'https://api.themoviedb.org/3/search/movie?';
const Api_key = 'api_key=e9f1a36d7b4f761f8a4fbf4fe67eb64f';

const serch = location.hash.slice(1);

async function serchMovie(){
    const res = await fetch(`${Api_serch_Movie}${Api_key}&query=${serch}`);
    const data = await res.json();
    console.log(data);
}
serchMovie()