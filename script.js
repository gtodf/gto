/* ========================================================= NAVEGAÇÃO ========================================================= */

function abrirTela(idTela) {

document .querySelectorAll(".tela") .forEach(function (tela) {

tela.classList.remove("ativa");

});

const tela = document.getElementById(idTela);

if (!tela) { return; }

tela.classList.add("ativa");

window.scrollTo({ top: 0, behavior: "smooth" });

}

/* ========================================================= TÉCNICOS ========================================================= */

const tecnicosPorGrupo = {

cdf: [ "Abimael", "Adeilson", "Hérico", "Jovailson", "Miguel", "Raimundo", "Robson", "Tomé" ],

cn2: [ "Adeilson", "Jovailson", "Tomé" ],

afericao: [ "Jovailson", "Miguel", "Raimundo", "Robson", "Wanderson" ],

atualizacaoCaixa: [ "Anderson Romildo", "Robson", "Wanderson" ],

caminhao1: [ "Adeilson", "Alessandro", "Braulio", "Elder", "Jesser", "Maciel", "Miguel", "Willian" ],

caminhao2: [ "Adeilson", "Alessandro", "Braulio", "Elder", "Jesser", "Maciel", "Miguel", "Willian" ],

atualizacaoRevitalizacao: [ "André", "Maciel" ]

};

/* ========================================================= CRIAR CHECKBOXES ========================================================= */

function criarCheckboxesAtendimento() {

const blocos = document.querySelectorAll( "#telaAtendimento .atendimento-bloco" );

blocos.forEach(function (bloco) {

const nomeGrupo = bloco.dataset.grupo;

const container = bloco.querySelector( ".atendimento-tecnicos" );

if (!container) { return; }

const listaTecnicos = tecnicosPorGrupo[nomeGrupo] || [];

listaTecnicos.forEach(function (nome) {

criarTecnico( container, nome, nomeGrupo, false );

});

criarTecnico( container, "Outros", nomeGrupo, true );

});

}

/* ========================================================= CRIAR TÉCNICO ========================================================= */

function criarTecnico( grupo, nome, nomeGrupo, ehOutros ) {

const label = document.createElement("label");

label.className = "atendimento-tecnico";

const checkbox = document.createElement("input");

checkbox.type = "checkbox";

checkbox.value = nome;

checkbox.dataset.grupo = nomeGrupo;

const texto = document.createTextNode(nome);

label.appendChild( checkbox );

label.appendChild( texto );

grupo.appendChild( label );

let campoOutros = null;

if (ehOutros) {

campoOutros = document.createElement("input");

campoOutros.type = "text";

campoOutros.className = "atendimento-outros";

campoOutros.placeholder = "Digite o nome de outro técnico";

campoOutros.dataset.grupo = nomeGrupo;

grupo.appendChild( campoOutros );

}

checkbox.addEventListener( "change", function () {

if (checkbox.checked) {

label.classList.add( "selecionado" );

} else {

label.classList.remove( "selecionado" );

}

if (ehOutros && campoOutros) {

if (checkbox.checked) {

campoOutros.classList.add( "mostrar" );

campoOutros.focus();

} else {

campoOutros.classList.remove( "mostrar" );

campoOutros.value = "";

}

}

gerarMensagem();

} );

if (campoOutros) {

campoOutros.addEventListener( "input", gerarMensagem );

}

}

/* ========================================================= TÉCNICOS SELECIONADOS ========================================================= */

function tecnicosSelecionados(grupo) {

    const checkboxes = document.querySelectorAll(
        `#telaAtendimento input[type="checkbox"][data-grupo="${grupo}"]:checked`
    );

    const nomes = [];

    checkboxes.forEach(function (checkbox) {

        if (checkbox.value === "Outros") {

            const campoOutros = document.querySelector(
                `#telaAtendimento .atendimento-outros[data-grupo="${grupo}"]`
            );

            if (
                campoOutros &&
                campoOutros.value.trim() !== ""
            ) {

                nomes.push(
                    campoOutros.value.trim()
                );

            }

        } else {

            nomes.push(
                checkbox.value
            );

        }

    });

    return nomes.join(", ");
}

