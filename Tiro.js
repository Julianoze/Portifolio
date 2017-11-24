class Tiro {
    //Cada tiro recebe como parâmetro a posição atual da nave, para centralizar o tiro com a ponta da nave
    constructor(x, y) {
        //Canvas
        this._canvas = document.getElementById('meu_canvas');
        this._context = this._canvas.getContext('2d');
        //Largua e altura do tiro
        this._largura = 4;
        this._altura = 20;
        //Posição do tiro em relação a nave
        this._x = x;
        this._y = y;
        //Velocidade do tiro
        this._velocidade = 5;
        //Cor do tiro
        this._cor = 'white';
        //Responsável por dizer se o tiro irá permanecer na tela        
        this._desligado = false;
        //Atributos responsáveis pelo som
        this._som = new Audio();
        this._som.src = 'sound/tiro.mp3'
        this._som.volume = 1;
        this._som.load();
    }

    //Atualiza a posição do tiro na tela
    atualizar() {
        this._y -= this._velocidade;;
    }
    //Desenha o tiro.
    desenhar() {
        if (this._desligado == false) {
            let ctx = this._context;
            ctx.save();
            ctx.fillStyle = this._cor;
            ctx.fillRect(this._x, this._y, this._largura, this._altura);
            ctx.restore();
        }
    }
}