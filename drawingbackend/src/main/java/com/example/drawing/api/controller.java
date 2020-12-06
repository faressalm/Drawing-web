package com.example.drawing.api;

import com.example.drawing.model.shape;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/drawing")
@CrossOrigin()
//origins = { "http://localhost:8080" }
public class controller {
    private ArrayList<shape> shapes = new ArrayList<>();
    private ArrayList<shape> undo = new ArrayList<>();
    private ArrayList<shape> redo = new ArrayList<>();


    @RequestMapping(value = "/shapes", method = RequestMethod.PUT)
    @ResponseBody
    public void setShape(HttpEntity<String> httpEntity) {
        String json = httpEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            this.shapes = mapper.readValue(json, new TypeReference<ArrayList<shape>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/undoShapes", method = RequestMethod.PUT)
    @ResponseBody
    public void setUndo(HttpEntity<String> httpEntity) {
        String json = httpEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            this.undo = mapper.readValue(json, new TypeReference<ArrayList<shape>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/redoShape", method = RequestMethod.PUT)
    @ResponseBody
    public void setRedo(HttpEntity<String> httpEntity) {
        String json = httpEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            this.redo = mapper.readValue(json, new TypeReference<ArrayList<shape>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
    @GetMapping("/save")
    public void saveFile(String name){
        ObjectMapper mapper;
        if(name.indexOf(".json")>0)
           mapper = new ObjectMapper();
        else
            mapper = new XmlMapper();
        try {
            mapper.writeValue(new File("saves//"+name),this.shapes);
            mapper.writeValue(new File("undo//"+name),this.undo);
            mapper.writeValue(new File("redo//"+name),this.redo);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @GetMapping("/getList")
    public ArrayList<String> loadList(){
        ArrayList<String> a = new ArrayList<>();
        File[] files = new File("saves").listFiles();
        for(File f : files)
            a.add(f.getName());

        return  a ;
    }
    @GetMapping("/load")
    public ArrayList<shape> loadData(String file){
        ObjectMapper mapper;
        if(file.indexOf(".json")>=0)
            mapper = new ObjectMapper();
        else
            mapper = new XmlMapper();

                try {
                    this.shapes = mapper.readValue(new File("saves//"+file), new TypeReference<ArrayList<shape>>() {});
                    this.undo =   mapper.readValue(new File("undo//"+file), new TypeReference<ArrayList<shape>>() {});
                    this.redo =   mapper.readValue(new File("redo//"+file), new TypeReference<ArrayList<shape>>() {});
                } catch (IOException e) {
                    e.printStackTrace();
                }

        return  this.shapes;
    }
    @GetMapping("/undo")
    public ArrayList<shape> getUndo(){
        return  this.undo;
    }
    @GetMapping("/redo")
    public ArrayList<shape> getRedo(){
        return  this.redo;
    }
}