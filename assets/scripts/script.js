let contadorJogada = 0;
let carta1;
let carta2;
let cartasEscondidas;
let cronometro;
let tempo = 0;

function perguntarNumeroDeCartas(){
    let opcoesCartas = [4,6,8,10,12,14];
    let numeroCartas;
    do {
        numeroCartas = parseInt(prompt("Quantas cartas você deseja?"));
    } while(!opcoesCartas.includes(numeroCartas));
    return numeroCartas;
}

function sortearImagens(numeroImagens) {
    let gifs = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot'];
    gifs.sort(comparador);
    let imagens = gifs.slice(0,numeroImagens);
    return imagens
}

function embaralharCartas(imagens) {
    let cartas = [];
    imagens.forEach((imagem)=>{
        cartas.push(`${imagem}1`);
        cartas.push(`${imagem}2`);
    });
    cartas = cartas.sort(comparador);
    return cartas;
}

function distribuirCarta(carta) {
    let nomeImagem = carta.substring(0,carta.length-1);
    let pageMain = document.querySelector(".pageMain");
    pageMain.innerHTML += `<div class='card' id='${carta}' data-identifier='card'>
                                <div class='face frontFace' data-identifier='front-face'>
                                    <img class='pageMain__card__image' src='assets/images/front.png' alt=''>
                                </div>
                                <div class='face backFace' data-identifier='back-face'>
                                    <img class='pageMain__card__image' src='assets/images/${nomeImagem}.gif' alt=''>
                                </div>
                            </div>`
}

function adicionarEventListener(carta) {
    let elementoCarta = document.querySelector(`#${carta}`);
    elementoCarta.addEventListener("click", fazerJogada);
}

function removerEventListener(carta) {
    let elementoCarta = document.querySelector(`#${carta}`);
    elementoCarta.removeEventListener("click", fazerJogada);
}

function girarCarta(elementoCarta) {
    let frontFace = elementoCarta.querySelector(".frontFace");
    frontFace.classList.toggle("frontFace--hidden");
    let backFace = elementoCarta.querySelector(".backFace");
    backFace.classList.toggle("backFace--visible");    
}

function removerCarta(cartaID) {
    return cartasEscondidas.filter((element)=>{return element!==cartaID});
}

function esconderCartas(){
    let elementoCarta1 = document.querySelector(`#${carta1}`);
    let elementoCarta2 = document.querySelector(`#${carta2}`);
    girarCarta(elementoCarta1);
    girarCarta(elementoCarta2);
    carta1 = '';
    carta2 = '';
    cartasEscondidas.forEach(adicionarEventListener);
}

function compararCartas(){
    carta1Imagem = carta1.substring(0, carta1.length-1);
    carta2Imagem = carta2.substring(0, carta2.length-1);
    if (carta1Imagem===carta2Imagem) {
        cartasEscondidas = removerCarta(carta1);
        cartasEscondidas = removerCarta(carta2);
        cartasEscondidas.forEach(adicionarEventListener);
    } else {
        setTimeout(esconderCartas, 1000);
    }
}

function reiniciarJogo() {
    let resposta = prompt("Deseja iniciar outra partida?");
    if (resposta === 'Sim' || resposta === 'sim') {
        iniciarPartida();
    }
}

function verificarFimDeJogo() {
    if (cartasEscondidas.length===0) {
        alert(`Você ganhou com ${contadorJogada} jogadas em ${tempo} segundos`);
        clearInterval(cronometro);
        reiniciarJogo();
    }
}

function fazerJogada(event){
    contadorJogada++;
    let elementoCarta = event.currentTarget;
    girarCarta(elementoCarta);
    if (contadorJogada%2!==0){
        elementoCarta.removeEventListener("click", fazerJogada);
        carta1 = elementoCarta.id;
    } else {
        cartasEscondidas.forEach(removerEventListener);
        carta2 = elementoCarta.id;
        compararCartas();
        verificarFimDeJogo();
    }
}

function atualizarCronometro() {
    let elementoCronometro = document.querySelector(".pageHeader__cronometro");
    tempo++;
    elementoCronometro.innerHTML = `${tempo}`;
}

function iniciarPartida(){
    // let numeroCartas = perguntarNumeroDeCartas();
    let numeroCartas =4;
    cronometro = setInterval(atualizarCronometro, 1000);
    let imagens = sortearImagens(numeroCartas/2);
    cartasEscondidas = embaralharCartas(imagens);
    document.querySelector(".pageMain").innerHTML="";
    cartasEscondidas.forEach(distribuirCarta);
    cartasEscondidas.forEach(adicionarEventListener);
}

function comparador() { 
	return Math.random() - 0.5; 
}

iniciarPartida();