/* ========================================================= DATA ATUAL ========================================================= */

function colocarDataAtualAtendimento() {

const hoje = new Date();

const ano = hoje.getFullYear();

const mes = String( hoje.getMonth() + 1 ).padStart( 2, "0" );

const dia = String( hoje.getDate() ).padStart( 2, "0" );

const campo = document.getElementById( "atendimentoData" );

if (campo) {

campo.value = `${ano}-${mes}-${dia}`;

}

}

/* ========================================================= DIA DA SEMANA ========================================================= */

function nomeDiaSemana(data) {

if (!data) { return ""; }

const dias = [

"DOMINGO", "SEGUNDA FEIRA", "TERÇA FEIRA", "QUARTA FEIRA", "QUINTA FEIRA", "SEXTA FEIRA", "SÁBADO"

];

const dataObj = new Date( `${data}T00:00:00` );

if (Number.isNaN(dataObj.getTime())) { return ""; }

return dias[ dataObj.getDay() ];

}

/* ========================================================= FORMATAR DATA ========================================================= */

function formatarData(data) {

if (!data) { return ""; }

const partes = data.split("-");

if (partes.length !== 3) { return ""; }

return ( partes[2] + "/" + partes[1] + "/" + partes[0] );

}

/* ========================================================= VALOR DO CAMPO ========================================================= */

function valorAtendimento(id) {

const elemento = document.getElementById(id);

if (!elemento) { return ""; }

return elemento.value.trim();

}

/* ========================================================= GERAR MENSAGEM ========================================================= */

function gerarMensagem() {

const data = valorAtendimento( "atendimentoData" );

let mensagem = "";

/* ===================================================== DATA ===================================================== */

if (data) {

mensagem += "" + nomeDiaSemana(data) + ", " + formatarData(data) + "" + "\n\n";

}

/* ===================================================== CDF ===================================================== */

mensagem += "*ATENDIMENTO CDF:* " + (tecnicosSelecionados("cdf") || "") + "\n";

const observacaoCdf = valorAtendimento( "atendimentoObservacaoCdf" );

if (observacaoCdf) {

mensagem += "*OBSERVAÇÃO CDF:* " + observacaoCdf + "\n";

}

/* ===================================================== CN2 ===================================================== */

mensagem += "*ATENDIMENTO CN2:* " + (tecnicosSelecionados("cn2") || "") + "\n";

const observacaoCn2 = valorAtendimento( "atendimentoObservacaoCn2" );

if (observacaoCn2) {

mensagem += "*OBSERVAÇÃO CN2:* " + observacaoCn2 + "\n";

}

/* ===================================================== AFERIÇÃO ===================================================== */

mensagem += "*AFERIÇÃO:* " + (tecnicosSelecionados("afericao") || "") + "\n";

const pontosAfericao = valorAtendimento( "atendimentoAfericao" );

if (pontosAfericao) {

mensagem += "*PONTOS E OBSERVAÇÃO:* " + pontosAfericao + "\n";

}

/* ===================================================== ATUALIZAÇÃO DE CAIXA ===================================================== */

mensagem += "*ATUALIZAÇÃO DE CAIXA:* " + (tecnicosSelecionados("atualizacaoCaixa") || "") + "\n";

const ponto = valorAtendimento( "atendimentoPonto" );

if (ponto) {

mensagem += "*PONTOS E OBSERVAÇÃO:* " + ponto + "\n";

}

/* ===================================================== CAMINHÃO 01 ===================================================== */

mensagem += "*CAMINHÃO 01:* " + (tecnicosSelecionados("caminhao1") || "") + "\n";

const rodovia1 = valorAtendimento( "atendimentoRodovia1" );

if (rodovia1) {

mensagem += "*RODOVIA, PONTO E SERVIÇO:* " + rodovia1 + "\n";

}

/* ===================================================== CAMINHÃO 02 ===================================================== */

mensagem += "*CAMINHÃO 02:* " + (tecnicosSelecionados("caminhao2") || "") + "\n";

const rodovia2 = valorAtendimento( "atendimentoRodovia2" );

if (rodovia2) {

mensagem += "*RODOVIA, PONTO E SERVIÇO:* " + rodovia2 + "\n";

}

/* ===================================================== ATUALIZAÇÃO E REVITALIZAÇÃO ===================================================== */

mensagem += "*ATUALIZAÇÃO E REVITALIZAÇÃO:* " + ( tecnicosSelecionados( "atualizacaoRevitalizacao" ) || "" ) + "\n";

const rodovia3 = valorAtendimento( "atendimentoRodovia3" );

if (rodovia3) {

mensagem += "*RODOVIA, PONTO E SERVIÇO:* " + rodovia3 + "\n";

}

/* ===================================================== OBSERVAÇÃO GERAL ===================================================== */

const observacao = valorAtendimento( "atendimentoObservacao" );

if (observacao) {

mensagem += "\n" + "*OBSERVAÇÃO GERAL:*\n" + observacao;

}

/* ===================================================== PREVIEW ===================================================== */

const preview = document.getElementById( "mensagemPreview" );

const mensagemFinal = mensagem.trim();

if (preview) {

preview.value = mensagemFinal;

}

return mensagemFinal;

}

