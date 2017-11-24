class Animacao {
	constructor() {
		//Canvas
		this._canvas = document.getElementById('meu_canvas');
		this._context = this._canvas.getContext('2d');

		//REVEAL
		this._body = document.getElementsByTagName("body");
		this._div = document.getElementsByClassName("reveal-overlay");
		this._reveal = document.getElementsByClassName("reveal");
		this._revealDiv = document.getElementById("texto");

		//Cada objeto estará aqui nessa clase, ela identifica colisão e atualiza e desenha cada um na tela
		this._sprite = [];

		//Gerencia a animação
		this._ligado == false;

		//Naves destruídas 			
		this._excluidos = [];

		//Gerencia o tempo entre cada explosão, separado por nave
		this._time = [];

		//Responsável pelos sons de tiro
		this._explosao = new Audio();
		this._explosao.src = "sound/explosao.mp3";
		this._explosao.volume = 1;
		this._explosao.load();
		//Trilha de fundo
		this._trilha = new Audio();
		this._trilha.src = "sound/Tristeza e Verdade em 8bits.mp3";
		this._trilha.volume = 0.5;
		this._trilha.load();
	}

	//Recebe cada objeto e insere no array
	novoSprite(sprite) {
		this._sprite.push(sprite);
	}

	//Liga a animação
	ligar() {
		this._ligado = true;
		this.proximoFrame();
	}

	//Desliga a animação
	desligar() {
		this._ligado = false;
	}

	//Gerencia a animação
	proximoFrame() {
		if (this._ligado == true) {
			//Limpa a tela
			this.limpaTela();

			//Atualiza cada objeto de acordo com a classe
			for (let i in this._sprite) this._sprite[i].atualizar();


			//Antes de desenhar verifica se existe tiros fora da tela e remove eles
			for (let i in this._sprite) {
				if (this._sprite[i]._y < 0)
					this._sprite.splice(i, 1);
				else
					this._sprite[i].desenhar();
			}

			//Processa colisões
			this.processar();

			//Remove os professores destruídos
			for (let i in this._sprite) {
				if (this._sprite[i]._desligado == true)
					this._sprite.splice(i, 1);
			}

			//Verifica o tempo entre cada atualização de explosão (são 5) ee se for maior que a regra atualiza
			for (let i in this._time) {
				let data = new Date();
				if ((data.getTime() - this._time[i].getTime()) > 50) {
					for (let j in this._excluidos) {

						//O tamanho da imagens é 350 se dividir por 5 cada posição tem 70, então verifica se a atualização está certa
						if (this._excluidos[j]._i == 0 || this._excluidos[j]._i == 70 || this._excluidos[j]._i == 140 || this._excluidos[j]._i == 210 || this._excluidos[j]._i == 280) {
							this._context.drawImage(explosao, this._excluidos[j]._i, 0, 70, 70, this._excluidos[j]._x, this._excluidos[j]._y, (explosao.width / 5) * 2, (explosao.height) * 2);
							this._time[i] = (new Date());
						}
						this._excluidos[j]._i += 2;
					}
				}
			}

			//Animação recebe ela mesmo
			let animacao = this;

			//E se atualiza
			requestAnimationFrame(function () { animacao.proximoFrame() });
		}
		
		/*if(this._excluidos.length == 11){
			this._body.classList = "is-reveal-open";
			this._div[0].style = "display:block;"
			this._reveal[0].style = "top: 187px; display: block;"
			this.professorConteudo('fim');
		}*/
	}

	//Limpa a tela
	limpaTela() {
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight - 150;
	}

	//Verificado de colisões
	processar() {
		for (let i in this._sprite) {
			for (let j in this._sprite) {
				//Verifica se os sprites são iguais se forem pula
				if (i == j) continue;
				//Se o sprite I for do tipo tiro e o Sprite J do tipo professor verifica colisão
				else if (this._sprite[i].constructor.name == 'Tiro' && this._sprite[j].constructor.name == 'Professor') {
					//Cálculo de colisão
					if ((this._sprite[i]._x > this._sprite[j]._x) && (this._sprite[i]._x < this._sprite[j]._xFinal) && (this._sprite[i]._y <= this._sprite[j]._yFinal)) {
						//Se colidir adiciona aos excluídos
						this._excluidos.push(this._sprite[j]);
						//A hora da morte de cada um
						this._time.push(new Date());
						//Atualiza para desligado para não processar
						this._sprite[j]._desligado = true;
						this._sprite[i]._desligado = true;
						//Toca o som da explosão
						this._explosao.play();
						this._ligado = false;
						this._body.classList = "is-reveal-open";
						this._div[0].style = "display:block;"
						this._reveal[0].style = "top: 187px; display: block;"
						this.professorConteudo(this._sprite[j]._nome);
					}
				}
			}
		}
	}

	professorConteudo(nome) {
		switch (nome) {
			case 'Satiko':
				this._revealDiv.innerHTML = "<center><h1>MATEMATICA</h1></center><p>Uma das coisas que mais curti fazer na faculdade sem dúvida foi este trabalho, utilizando conceitos aprendidos no primeiro semestre eu e o Diego (sim o mesmo da trilha), resolvemos aplicar os conceitos aprendidos de alguma forma. Ele, criou um Banco Imobiliário em C, e eu criei a projeção de uma imagem simples utilizando matrizes.</p><p>Desde meu primeiro blog (destrua o Xexe para saber mais), eu separei esse projeto em duas categorias, a parte matemática, onde apresentei essa ideia a excelente professora Satiko, e uma outra parte ao Jeferson que ministrava as aulas de lógica no primeiro semestre, caso deseje ver o código fonte destrua o Jeferson</p>\<p>A geração de imagens como conhecemos é constituida da combinação de 3 matrizes, R G B, a combinação dessas três matrizes nos garante a geração de imagem. No caso a imagem que gerei foi a combinação de duas matrizes 9x9 que vão gerar a nossa imagem, a pintura é feita através de uma combinação binária (veja o código fonte). Abaixo você pode ver os gabaritos e o resultado.</p> <img src='img/Matematica/gabarito1.jpg' alt='Matriz 1'/><img src='img/Matematica/gabarito2.jpg' alt='Matriz 2'/><img src	='img/Matematica/tabelafinal.jpg' alt='Resultado'><img src='img/Matematica/result.jpg' alt='Resultado Impresso'>"
				break;

			case 'Cristiano':
				this._revealDiv.innerHTML = "<center><h1>PROGRAMACAO PARA SITIOS</h1></center><p>Como escrevi no sobre, na index, Javascript me despertou um interesse muito grande, por isso essa é a matéria que mais tem contéudo para o portifólio feito em... javascript.</p><p>Meu primeiro projeto para essa matéria foi um bingo feito em JQUERY <a id='index' href='portifolio/bingo/sorteador/sorteio.html' target='_blank'>Clique aqui para jogar como narrador</a> ou se preferir jogar com as cartelas <a id='index' target='_blank' href='portifolio/bingo/cartela/index.html'>clique aqui, e lembre-se de liberar as pop-up</a>, esse eu resolvi fazer em jquery porque já havia estudado Javascript nas férias e queria conhecer outros frameworks.</p><p>Para um dos últimos projetos da matéria a forca, eu resolvi fazer em javascript puro, para aprofundar conhecimentos na linguagem e o resultado pode ser conferido <a id='index' target='_blank' href='portifolio/forca/forca.html'>aqui</a>.</p><p> Além desse projeto venho estudando mais afundo o ECMA 6 e comecei a desenvolver esse projeto, acompanhando o livro JS CANGACEIRO onde é implementado um CRUD em javascript <a id='index' href='portifolio/client/index.html' target='_blank'>confira aqui</a>, e graças ao WebCelo (Marcelo Formentão) conheci frameworks e tecnologias poderosas em javascript.</p>"
				break;

			case 'Alexandre':
				this._revealDiv.innerHTML = "<center><h1>Boa noite, Meu nome é Alexandre Bernardes</h1></center><p>'E no final do semestre, os alunos colocam o site on-line', frase dita em todo seja fatec, e aqui eu deixei <a id='index' href='http://projetos.fatecjales.edu.br/julianoze/padroesI/' target='_blank'>meu primeiro site</a> feito em html5, css e utilizando as boas práticas de programação.<p><p>Mas esse projeto não está aqui por ser o primeiro site, esse projeto deixou claro ao menos pra mim que tecnologia se resume a duas coisas 'pesquisa' e 'comunicação', você aprende a ponta do iceberg na faculdade, e lá fora se você não se dedicar a vida vai te cobrar. E comunicação, pois o site não teria saído do papel, sem a troca de ideias com o pessoal da sala, muitas vezes eles tinham as respostas para as questões que eu procurava por horas, obrigado a todos.</p>"
				break;

			case 'Boer':
				this._revealDiv.innerHTML = "<center><h1>Tunts tunts tuns pronto pessoal?<center></h1><p>Embora sejam trabalhos em desenvolvimento neste semestre considerei importante demostrar algo mais atual, e como anda o quinto semestre, hoje responsável por uma matéria ele começou com duas matérias na nossa sala. E sempre nos desafiou a criar e buscar, abaixo você pode encontrar algumas prints dos app para android.<p>Manter o aluno interessado e desafiado é fundamental para o aprendizado, obrigado Boer por proporcionar isso.</p><img src='img/Android/android.png' alt='aplicativos android'>"
				break;

			case 'Jeferson':
				this._revealDiv.innerHTML = "<center><h1>ALGORITMO</h1></center><p>Algoritmo pra mim sempre foi uma matéria que eu gostava muito, jantava o livro da Vitorine, então surgiu a oportunidade de unir Matemática e Algoritmo, que já são unidas por natureza em um trabalho.</p><p> Se você viu Matrix deve entender a referência que vou citar, programação é como quando morpheus oferece as pilúlas a neo, e neo tem que decidir qual das duas pegar, if, else... um dos meus filmes preferidos por toda a lógica que possui. Portanto escolha sua pílula e se for a de ficar, acompanhe esse artigo <a href='portifolio/algoritmo.html' id='index' targe='_blank'>aqui.</a></p>"
				break

			case 'Thiago':
				this._revealDiv.innerHTML = "<center><h1>MR COCA-COLA</h1></center><p>Melhor do que ninguem thiago sabe o quanto não gostava de java, hoje tolero, brincadeiras a parte hoje consigo entender muito melhor a lógica depois de muito esforço, php e javascript sempre foram naturais a mim, java não, mas agora estou aprendendo e você acompanhar um crud implementado em Java, na aula de TDA do professor Heitor, digo Jorge. <a id='index' href='portifolio/health.rar' >Download do crud aqui</a></p><img src='img/java/cadastrar.png' alt='tela de cadastro'><img src='img/java/listar.png' alt='tela de cadastro'>"
				break;

			case 'Jorge':
				this._revealDiv.innerHTML = "<center><h1>UM PROFESSOR VARIAS MATERIAS</h1></center><p>Jorge é um dos poucos professores que acompanhou uma sala de 40 pessoas se tornar uma família de 15 pessoas, suas matérias são fundamentais para o desenvolvimento como profissional, enquanto professor no quarto semestre e sua matéria de projetos e navegação em browser fomos convidados a pensar como real desenvolvedores, tentando produdzir interfaces amigaveis aos usuários, e com padrões ainda avançados.</p><p> Esse portifólio é uma junção do conhecimento adquirido em muitas matérias como já disse anteriormente, e aqui eu usei e pensei muito, embora simples a diagramação e posição de cada item na tela, foi pensada de forma a produzir uma melhor experiência</p><p>Abaixo você uma simples página diagramada com o que aprendi na aula. Os outros projetos não achei. =(</br><center><img src='img/navegacao/navegacao.png' alt='imagem de um site'></center></p>"
				break;

			case 'Rogerio':
				this._revealDiv.innerHTML = "<center><h1>Rei Leao</h1></center><p>Aprender sobre segurança na faculdade foi primordial, resolvi listar essa matéria para agradecer ao mestre Rogério Leão, o conhecimento sobre a importância de se proteger, embora possa parecer algo simples, hoje sei que grande parte das empresas só se previne através de medidas reativas, ou seja sofrem com a falha, exploração para depois se protegerem.</p><p>Para uma empresa os dados são muito importantes, e assim como as configurações de acesso, sempre tenha um backup, e restringir o acesso a informação.</p><p>E uma coisa que curti fazer foi a animação abaixo, caso queira baixar segue o link para <a id='index' href='portifolio/Rogerio/video_seguranca.swf'>Download</a>.</p><img src='img/rogerio/video1.png' alt='Animacao Imagem 1'><img src='img/rogerio/video2.png' alt='Animacao Imagem 1'>"
				break;

			case 'Ligia':
				this._revealDiv.innerHTML = "<center><h1>PHP</h1></center><p>Esse é mais um agradecimento, embora não tenha nenhum projeto específico para ela, esse portifólio usa muito do que foi aprendi em aula, cada linha explicada, o porque da certo, o porque não da, quando usar ou quando não usar, implementei muitas coisas nesse portifólio vindas dessa aula sensacional.</p><p>Ligia se você estiver lendo isso aceitamos uma pizza, atenciosamente quinto semestre</p>"
				break;

			case 'Fabiana':
				this._revealDiv.innerHTML = "<center><h1>Esse portifolio esta valendo alguns pontinhos</h1><center><p>Cada pontinho supimpa dessa matéria foi suado..., separei dois dos inumeros projetos feitos dessa matéria e um pós fabiana, o primeiro é um trabalho desenvolvido no 3Dmax, que resolvi retratar um personagem muito especial para mim durante minha infância, o personagem de SPY vs. SPY</p><p>E o segundo embora uma tecnologia que não é mais tão utilizada atualmente, o Flash eu desenvolvi uma animação como projeto do semestre. E logo após fui convidado para desenvolver uma pelo professor Rogério Leão, para o SITEF (para visualizar destrua ele).</p><p> Clique <a id='index' href='portifolio/Fabiana/tp03.swf'>aqui</a></p><img src='img/Fabiana/animacao.png' alt='animacao de design'>."
				break;
			
			/*case 'fim':
				this._revealDiv.innerHTML = "<center><p>Espero que tenha curtido e volte sempre!</p></center><center><a id='index' href='index.html'>Voltar</a></center>";
				break;*/
		}
	}
}