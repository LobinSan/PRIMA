"use strict";
var FlappyBox;
(function (FlappyBox) {
    var ƒ = FudgeCore;
    class Player extends ƒ.Node {
        constructor(_name = "Player") {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.falling = true;
            this.dead = false;
            this.bird = new ƒ.Node("Bird");
            this.birdParent = new ƒ.Node("BirdParent");
            this.birdMaterial = new ƒ.Material("BirdMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("rgb(255, 198, 7)")));
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Player.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                if (!this.dead)
                    this.birdParent.cmpTransform.local.translate(distance);
                if (!this.dead) {
                    if (this.speed.y > 0 && this.bird.cmpTransform.local.rotation.z < this.jumpAngle) {
                        this.bird.cmpTransform.local.rotateZ(this.jumpRotSpeed);
                    }
                    else if (this.bird.cmpTransform.local.rotation.z > -this.jumpAngle) {
                        this.bird.cmpTransform.local.rotateZ(-this.fallRotSpeed);
                    }
                }
                this.checkCollision();
            };
            //Variables from external data
            this.jumpSpeed = FlappyBox.data.playerJumpSpeed;
            this.jumpAngle = FlappyBox.data.playerJumpAngle;
            this.jumpRotSpeed = FlappyBox.data.playerJumpRotSpeed;
            this.fallRotSpeed = FlappyBox.data.playerFallRotSpeed;
            this.createBird();
            this.appendChild(this.birdParent);
            this.addComponent(new ƒ.ComponentTransform);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        createBird() {
            let mesh = new ƒ.MeshQuad();
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            this.bird.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(this.birdMaterial);
            this.bird.addComponent(cmpMaterial);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.25));
            this.bird.addComponent(new ƒ.ComponentTransform());
            this.birdParent.addComponent(new ƒ.ComponentTransform());
            this.birdParent.appendChild(this.bird);
            this.birdParent.cmpTransform.local.translateX(-0.5);
        }
        jump() {
            this.speed.y = this.jumpSpeed;
        }
        checkCollision() {
            //Hit Wall check
            /*
            for (let walls of level.getChildren()) {
              for (let wallSegments of walls.getChildren()) {
                let rect: ƒ.Rectangle = (<WallSegment>wallSegments).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                  console.log("Hit");
                }
              }
            }*/
            //Hit Ground check
            if (this.birdParent.mtxLocal.translation.y < -1.4 && this.dead == false) {
                this.dead = true;
            }
        }
    }
    Player.gravity = ƒ.Vector2.Y(-9);
    FlappyBox.Player = Player;
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=Player.js.map