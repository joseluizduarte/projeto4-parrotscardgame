let gameOptions = [4,6,8,10,12,14];

function startGame(){
    let numberOfCards;
    do {
        numberOfCards = parseInt(prompt("Quantas cartas você deseja?"));
    } while(!gameOptions.includes(numberOfCards));
    let pageMain = document.querySelector(".pageMain");
    let gifs = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot'];
    gifs.sort(comparador);
    gifs = gifs.slice(0,numberOfCards);
    let cards = gifs.concat(gifs);
    cards = cards.sort(comparador);
    cards.forEach(
        (element) => {
            pageMain.innerHTML += `\
            <div class='card' onclick='girar(this)'>\
                <div class='face frontFace'>\
                    <img class='pageMain__card__image' src='assets/images/front.png' alt=''>\
                </div>\
                <div class='face backFace'>\
                    <img class='pageMain__card__image' src='assets/images/${element}.gif' alt=''>\
                </div>\
            </div>\
            `
        }
    )
}

function comparador() { 
	return Math.random() - 0.5; 
}

function girar(card) {
    
    let frontFace = card.querySelector(".frontFace");
    frontFace.classList.toggle("frontFace--hidden");
    let backFace = card.querySelector(".backFace");
    backFace.classList.toggle("backFace--visible");
    
}

startGame();