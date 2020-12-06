package com.example.drawing.model;

public class MyTriangle implements  shape{

    public double x1;
    public double y1;
    public double x2;
    public double y2;
    public double x3;
    public double y3;
    public int type;
    public int id ;
    public String color;
    public  String strokeColor ;
    public  MyTriangle(){
        this.setType();
    }
    public  MyTriangle(int id,double x1,double  y1,double  x2,double  y2,double  x3,double y3,String  color,String strokeColor ){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.id = id;
        this.color = color;
        this.strokeColor= strokeColor;
    }
    @Override
    public int getType() {
        return this.type;
    }

    @Override
    public void setType() {
        this.type = 6 ;

    }
}
