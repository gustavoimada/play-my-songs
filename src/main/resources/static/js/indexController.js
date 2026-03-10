const sugestoes = [
    {
        titulo: "Love My Life",
        artista: "Robbie Williams",
        estilo: "Pop Internacional",
        descricao: "Uma faixa conhecida para ilustrar como a música pode ser exibida em destaque na home."
    },
    {
        titulo: "Tempo Perdido",
        artista: "Legião Urbana",
        estilo: "Rock Nacional",
        descricao: "Exemplo de recomendação com foco em artista, estilo e experiência mais visual."
    },
    {
        titulo: "Dias de Luta, Dias de Glória",
        artista: "Charlie Brown Jr.",
        estilo: "Rock",
        descricao: "Outra sugestão para deixar a página inicial dinâmica sem depender do backend."
    }
];

let indiceAtual = 0;

function renderizarSugestao() {
    const box = document.getElementById("filme-sugerido");
    const musica = sugestoes[indiceAtual];

    box.innerHTML = `
        <span class="badge">Em destaque</span>
        <h3>${musica.titulo}</h3>
        <p><strong>Artista:</strong> ${musica.artista}</p>
        <p><strong>Estilo:</strong> ${musica.estilo}</p>
        <p>${musica.descricao}</p>
    `;
}

function trocarSugestao() {
    indiceAtual = (indiceAtual + 1) % sugestoes.length;
    renderizarSugestao();
}

document.addEventListener("DOMContentLoaded", renderizarSugestao);