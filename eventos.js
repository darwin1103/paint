var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

document.addEventListener("keydown", dibujarTeclado);
var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var x = 150;
var y = 150;
var dibujando = false;
var color = "black";
var grosor = 1;

function dibujarLinea(xinicial, yinicial, xfinal, yfinal)
{
    papel.beginPath();
    papel.strokeStyle = color;
    papel.lineWidth = grosor;
    papel.moveTo(xinicial, yinicial);
    papel.lineTo(xfinal, yfinal);
    papel.stroke();
    papel.closePath();
}

function dibujarTeclado(evento)
{
    m = 1;
    switch(evento.keyCode)
    {
        case teclas.UP:
            dibujarLinea(x, y, x, y - m);
            y = y - m;
        break;
        case teclas.DOWN:
            dibujarLinea(x, y, x, y + m);
            y = y + m;
        break;
        case teclas.LEFT:
            dibujarLinea(x, y, x - m, y);
            x = x - m;
        break;
        case teclas.RIGHT:
            dibujarLinea(x, y, x + m, y);
            x = x + m;
        break;
        default:
            console.log("Otra tecla");
        break;
    }
}

var rect = cuadrito.getBoundingClientRect();

function defcolor(c)
{
    color = c;
}

function defgrosor(g)
{
    grosor = g;
}

cuadrito.addEventListener("mousedown", function(e){
    x=e.clientX - rect.left;
    y=e.clientY - rect.top;
    dibujando=true
});

cuadrito.addEventListener("mousemove", function(e){
    if (dibujando===true){
        dibujarLinea(x, y, e.clientX - rect.left, e.clientY - rect.top);
        x= e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
});

cuadrito.addEventListener("mouseup", function (e){
    if(dibujando===true){
       dibujarLinea(x, y, e.clientX - rect.left, e.clientY - rect.top);
       x=0;
       y=0;
       dibujando=false; 
    }
});
