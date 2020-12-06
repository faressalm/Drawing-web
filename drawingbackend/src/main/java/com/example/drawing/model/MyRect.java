package com.example.drawing.model;

public class MyRect implements  shape {
    public double x ;
    public double y;
    public int id;
    public int type;
    public double width ;
    public double height ;
    public String color ;
    public String strokeColor ;
    public MyRect(){
        this.setType();
    }
    public MyRect(int id,double x,double  y,double  width, double height ,int type,String color,String strokeColor ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
        this.type = type;
        this.color = color;
        this.strokeColor = color;
    }
    @Override
    public int getType() {
        return this.type;
    }

    @Override
    public void setType() {
        this.type =2 ;
    }
}