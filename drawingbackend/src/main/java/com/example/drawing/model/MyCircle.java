package com.example.drawing.model;

public class MyCircle implements  shape {
    public double x ;
    public double y;
    public int id;
    public int type;
    public double r ;
    public String color ;
    public String strokeColor ;

    public MyCircle() {
        this.setType();
    }

    public  MyCircle(int id, double x, double y, double r,String color,String strokeColor){
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
        this.color = color;
        this.strokeColor=strokeColor;
    }
    @Override
    public int getType() {
        return this.type;
    }

    @Override
    public void setType() {
        this.type =1 ;
    }
}
