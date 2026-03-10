package unoeste.fipp.projetofciii.entities;

public class Music {
    private String nomeMusica;
    private String nomeAutor;
    private String estilo;
    private String arquivo;

    public Music(String nomeMusica, String nomeAutor, String estilo) {
        this.nomeMusica = nomeMusica;
        this.nomeAutor = nomeAutor;
        this.estilo = estilo;
    }

    public String getNomeMusica() {
        return nomeMusica;
    }

    public void setNomeMusica(String nomeMusica) {
        this.nomeMusica = nomeMusica;
    }

    public String getNomeAutor() {
        return nomeAutor;
    }

    public void setNomeAutor(String nomeAutor) {
        this.nomeAutor = nomeAutor;
    }

    public String getEstilo() {
        return estilo;
    }

    public void setEstilo(String estilo) {
        this.estilo = estilo;
    }

    public String getArquivo() {
        return arquivo;
    }

    public void setArquivo(String arquivo) {
        this.arquivo = arquivo;
    }
}
