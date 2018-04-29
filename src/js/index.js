let jogar = new Audio()
let index = new Audio()
let botao = document.getElementById("botao")

jogar.src = "src/sound/start.mp3"
jogar.volume = 0.5
jogar.load()

index.src = "src/sound/index.mp3"
index.volume = 0.5
index.load()


botao1.addEventListener("click", () => {
    jogar.play()
    jogar.addEventListener("ended", () => {
        location.href = "fatecinvaders.html"
    })
})

botao1.addEventListener("mouseenter", () => {
    index.play()
    botao1.innerHTML = "<spam> ►</spam> JOGAR"
})

botao2.addEventListener("mouseenter", () => {
    index.play()
    botao2.innerHTML = "<spam> ►</spam> COMO JOGAR"
})

botao3.addEventListener("mouseenter", () => {
    index.play()
    botao3.innerHTML = "<spam> ►</spam> SOBRE"
})


botao1.addEventListener("mouseleave", () => {
    index.play()
    botao1.innerHTML = "JOGAR"
})

botao2.addEventListener("mouseleave", () => {
    index.play()
    botao2.innerHTML = "COMO JOGAR"
})

botao3.addEventListener("mouseleave", () => {
    index.play()
    botao3.innerHTML = "SOBRE"
})