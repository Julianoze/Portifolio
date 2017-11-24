//encapsula os campos
class Negociacoes {

    constructor() {
        this._negociacoes = [];
		Object.freeze(this);
    }

	get volumeTotal(){
		return this._negociacoes.reduce(function(total,negociacao){
			return total+negociacao.volume;
		},0);
	}
	
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    paraArray() {

        return [].concat(this._negociacoes);
    }
	esvazia(){
		this._negociacoes.length = 0;
	}
}