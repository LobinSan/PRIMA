namespace FlappyBox {
  import ƒ = FudgeCore;

  export class Wall extends ƒ.Node {
    public static speed: ƒ.Vector2 = ƒ.Vector2.X(-100);
    public speedTimeFrame: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public stopMovement: boolean = false;


    public constructor() {
      super("Wall");
      this.addComponent(new ƒ.ComponentTransform());
      this.createWall();
      this.cmpTransform.local.scaleY(0.5);
      this.cmpTransform.local.scaleX(0.5);
      this.cmpTransform.local.translateX(6);
      this.cmpTransform.local.translateY(4);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public createWall(): void {
      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
      let wallMaterial: ƒ.Material = new ƒ.Material("WallMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("rgb(122, 195, 49)")));

      let hole: number = Math.floor(Math.random() * 5) + 1;

      for (let i: number = 0; i < 8; i++) {
        if (i != hole && i != hole + 1) {
          let segment: WallSegment = new WallSegment("Wall");

          let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
          segment.addComponent(cmpMesh);
          //cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.95));

          let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(wallMaterial);
          segment.addComponent(cmpMaterial);

          segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, -1 * i, 0))));

          this.addChild(segment);
        }
      }
    }

    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.speedTimeFrame.x = Wall.speed.x * timeFrame;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speedTimeFrame, timeFrame);

      if (!this.stopMovement)
        this.cmpTransform.local.translate(distance);
    }
  }
}