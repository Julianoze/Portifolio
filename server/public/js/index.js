let botao = document.getElementById("botao")

botao1.addEventListener("click", () => {
    location.href = "/jogo"
})

botao1.addEventListener("mouseenter", () => {
    botao1.innerHTML = "<spam> ►</spam> JOGAR"
})

botao2.addEventListener("mouseenter", () => {
    botao2.innerHTML = "<spam> ►</spam> COMO JOGAR"
})

botao3.addEventListener("mouseenter", () => {
    botao3.innerHTML = "<spam> ►</spam> SOBRE"
})

botao1.addEventListener("mouseleave", () => {
    botao1.innerHTML = "JOGAR"
})

botao2.addEventListener("mouseleave", () => {
    botao2.innerHTML = "COMO JOGAR"
})

botao3.addEventListener("mouseleave", () => {
    botao3.innerHTML = "SOBRE"
})