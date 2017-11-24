class Nave {
    constructor(imagem) {
        //Id do canvas
        this._canvas = document.getElementById('meu_canvas');
        this._context = this._canvas.getContext('2d');
        //Imagem da nave
        this._imagem = imagem;
        //Posição da nave
        this._x = 0;
        this._y = window.innerHeight -200;
        //Velocidade de movimento
        this._velocidade = 0;
    }

    //Método responsável por movimentar a nave de acordo com a tecla pressionada, respeitando os limites da tela
    atualizar(tecla) {
        if (tecla == 39 && this._x < (window.innerWidth - 120)) this._x += this._velocidade;
        if (tecla == 37 && this._x > -5) this._x -= this._velocidade;
    }

    //Responsável por desenhar a nave a cada vez que a mesma é atualizada
    desenhar() {
        this._context.drawImage(this._imagem, this._x, this._y, this._imagem.width / 6, this._imagem.height / 6);
    }
}
