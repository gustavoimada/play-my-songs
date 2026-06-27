package unoeste.fipp.projetofciii.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.projetofciii.entities.Erro;
import unoeste.fipp.projetofciii.entities.Estilo;
import unoeste.fipp.projetofciii.entities.Music;
import unoeste.fipp.projetofciii.services.EstiloService;
import unoeste.fipp.projetofciii.services.MusicService;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("apis")
public class MusicController
{
    @Autowired
    private MusicService musicService;
    @Autowired
    private EstiloService estiloService;

    @GetMapping("test")
    public ResponseEntity<Object> teste()
    {
        return ResponseEntity.ok().build(); // retorna só o status, no caso, 200 (ok = deu certo)
    }

    @PostMapping("music-upload")
    public ResponseEntity<Object> music_upload(String nomeMusica, String nomeAutor, String estilo, MultipartFile file)
    {
        final String UPLOAD_FOLDER = "src/main/resources/static/musicas/";

                        Music music = new Music(nomeMusica, nomeAutor, estilo);
                            nomeMusica = nomeMusica.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
                            nomeAutor = nomeAutor.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
                            estilo = estilo.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
                            String fileName = nomeMusica + "_" +  nomeAutor + "_" + estilo+".mp3";
                            try
                            {
                                File uploadFolder = new  File(UPLOAD_FOLDER);
                                if(!uploadFolder.exists())
                                {
                                    uploadFolder.mkdir();
                                }
                                file.transferTo(new File(uploadFolder.getAbsolutePath() + "\\"+fileName));
                            }
                            catch(Exception e)
                            {
                                System.out.println(e.getMessage());
                            }
                            music.setArquivo(fileName);
                            musicService.insertBD(music);
                        return ResponseEntity.ok().body(music);
    }

    @GetMapping("find-musics")
    public ResponseEntity<Object> find_musics(String keyword )
    {
        List<Music> musicList = new ArrayList<>();
        musicList = musicService.findMusicByKeyWord(keyword);
        return ResponseEntity.ok().body(musicList);
    }

    @GetMapping("get-music-styles")
    public ResponseEntity<Object> getStyles()
    {
        List<Estilo> estiloList = new ArrayList<>();
        estiloList = estiloService.findStyles();
        return ResponseEntity.ok().body(estiloList);
    }

    @GetMapping("random-music")
    public ResponseEntity<Object> musicaDestaque(){
        Music music = estiloService.musicaDestaque();
        return ResponseEntity.ok().body(music);
    }
}
