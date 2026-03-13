package unoeste.fipp.projetofciii.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.projetofciii.entities.Erro;
import unoeste.fipp.projetofciii.entities.Music;
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

    @GetMapping("test")
    public ResponseEntity<Object> teste()
    {
        return ResponseEntity.ok().build(); // retorna só o status, no caso, 200 (ok = deu certo)
    }

    @PostMapping("music-upload")
    public ResponseEntity<Object> music_upload(String nomeMusica, String nomeAutor, String estilo, MultipartFile file)
    {
        final String UPLOAD_FOLDER = "src/main/resources/static/musicas/";
        if(nomeMusica == null || nomeMusica.isEmpty())
        {
            return ResponseEntity.badRequest().body(new Erro("Informações incompletas!","Forneça o nome da Musica"));
        }
        else
        {
            if(nomeAutor == null || nomeAutor.isEmpty())
            {
                return ResponseEntity.badRequest().body(new Erro("Informações incompletas!","Forneça o nome do Artista"));
            }
            else
            {
                if(estilo == null || estilo.isEmpty())
                {
                    return ResponseEntity.badRequest().body(new Erro("Informações incompletas","Forneça o estilo da Música"));
                }
                else
                {
                    if(file == null || file.isEmpty())
                    {
                        return ResponseEntity.badRequest().body(new Erro("Informações incompletas!","O campo do arquivo não foi completado!"));
                    }
                    else
                    {
                        Music music = new Music(nomeMusica, nomeAutor, estilo);
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
                            musicService.addMusica(music);
                            return ResponseEntity.ok().body(music);
                    }
                }
            }
        }
    }

    @GetMapping("find-musics")
    public ResponseEntity<Object> find_musics(String keyWord)
    {
        List<Music> musicList = new ArrayList<>();
        musicList = musicService.findMusicsByKeyWord(keyWord);
        return ResponseEntity.ok(musicList);
    }

    @GetMapping("get-music-styles")
    public ResponseEntity<Object> getStyles()
    {
        //
        return ResponseEntity.ok("Lista de estilos musicais");
    }
}
