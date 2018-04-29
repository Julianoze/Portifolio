class NegociacaoController{

    constructor() {

        const $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
		
		this._negociacoes = new Bind(
			new Negociacoes(),
			new NegociacoesView('#negociacoes'),
			['adiciona','esvazia'] 
        );
		
		this._mensagem = ProxyFactory.create(
			new Mensagem(),
			new MensagemView('#mensagemview'),
			['texto']
		);		
	}
	
    adiciona(event) {

        event.preventDefault();
		this._negociacoes.adiciona(this._criaNegociacao());
		this._mensagem.texto=  'Negociacao adicionada com sucesos';
        this._limpaFormulario();
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
    }

    _criaNegociacao() {

        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
	
	apaga(){
		this._negociacoes.esvazia();
		this._negociacoesView.update(this._negociacoes);
		this._mensagem.texto = 'Negociações apagadas com sucesso';
	}
}