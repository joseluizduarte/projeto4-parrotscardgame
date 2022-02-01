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
            pageMain.innerHTML += `<div class='pageMain__card'><img class='pageMain__card__image' src='assets/images/${element}.gif' alt=''></div>`
        }
    )
}

function comparador() { 
	return Math.random() - 0.5; 
}

startGame();