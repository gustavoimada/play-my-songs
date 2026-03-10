const sugestoes = [
    {
        titulo: "Love My Life",
        artista: "Robbie Williams",
        estilo: "Pop Internacional",
        descricao: "Uma faixa conhecida para ilustrar a sugestão principal da plataforma."
    },
    {
        titulo: "Tempo Perdido",
        artista: "Legião Urbana",
        estilo: "Rock Nacional",
        descricao: "Uma sugestão clássica para destacar artista, estilo e identidade visual."
    },
    {
        titulo: "Dias de Luta, Dias de Glória",
        artista: "Charlie Brown Jr.",
        estilo: "Rock",
        descricao: "Outra faixa para deixar a home mais viva e dinâmica logo na entrada."
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