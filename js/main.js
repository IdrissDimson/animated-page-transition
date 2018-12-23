let isAnimating = false;
let newLocation = '';
let firstLoad = false;

const button = document.querySelector('.btn');
const loadingBar = document.querySelector('.loading-bar');
const body = document.getElementsByTagName('body');

const changePage = (url, bool) => {
    isAnimating = true;
    
    body.classList.add('page-is-changing');
    loadingBar.addEventListener('transitionend', function(){
        loadNewContent(url, bool);
        newLocation = url;
    });
    //if browser doesn't support CSS transitions
    if( !transitionsSupported() ) {
        loadNewContent(url, bool);
        newLocation = url;
    }
}
const loadNewContent = (url, bool) => {
    url = ('' == url) ? 'index.html' : url;
    let newSection = url.replace('.html', '');
    let section = '<section class="main-content '+newSection+'"></section>';
    
    fetch(url+'.main-content > *')
        .then(response => response.text())
        .then(event => {
            document.getElementsByTagName('main').innerHTML = section;
            //if browser doesn't support CSS transitions - dont wait for the end of transitions
            let delay = ( transitionsSupported() ) ? 1200 : 0;
            setTimeout(function(){
                ( section.classList.contains('about') )  ? body.classList.add('about') : body.classList.remove('about');
                body.classList.remove('page-is-changing');
                loadingBar.addEventListener('transitionend', function(){
                    isAnimating = false;
                });
            if( !transitionsSupported() ) {isAnimating = false;}
            });
            
            if(url!=window.location && bool){
                //add the new page to the window.history
                //if the new page was triggered by a 'popstate' event, don't add it
                window.history.pushState({path: url},'',url);
            }
        })
}

function smoothAni(event){
    event.preventDefault();
    //detect which page has been selected
    const newPage = this.getAttribute('href');
    if( !isAnimating ) changePage(newPage, true);
    firstLoad = true;
}

function transitionsSupported() {
    return document.classList.contains('csstransitions');
}

button.addEventListener('click', smoothAni(event));