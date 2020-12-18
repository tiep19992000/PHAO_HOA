
class particle {
    constructor(bullet, deg) {
        this.bullet = bullet;
        this.ctx = bullet.ctx;
        this.deg = deg;
        this.x = this.bullet.x;
        this.y = this.bullet.y;
        this.color = this.bullet.color;
        this.size = 10;
        this.speed = Math.random() * 4 + 5;
        this.speedX = 3;
        this.speedY = 0;
        this.fallSpeed = 0;
        this.dots = [
            {
                //x:10,y:10,alpha:1,size:10
            }

        ];

    }
    update() {
        this.speed -= 0.3;
        if (this.speed < 0) {
            this.speed = 0;
        }

        //fall speed
        this.fallSpeed += 0.1;
        this.speedX = this.speed * Math.cos(this.deg);
        this.speedY = this.speed * Math.sin(this.deg) + this.fallSpeed;
        //calculate
        this.x += this.speedX;
        this.y += this.speedY;


        if (this.size > 0.1) {
            this.size -= 0.1;
        }
        if (this.size > 0) {
            this.dots.push(
                {
                    x: this.x, y: this.y, alpha: 1, size: this.size
                }
            );
        }
        this.dots.forEach(dot => {
            dot.size -= 0.05;
            dot.alpha -= 0.05;
        });
        this.dots = this.dots.filter(dot => {
            return dot.size > 0;
        }

        )
        if (this.dots.length == 0) {
            this.remove();
        }
    }
    remove() {
        this.bullet.particles.splice(this.bullet.particles.indexOf(this), 1);
    }
    draw() {
        this.dots.forEach(dot => {
            this.ctx.fillStyle = 'rgba(' + this.color + ',' + dot.alpha + ')';
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
            this.ctx.fill();
        })

    }
}
class bullet {
    constructor(fireworks) {
        this.fireworks = fireworks;
        this.ctx = fireworks.ctx;
        this.x = Math.random() * 1400;
        this.y = Math.random() * 800;
        this.color = Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255);
        this.particles = [];
        //create one particle
        let bulletDeg = Math.PI * 2 / 10;
        for (let i = 0; i < 10; i++) {
            let newParticle = new particle(this, i * bulletDeg);
            this.particles.push(newParticle);
        }




    }
    remove() {
        this.fireworks.bullet.splice(this.fireworks.bullets.indexOf(this), 1);
    }
    update() {
        if (this.particles.length == 0) {
            this.remove();
        }
        this.particles.forEach(particle => particle.update());
    }
    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}
class fireworks {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1400;
        this.canvas.height = 800;
        document.body.appendChild(this.canvas);
        this.bullets = [];
        setInterval(() => {
            let newBullet = new bullet(this);
            this.bullets.push(newBullet);
        }, 1000);



        this.loop();
    }
    loop() {
        this.bullets.forEach(bullet => bullet.update());
        this.draw();

        setTimeout(() => this.loop(), 20);
    }
    clearScreen() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, 800, 1400);

    }
    draw() {
        this.clearScreen();
        this.bullets.forEach(bullet => bullet.draw());
    }

}
var f = new fireworks();