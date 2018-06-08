window.onload = () => {
    // Declaração da classe
	let animacao = new Animacao()
	animacao._trilha.addEventListener("ended", () => {
		animacao._trilha.play()
    })

	// Esse contador corrige um problema importante da classe tiro, garantindo que cada tiro irá sair com um espaçamento padrão caso a tecla espaço esteja pressionada
    let contador = 0;
        
    // Declaração das imagens utilizadas no jogo
    let imagens =  [{nomeImagemImagem: 'imgNave', caminho:'/style/img/nave.png'}, {nomeImagem: 'explosao', caminho:'/style/img/explosao.png'}, {idprofessor: 3, nomeImagem: 'thiago', nomeProfessor: 'Thiago', caminho:'/style/img/thiago.png'}, {idprofessor: 4, nomeImagem: 'cristiano', nomeProfessor: 'Cristiano', caminho:'/style/img/cristiano.png'}, {idprofessor: 2, nomeImagem: 'alexandre', nomeProfessor: 'Alexandre', caminho:'/style/img/alexandre.png'}, {idprofessor: 5, nomeImagem: 'jeferson', nomeProfessor: 'Jeferson', caminho:'/style/img/jeferson.png'}, {idprofessor: 1, nomeImagem: 'jorge', nomeProfessor: 'Jorge', caminho:'/style/img/jorge.png'}, {idprofessor: 8, nomeImagem: 'rogerio', nomeProfessor: 'Rogerio', caminho:'/style/img/rogerio.png'}, {idprofessor: 9, nomeImagem: 'fabiana', nomeProfessor: 'Fabiana', caminho:'/style/img/fabiana.png'}, {idprofessor: 7, nomeImagem: 'satiko', nomeProfessor: 'Satiko', caminho:'/style/img/satiko.png'}, {idprofessor: 9, nomeImagem: 'ligia', nomeProfessor: 'Ligia', caminho:'/style/img/ligia.png'}, {idprofessor: 9, nomeImagem: 'boer', nomeProfessor: 'Boer', caminho:'/style/img/boer.png'}]
	let imagemObject = [{}]

	// Array responsável por gerar as posições aleatóriamente
	let arrayX = [(window.innerWidth / 2) - 400, (window.innerWidth / 2) + 400, (window.innerWidth / 2) - 200, (window.innerWidth / 2) + 200, window.innerWidth / 2, (window.innerWidth / 2) - 400, (window.innerWidth / 2) + 400, (window.innerWidth / 2) - 200, (window.innerWidth / 2) + 200, window.innerWidth / 2]
	let arrayY = [200, 200, 200, 200, 200, 10, 10, 10, 10, 10]

    for(let i=0; i<imagens.length; i++){
        imagemObject[i] = new Image()
		imagemObject[i].src = imagens[i].caminho 
    }
    
	// Declaração da classe nave, separado por conta dos métodos
    let nave = new Nave(imagemObject[0])
    
	// Passamos nave como parâmetro para a classe animação, responsável pelo processamento geral do jogo.
	animacao.novoSprite(nave)

	// Ao carregar a imagem da nave, irá centralizar na página (linha 67), e inicia o processamento
	imagemObject[0].onload = (() => {
		nave._x = (window.innerWidth / 2) - 30
		nave._velocidade = 7
		animacao.ligar()
	})

	// Carrega os professores, passando a posição x e y de acordo com o array das linhas 39 e 40, após usar ele remove a posição do array e passa como parâmetro para classe animação
    for(let i=2; i<imagemObject.length; i++){
        imagemObject[i].onload = (() => {
            let professor = new Professor(imagemObject[i])
            professor._x = arrayX[arrayX.length - 1]
            professor._y = arrayY[arrayY.length - 1]
            professor._xFinal = professor._x + (professor._imagem.width / 6)
            professor._yFinal = professor._y + (professor._imagem.height / 6)
            professor._nome = imagens[i].nomeProfessor
            arrayX.pop(arrayX.length - 1)
            arrayY.pop(arrayY.length - 1)
			animacao.novoSprite(professor)
			var jqxhr = $.get( "/listar/"+$(idprofessor)+/"/", function() {
				alert( "success" );
			  })
				.done(function() {
				  alert( "second success" );
				})
				.fail(function() {
				  alert( "error" );
				})
				.always(function() {
				  alert( "finished" );
				});
        })
    }

    // Ao apertar uma tecla atualiza a posição da nave.
	document.addEventListener('keydown', (event) => {
		nave.atualizar(event.keyCode);
		// fecha o reveal
		if (event.keyCode == 27) {
			animacao._body.classList.remove = "is-reveal-open";
			animacao._div[0].style = "display:none;"
			animacao._reveal[0].style = "top: 187px; display: none;"
			animacao.ligar()
		}
    })

	// Ao pressionar uma tecla verifica se a mesma é a tecla espaço e então atira.
	document.addEventListener('keypress', (event) => {
		let length = animacao._sprite[animacao._sprite.length - 1]
		if (animacao._sprite != new Nave()) {
			if (contador == 0) {
				let tiro = new Tiro(nave._x + 31, nave._y)
				animacao.novoSprite(tiro)
				/* animacao._trilha.play() */
				tiro._som.play()
				contador++
			}
			if ((event.keyCode == 32 || event.keyCode == 0) && (nave._y - length._y) > 100) {
				let tiro = new Tiro(nave._x + 31, nave._y)
				animacao.novoSprite(tiro)
				tiro._som.play()
			}
		}
	})
}