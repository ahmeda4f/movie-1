

const API_KEY = 'api_key=0d6686b36a1c3392721b80e2cc5f4fcb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById("main")
const forms = document.getElementById("form")
const search = document.getElementById("search")
const title = document.getElementById("title")




function getMovies(url) {
    lastUrl = url;
      fetch(url).then(res => res.json()).then(data => {
          console.log(data.results)
          showMovies(data.results)


        })
    }
getMovies(API_URL);



function showMovies(data){

  main.innerHTML='';

  data.forEach(movie=>{
    const {title,poster_path,overview,vote_average}=movie;

   const movieEl= document.createElement('div');
   movieEl.classList.add("movie")
   movieEl.innerHTML=`
   <img src="${IMG_URL+poster_path}" alt="${title}">
   <div class="movie-info">
     <h3>${title}</h3>
     <span class="${getColor(vote_average)}">${vote_average}</span>
   
   </div>
   <div class="overview">
   ${overview}
   </div>

   `
main.appendChild(movieEl)
  })
  

}
function getColor(vote){
  if(vote>=8)
  return "green";

  else if(vote>=6)
  return"orange"

  else
  return "red"
}
 forms.addEventListener("submit",function(e){
  e.preventDefault()
  const searchTerm= search.value

if(searchTerm){
  getMovies(searchURL+`&query=` + searchTerm)
}
else{
  getMovies(API_URL);
}

})
title.addEventListener("click",function(e){
location.reload()
})
