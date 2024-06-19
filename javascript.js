const API_KEY  = "bb40644150154f4ba55faba3110a99d0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=>fetchnews("India"));

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardscontainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone, article){
    const newsImg = cardclone.querySelector('#news-img');
    const newsTittle = cardclone.querySelector('#news-tittle');
    const newsource = cardclone.querySelector('#news-source');
    const newsdesc = cardclone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTittle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsource.innerHTML = `${article.source.name} . ${date} `;

    cardclone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");   //_blanck means things will open in new tab

    })

}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-Text');

searchButton.addEventListener('click',() => {
    const  query = searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})