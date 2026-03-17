package unoeste.fipp.projetofciii.services;

import com.google.gson.Gson;
import com.mongodb.client.*;
import org.bson.Document;
import unoeste.fipp.projetofciii.entities.Estilo;
import unoeste.fipp.projetofciii.entities.Music;

import java.util.ArrayList;
import java.util.List;

public class EstiloService
{
    String connectionString = "mongodb://localhost:27017";

    public List<Estilo> findStyles(){
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("my_musics");
        MongoCollection<Document> collection = database.getCollection("estilos");
        MongoCursor<Document> cursor = collection.find().iterator();

        List<Estilo> estiloList = new ArrayList<>();
        while(cursor.hasNext()){
            Estilo estilo = new Gson().fromJson(cursor.next().toJson(), Estilo.class);
            estiloList.add(estilo);
        }

        return estiloList;
    }

    public Music musicaDestaque(){
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("my_musics");
        MongoCollection<Document> collection = database.getCollection("musics");
        int total = (int) collection.countDocuments();
        int pos = (int) (Math.random() * total);
        MongoCursor<Document> cursor = collection.find().skip(pos).iterator();
        Music music = new Gson().fromJson(cursor.next().toJson(), Music.class);

        return music;
    }
}
