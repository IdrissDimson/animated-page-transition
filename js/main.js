const button = document.querySelector('.btn');
const loadingBar = document.querySelector('.loading-bar');
const body = document.getElementsByTagName('body')[0];
const html = document.getElementsByTagName('html')[0];
const text = document.getElementById("hi");

let isAnimating = false;
let newLocation = '';
let firstLoad = false;

function changePage(url, bool) {
    isAnimating = true;
    
    body.classList.add('page-is-changing');
    loadingBar.addEventListener('transitionend', function(){
        loadNewContent(url, bool);
        newLocation = url;
    });
    //if browser doesn't support CSS transitions
    if(!transitionsSupported()) {
        loadNewContent(url, bool);
        newLocation = url;
    }
}
window.addEventListener('popstate', function(){
    if (firstLoad) {
    /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded 
    */
    let newPageArray = location.pathname.split('/'),
        //this is the url of the page to be loaded 
        newPage = newPageArray[newPageArray.length - 1];
    if(!isAnimating  &&  newLocation != newPage) {changePage(newPage, false);}
    firstLoad = true;
    }
});
function loadNewContent(url, bool){
    url = ('' === url) ? 'index.html' : url;
    let newSection = url.replace('.html', '');
    let section = '<section class="main-content ' + newSection + '"></section>';
    let section2 = document.querySelector('.main-content.' + newSection + '');
    fetch(url+'#hi')
        .then(response => response.text())
        .then(event => {
//            document.getElementsByTagName('main')[0].innerHTML = section;
//            //if browser doesn't support CSS transitions - dont wait for the end of transitions
//            let delay = ( transitionsSupported() ) ? 1200 : 0;
//            setTimeout(function(){
//                if (section2.classList.contains('about')){
//                    body.classList.add('about')
//                } else{
//                    body.classList.remove('about');
//                }
//                body.classList.remove('page-is-changing');
//                
//                loadingBar.addEventListener('transitionend', function(){
//                    isAnimating = false;
//                });
//                
//            if( !transitionsSupported() ) {isAnimating = false;}
//            }, delay);
//            
//            if(url != window.location && bool){
//                //add the new page to the window.history
//                //if the new page was triggered by a 'popstate' event, don't add it
//                window.history.pushState({path: url}, '', url);
//            }
            console.log(event);
        })
}

function transitionsSupported() {
    return html.classList.contains('csstransitions');
}

button.addEventListener('click', function(event){
    event.preventDefault();
    let newPage = this.getAttribute('href');
    if(!isAnimating){changePage(newPage, true)};
    firstLoad = true;
});