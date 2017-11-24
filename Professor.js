class Professor {
    constructor(imagem) {
        //Canvas
        this._canvas = document.getElementById('meu_canvas');
        this._context = this._canvas.getContext('2d');
        //Imagens dos professores
        this._imagem = imagem;
        //Nome de cada professor (importante para pop-up)
        this._nome = '';
        //Posição de desenho
        this._x = 0;
        this._y = 0;
        //Posições importantes para o cálculo de colisão
        this._xFinal = 0;
        this._yFinal = 0;
        //Contador da sprite explosão
        this._i = 0
        this._desligado = false;
    }
    //Método responsável pela movimentação
    atualizar() {
        this._velocidade--;
    }
    //Se a nave não tiver sido destruida a mesma será desenhada na tela
    desenhar() {
        if (this._desligado == false) this._context.drawImage(this._imagem, this._x, this._y, this._imagem.width / 6, this._imagem.height / 6);
    }
}