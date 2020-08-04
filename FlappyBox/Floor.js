"use strict";
var FlappyBox;
(function (FlappyBox) {
    var ƒ = FudgeCore;
    class Floor extends ƒ.Node {
        constructor() {
            super("Floor");
            this.createFloor();
        }
        createFloor() {
            let mesh = new ƒ.MeshQuad();
            let floorMaterial = new ƒ.Material("Floor", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("rgb(239, 209, 170)"))); //brown
            let floor = new ƒ.Node("Wall");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            floor.addComponent(cmpMesh);
            let cmpMaterial1 = new ƒ.ComponentMaterial(floorMaterial);
            floor.addComponent(cmpMaterial1);
            floor.addComponent(new ƒ.ComponentTransform());
            floor.cmpTransform.local.scaleX(5);
            floor.cmpTransform.local.translateY(-2);
            this.appendChild(floor);
        }
    }
    FlappyBox.Floor = Floor;
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=Floor.js.map