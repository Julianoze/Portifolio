	// Fecha o reveal
reveal.addEventListener("click", () => {
	animacao._body.classList.remove = "is-reveal-open"
	animacao._div[0].style = "display:none;"
	animacao._reveal[0].style = "top: 187px; display: none;"
	animacao.ligar()
})
