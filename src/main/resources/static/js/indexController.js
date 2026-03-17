function trocarSugestao(){
    const music = document.getElementById("musica-sugerida")
    fetch("http://localhost:8080/apis/random-music")
        .then(response => response.json())
        .then(musica => {
            music.innerHTML = `<p>Nome da Musica: ${musica.nomeMusica}</p>
                                <p>Cantor: ${musica.nomeAutor}</p>
                                <p>Estilo: ${musica.estilo}</p>`
        })
        .catch(error => music.innerHTML = error)
}