namespace FlappyBox {
  import ƒ = FudgeCore;

  export class Player extends ƒ.Node {
    private static gravity: ƒ.Vector2 = ƒ.Vector2.Y(-9);
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public falling: boolean = true;
    public dead: boolean = false;
    public bird: ƒ.Node = new ƒ.Node("Bird");
    public birdParent: ƒ.Node = new ƒ.Node("BirdParent");
    public birdMaterial: ƒ.Material = new ƒ.Material("BirdMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("rgb(255, 198, 7)")));
    public jumpSpeed: number;
    public jumpAngle: number;
    public jumpRotSpeed: number;
    public fallRotSpeed: number;

    constructor(_name: string = "Player") {
      super(_name);

      //Variables from external data
      this.jumpSpeed = data.playerJumpSpeed;
      this.jumpAngle = data.playerJumpAngle;
      this.jumpRotSpeed = data.playerJumpRotSpeed;
      this.fallRotSpeed = data.playerFallRotSpeed;

      this.createBird();
      this.appendChild(this.birdParent);
      this.addComponent(new ƒ.ComponentTransform);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }


    public createBird(): void {
      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      this.bird.addComponent(cmpMesh);

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(this.birdMaterial);
      this.bird.addComponent(cmpMaterial);

      cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.25));

      this.bird.addComponent(new ƒ.ComponentTransform());
      this.birdParent.addComponent(new ƒ.ComponentTransform());

      this.birdParent.appendChild(this.bird);
      this.birdParent.cmpTransform.local.translateX(-0.5);
    }

    public jump(): void {
      this.speed.y = this.jumpSpeed;
    }

    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speed.y += Player.gravity.y * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      
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
    }

    private checkCollision(): void {
      //Hit Wall check
      for (let walls of level.getChildren()) {
        for (let wallSegments of walls.getChildren()) {
          let rect: ƒ.Rectangle = (<WallSegment>wallSegments).getRectWorld();
          let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
          if (hit) {
            console.log("Hit");
          }
        }
      }
      //Hit Ground check
      if (this.birdParent.mtxLocal.translation.y < -1.4 && this.dead == false) {
        this.dead = true;
      }
    }
  }
}