/* ========================================================= WHATSAPP ========================================================= */

function enviarWhatsApp() {

const mensagem = gerarMensagem();

if (!mensagem) {

alert( "Preencha os dados antes de enviar." );

return;

}

const textoCodificado = encodeURIComponent( mensagem );

const url = "https://wa.me/?text=" + textoCodificado;

window.open( url, "_blank", "noopener,noreferrer" );

}

/* ========================================================= COPIAR MENSAGEM ========================================================= */

async function copiarMensagem() {

const mensagem = gerarMensagem();

if (!mensagem) {

alert( "Não há mensagem para copiar." );

return;

}

try {

if ( navigator.clipboard && window.isSecureContext ) {

await navigator .clipboard .writeText( mensagem );

} else {

const textarea = document.createElement( "textarea" );

textarea.value = mensagem;

textarea.style.position = "fixed";

textarea.style.opacity = "0";

document.body.appendChild( textarea );

textarea.focus();

textarea.select();

const sucesso = document.execCommand( "copy" );

document.body.removeChild( textarea );

if (!sucesso) { throw new Error( "Falha ao copiar" ); }

}

alert( "Mensagem copiada com sucesso!" );

} catch (erro) {

alert( "Não foi possível copiar automaticamente. " + "Selecione a mensagem e copie manualmente." );

}

}

/* ========================================================= LIMPAR ATENDIMENTO ========================================================= */

function limparFormularioAtendimento() {

const confirmar = confirm( "Deseja realmente limpar todos os campos?" );

if (!confirmar) { return; }

/* ===================================================== CAMPOS DE TEXTO ===================================================== */

document .querySelectorAll( "#telaAtendimento input[type='text']" ) .forEach(function (campo) {

campo.value = "";

});

/* ===================================================== TEXTAREAS ===================================================== */

document .querySelectorAll( "#telaAtendimento textarea" ) .forEach(function (campo) {

campo.value = "";

});

/* ===================================================== CHECKBOXES ===================================================== */

document .querySelectorAll( "#telaAtendimento input[type='checkbox']" ) .forEach(function (checkbox) {

checkbox.checked = false;

const label = checkbox.closest( ".atendimento-tecnico" );

if (label) {

label.classList.remove( "selecionado" );

}

});

/* ===================================================== CAMPOS OUTROS ===================================================== */

document .querySelectorAll( "#telaAtendimento .atendimento-outros" ) .forEach(function (campo) {

campo.value = "";

campo.classList.remove( "mostrar" );

});

/* ===================================================== RESTAURAR DATA ===================================================== */

colocarDataAtualAtendimento();

/* ===================================================== ATUALIZAR PREVIEW ===================================================== */

gerarMensagem();

}

