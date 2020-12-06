package com.example.drawing.model;

public class MyEllipse implements  shape {
    public double x ;
    public double y;
    public int id;
    public int type;
    public double xradius ;
    public double yradius ;
    public String color ;
    public String strokeColor ;
    public MyEllipse(){
        this.setType();
    }
    public MyEllipse(int id,double x,double  y,double  xradius,double  yradius,String color,String strokeColor ){
        this.x = x;
        this.y = y;
        this.xradius = xradius;
        this.yradius = yradius;
        this.id = id;
        this.color = color;
        this.strokeColor = strokeColor;
    }
    @Override
    public int getType() {
        return this.type;
    }

    @Override
    public void setType()
    {
        this.type =3 ;
    }
}
