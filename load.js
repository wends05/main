const button = document.querySelectorAll('button');



function loadingPageOpen() {
    document.location = '/pages/gameStartPage.htm'
}  

function mazeCraze() {
    window.open('/pages/voicecontrolledmaze/index.html', '_blank');   
    loadingPageOpen()
}


function jankenspeech() {
    window.open('/pages/jankenspeech/jankenspeech.html', '');
    loadingPageOpen()
}

function jankenpy() {

    loadingPageOpen();
}