/* ========================================================= CAMPOS DA PROGRAMAÇÃO ========================================================= */

function prepararCamposProgramacao() {

document .querySelectorAll( "#telaProgramacao .programacao-editavel" ) .forEach(function (campo) {

campo.addEventListener( "input", function () {

this.value = this.value.toUpperCase();

this.classList.remove( "programacao-campo-incompleto" );

} );

});

}

/* ========================================================= SOMENTE NÚMEROS ========================================================= */

function prepararCamposNumericos() {

document .querySelectorAll( ".programacao-velocidade, .programacao-faixa, .programacao-cdf" ) .forEach(function (campo) {

campo.addEventListener( "input", function () {

this.value = this.value.replace( /\D/g, "" );

} );

});

}

/* ========================================================= VALIDAR CAMPOS ========================================================= */

function validarCamposProgramacao() {

const campos = [

{ elemento: document.querySelector( ".programacao-endereco" ),

nome: "Endereço" },

{ elemento: document.querySelector( ".programacao-sentido" ),

nome: "Sentido" },

{ elemento: document.querySelector( ".programacao-ponto" ),

nome: "Identificação do Ponto" },

{ elemento: document.querySelector( ".programacao-velocidade" ),

nome: "Velocidade Nominal" },

{ elemento: document.querySelector( ".programacao-faixa" ),

nome: "Faixa" },

{ elemento: document.querySelector( ".programacao-cdf" ),

nome: "CDF" }

];

const camposVazios = [];

campos.forEach(function (campo) {

if (!campo.elemento) { return; }

const valor = campo.elemento.value.trim();

if (!valor) {

campo.elemento.classList.add( "programacao-campo-incompleto" );

camposVazios.push( campo );

} else {

campo.elemento.classList.remove( "programacao-campo-incompleto" );

}

});

return camposVazios;

}

/* ========================================================= VALIDAR TIPO DE SERVIÇO ========================================================= */

function validarTipoServico() {

return ( document.querySelector( '#telaProgramacao input[name="tipoServico"]:checked' ) !== null );

}

/* ========================================================= IMPRIMIR ========================================================= */

function validarEImprimir() {

const tipoServicoValido = validarTipoServico();

const camposVazios = validarCamposProgramacao();

if ( !tipoServicoValido || camposVazios.length > 0 ) {

let mensagem = "ATENÇÃO!\n\n";

if (!tipoServicoValido) {

mensagem += "• Selecione o tipo de serviço metrológico.\n";

}

if (camposVazios.length > 0) {

mensagem += "\nCampos que precisam ser preenchidos:\n";

camposVazios.forEach( function (campo) {

mensagem += "• " + campo.nome + "\n";

} );

}

mensagem += "\nPreencha todas as informações obrigatórias antes de imprimir.";

alert( mensagem );

if (!tipoServicoValido) {

const primeiroRadio = document.querySelector( '#telaProgramacao input[name="tipoServico"]' );

if (primeiroRadio) {

primeiroRadio.focus();

}

} else if ( camposVazios.length > 0 ) {

camposVazios[0] .elemento .focus();

}

return;

}

window.print();

}

/* ========================================================= ATUALIZAÇÃO AUTOMÁTICA DO ATENDIMENTO ========================================================= */

document.addEventListener( "input", function (event) {

if ( event.target.closest( "#telaAtendimento" ) ) {

gerarMensagem();

}

} );

/* ========================================================= ALTERAÇÃO DA DATA ========================================================= */

document.addEventListener( "change", function (event) {

if ( event.target.id === "atendimentoData" ) {

gerarMensagem();

}

} );

/* ========================================================= INICIALIZAÇÃO ========================================================= */

document.addEventListener( "DOMContentLoaded", function () {

criarCheckboxesAtendimento();

colocarDataAtualAtendimento();

prepararCamposProgramacao();

prepararCamposNumericos();

gerarMensagem();

} );