class Point {


  private  x : number;
  private y : number;

    constructor(x? : number, y? : number){ //Optional 

        this.x = x;
        this.y = y;
    }


    get X(){
        return this.x;
    }

    set X(value){
        this.x = value;
    }

    get Y(){
        return this.y;
    }

    set Y(value){
        this.y=value;
    }

    draw(){
        console.log("X : "  + this.x + " Y : " + this.y);
    }

}


let point2 = new Point;
point2.X = 12;
let X = point2.X;
point2.draw();