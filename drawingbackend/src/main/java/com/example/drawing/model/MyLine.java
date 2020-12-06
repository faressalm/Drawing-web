package com.example.drawing.model;

public class MyLine implements  shape{
    public double x1 ;
    public double y1;
    public double x2 ;
    public double y2;
    public int id;
    public int type;
    public String color ;

    public MyLine(){
        this.setType();
    }
    public MyLine(int id,double x1,double  y1,double  x2,double  y2,String color){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.id = id;
        this.color = color;
    }
    @Override
    public int getType()
    {
        return this.type;
    }
    @Override
    public void setType() {
        this.type = 5 ;
    }
}

