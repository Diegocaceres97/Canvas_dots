const canvas = document.getElementById('sandbox');
canvas.width = window.innerWidth;//paso para que el elemento canvas ocupe todo
canvas.height = window.innerHeight;
var numerodots = prompt("Cuantos bolas deseas ver?");
const numero = document.createElement('p');
numero.innerText = "Hola";
canvas.appendChild(numero);
const ctx = canvas.getContext('2d');

function Circle(x,y,r,c){
    /**La x hace referencia a la coordenada x al igual la Y la R al radio y la C al color
     * Nombramos *inicializamos( despues los objetos estos a utilizar
     */
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
this.dx = (Math.random()*1000)+1;//velocidad de movimiento en los planos
this.dx = Math.floor(Math.random()*2)==1 ? 1 : -1;//colocamos para que las direcciones seand e forma random
this.dy = (Math.random()*1000)+1; 
this.dy = Math.floor(Math.random()*2)==1 ? 1 : -1;

this.draw = function(){
    ctx.beginPath();//inicializa o resetear los path(caminos)
    ctx.fillStyle = this.c; //llenamos el circulo del color que le pasemos
    ctx.arc(this.x,this.y,this.r,0,Math.PI *2);//lo ultimo significa que inicia de 0 y va decreciendo
    ctx.fill();//creamos el objeto en el espacio existente
}
this.animate = function(){ //animacion que crece de forma prograsiva randomica y que se dibuja acorde a esto
    this.x += this.dx;
    this.y += this.dy;
    //Con estos condicionales cuida que las bolas floten dentro del marco de la pagina
    if(this.x + this.r > canvas.width || this.x - this.r < 0){
        this.dx = -this.dx;
    }
    if(this.y + this.r > canvas.height || this.y - this.r < 0){
        this.dy = -this.dy;
    }
    //esta lo dibuja o plasma en la funcion
    this.draw();
}
}
var balls = new Array;
for(let i=0;i<numerodots;i++){
    let r = Math.floor(Math.random()*30)+15;//Math.Floor es un metodo matematico que retorna el largo entero 
    //menos el numero dado o igual al numero dado
let x = Math.random()*(canvas.width - r*2)+r;
let y = Math.random()*(canvas.height - r*2)+r;
let c = "#"+((1<<24)*Math.random()|0).toString(16);
balls.push(new Circle(x,y,r,c));
}

//con este listener creamos una bola nueva a partir de que le demos click a alguna ubicada en el espacio o pagina
canvas.addEventListener('click', function(e){
let r = Math.floor(Math.random()* 40)+15;
balls.push(new Circle(e.clientX, e.clientY, r, 'black'));
});

function Update(){
    ctx.clearRect(0,0, canvas.width,canvas.height);
    for(let i=0;i<balls.length;i++){
        balls[i].animate(); //aniimamos cada pelota creada anteriormente de forma aleatoria en el dom
    }

requestAnimationFrame(Update); //llama al navegador de alguna forma para que inicie la animacion y para que se actualice también automaticamente
// de la forma en que uno desee, el metodo como tal tiene un callback como argumento para ser invocado antes de repintar (actualizar la animacionn)
}
Update();