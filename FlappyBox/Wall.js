"use strict";
var FlappyBox;
(function (FlappyBox) {
    var ƒ = FudgeCore;
    class Wall extends ƒ.Node {
        constructor() {
            super("Wall");
            this.speedTimeFrame = ƒ.Vector3.ZERO();
            this.stopMovement = false;
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speedTimeFrame.x = Wall.speed.x * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speedTimeFrame, timeFrame);
                if (!this.stopMovement)
                    this.cmpTransform.local.translate(distance);
            };
            this.addComponent(new ƒ.ComponentTransform());
            this.createWall();
            this.cmpTransform.local.scaleY(0.5);
            this.cmpTransform.local.scaleX(0.5);
            this.cmpTransform.local.translateX(6);
            this.cmpTransform.local.translateY(4);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        createWall() {
            let mesh = new ƒ.MeshQuad();
            let wallMaterial = new ƒ.Material("WallMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("rgb(122, 195, 49)")));
            let hole = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1) {
                    let segment = new FlappyBox.WallSegment("Wall");
                    let cmpMesh = new ƒ.ComponentMesh(mesh);
                    segment.addComponent(cmpMesh);
                    cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.95));
                    let cmpMaterial = new ƒ.ComponentMaterial(wallMaterial);
                    segment.addComponent(cmpMaterial);
                    segment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, -1 * i, 0))));
                    this.addChild(segment);
                }
            }
        }
    }
    Wall.speed = ƒ.Vector2.X(-100);
    FlappyBox.Wall = Wall;
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=Wall.js.map