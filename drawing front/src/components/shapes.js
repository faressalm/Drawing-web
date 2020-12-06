class shapeFactory{
    constructor(type,props){
        switch(type){
            case 1:{
                return new MyCircle(props.id,props.x, props.y, props.r, props.type, props.color, props.strokeColor)
            }
            case 2:{
                return new MyRect(props.id,props.x, props.y, props.width, props.height, props.type, props.color, props.strokeColor)
            }
            case 3:{
                return new MyEllipse(props.id,props.x, props.y, props.xradius, props.yradius, props.type, props.color, props.strokeColor)
            }
            case 4:{
                return new MyRect(props.id,props.x, props.y, props.width, props.width, props.type, props.color, props.strokeColor)
            }
            case 5:{
                return new MyLine(props.id,props.x1, props.y1, props.x2, props.y2, props.type, props.color)
            }
            case 6:{
                return new MyTraingle(props.id, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, props.type, props.color, props.strokeColor)
            }
        }
    }
}
class shape{
    constructor(id,x,y,type,color,strokeColor){
        this.x = x;
        this.y = y;
        this.id = id;
        this.type = type;
        this.color = color;
        this.strokeColor = strokeColor;
    }
    move(x,y){
        this.x += x;
        this.y += y;
    }
}
class MyCircle extends shape{
    constructor(id,x, y, r, type, color, strokeColor){
        super(id,x,y,type,color,strokeColor)
        this.r = r;
    }
    copy(){
        return new MyCircle(this.id,this.x,this.y,this.r,this.type,this.color,this.strokeColor);
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        if(this.color != '#ffffffff') {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if(this.strokeColor != '#ffffffff') {
            ctx.strokeStyle = this.strokeColor;
        }
        else{
            ctx.strokeStyle = "black";
        }
        ctx.stroke();
        ctx.closePath();
    }
    clicked(clickedX, clickedY,ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.closePath();
        if(ctx.isPointInPath(clickedX,clickedY)){
            let dis = this.r - Math.sqrt((this.x-clickedX) * (this.x-clickedX) + (this.y-clickedY) * (this.y-clickedY));
            if(dis < 10){
                return [this.id,1];
            }
            return [this.id,-1];
        }
        return [-1,-1];
    }
    resize(x,y){
        this.r = Math.sqrt((this.x-x) * (this.x-x) + (this.y-y) * (this.y-y));
    }
}
class MyRect extends shape{
    constructor(id,x, y, width, height ,type, color, strokeColor){
        super(id,x,y,type,color,strokeColor)
        this.width = width;
        this.height = height;
    }
    copy(){
        return new MyRect(this.id,this.x,this.y,this.width,this.height,this.type,this.color,this.strokeColor);
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if(this.color != '#ffffffff') {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if(this.strokeColor != '#ffffffff') {
            ctx.strokeStyle = this.strokeColor;
        }
        else{
            ctx.strokeStyle = "black";
        }
        ctx.stroke();
        ctx.closePath();
    }
    clicked(clickedX, clickedY, ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        if(ctx.isPointInPath(clickedX,clickedY)){
            let w = Math.abs(this.x - clickedX);
            let h = Math.abs(this.y - clickedY);
            if(this.width - w < 10 && this.height - h < 10){
                return[this.id,1];
            }
            return [this.id,-1];
        }
        return [-1,-1];
    }
    resize(x,y){
        if(this.type == 2){
            this.width = Math.abs(this.x - x);
            this.height = Math.abs(this.y - y);
        }
        else{
            let dis;
            dis = Math.sqrt((this.x-x) * (this.x-x) + (this.y-y) * (this.y-y));
            this.width = dis/Math.sqrt(2);
            this.height = this.width;
        }
    }
}
class MyEllipse extends shape{
    constructor(id,x, y, xradius, yradius, type, color, strokeColor){
        super(id,x, y, type, color, strokeColor);
        this.xradius = xradius;
        this.yradius = yradius; 
    }
    copy(){
        return new MyEllipse(this.id,this.x,this.y,this.xradius,this.yradius,this.type,this.color,this.strokeColor);
    }
    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.xradius, this.yradius, 0, 0, 2 * Math.PI);
        if(this.color != '#ffffffff') {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if(this.strokeColor != '#ffffffff') {
            ctx.strokeStyle = this.strokeColor;
        }
        else{
            ctx.strokeStyle = "black";
        }
        ctx.stroke();
        ctx.closePath();
    }
    clicked(clickedX, clickedY, ctx){
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.xradius, this.yradius, 0, 0, 2 * Math.PI);
        ctx.closePath();
        if(ctx.isPointInPath(clickedX,clickedY)){
            let dist = Math.sqrt(((this.x-clickedX) * (this.x-clickedX)) + ((this.y-clickedY) * (this.y-clickedY)));
            if((this.xradius - dist < 10 && Math.abs(this.y - clickedY) < 10) || (this.yradius - dist < 10 && Math.abs(this.x - clickedX) < 10)){
                return[this.id,1];
            }
            return [this.id,-1];
        }
        return [-1,-1];
    }
    resize(x,y){
        let dis = Math.sqrt((this.x-x) * (this.x-x) + (this.y-y) * (this.y-y));
        if(Math.abs(this.y - y) < 10){
            this.xradius = dis;
        }
        else if(Math.abs(this.x - x) < 10) {
            this.yradius = dis;
        }
    }
}
class MyLine extends shape{
    constructor(id,x1, y1, x2, y2, type, color){
        super(id,x1, y1, type, color, color);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    copy(){
    return new MyLine(this.id,this.x1,this.y1,this.x2,this.y2,this.type,this.color);
    }
    draw(ctx){
        ctx.beginPath(); 
        ctx.moveTo(this.x1,this.y1);
        ctx.lineTo(this.x2,this.y2);
        if(this.color != '#ffffffff') {
            ctx.strokeStyle = this.color;
        }else{
            ctx.strokeStyle = "black";
        }
        ctx.stroke(); 
        ctx.closePath();
    }
    clicked(clickedX, clickedY){
        var p = {x:clickedX,y:clickedY};
        var v = {x:this.x1,y:this.y1};
        var w = {x:this.x2,y:this.y2};
        let temp = this.distToSegment(p,v,w);
        if(temp < 10){
            let dist1 = Math.sqrt((this.x1-clickedX) * (this.x1-clickedX) + (this.y1-clickedY) * (this.y1-clickedY));
            let dist2 = Math.sqrt((this.x2-clickedX) * (this.x2-clickedX) + (this.y2-clickedY) * (this.y2-clickedY));
            if(dist1 < dist2 && dist1 < 10){//close to which point in case of resize
                return [this.id,2];
            }
            else if(dist2 < dist1 && dist2 < 10){
                return [this.id,3];
            }
            return [this.id,-1];
        }
        return [-1,-1];
    }
    distToSegmentSquared(p, v, w) {
        var l2 = this.dist2(v, w);
        if (l2 == 0) return this.dist2(p, v);
        var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return this.dist2(p, { x: v.x + t * (w.x - v.x),y: v.y + t * (w.y - v.y) });
    }
    sqr(x) { return x * x }
    dist2(v, w) { return this.sqr(v.x - w.x) + this.sqr(v.y - w.y) }
    distToSegment(p, v, w) { return Math.sqrt(this.distToSegmentSquared(p, v, w)); }
    move(x,y){
        this.x2 += x;
        this.y2 += y;
        this.x1 += x;
        this.y1 += y;
    }
    resize(x,y,p){
      if(p == 2){
          this.x1 = x;
          this.y1 = y;
        }
        else if(p == 3){
          this.x2 = x;
          this.y2 = y;
      }
    }
}

class MyTraingle extends shape{
    constructor(id,x1, y1, x2, y2, x3, y3, type, color, strokeColor){
        super(id,x1, y1, type, color, strokeColor);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }
    copy(){
        return new MyTraingle(this.id,this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.type,this.color,this.strokeColor);
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        if(this.color != '#ffffffff') {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if(this.strokeColor != '#ffffffff') {
            ctx.strokeStyle = this.strokeColor;
        }
        else{
            ctx.strokeStyle = "black";
        }
        ctx.closePath();
        ctx.stroke();
    }
    clicked(clickedX,clickedY,ctx){
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.closePath();
        if (ctx.isPointInPath(clickedX, clickedY)) {
            let dist1 = Math.sqrt((this.x1-clickedX) * (this.x1-clickedX) + (this.y1-clickedY) * (this.y1-clickedY));
            let dist2 = Math.sqrt((this.x2-clickedX) * (this.x2-clickedX) + (this.y2-clickedY) * (this.y2-clickedY));
            let dist3 = Math.sqrt((this.x3-clickedX) * (this.x3-clickedX) + (this.y3-clickedY) * (this.y3-clickedY));
            if(dist1 < dist2 && dist1 < dist3 && dist1 < 15){//close to which point in case of resize
                return [this.id,2];
            }
            else if(dist2 < dist1 && dist2 < dist3 && dist2 < 15){
                return [this.id,3];
            }
            else if(dist3 < 15){
                return [this.id,4]
            }
            return [this.id,-1]
        }
        return [-1,-1];
    }
    move(x,y){
        this.x3 += x;
        this.y3 += y;
        this.x2 += x;
        this.y2 += y;
        this.x1 += x;
        this.y1 += y;
    }
    resize(x,y,p){
        if(p == 2){
            this.x1 = x;
            this.y1 = y;
        }
        else if(p == 3){
            this.x2 = x;
            this.y2 = y;
        }
        else if (p == 4){
            this.x3 = x;
            this.y3 = y;
        }
      }
}
export{MyTraingle};
export{MyLine};
export {MyRect};
export {MyEllipse};
export {MyCircle};
export {shapeFactory};