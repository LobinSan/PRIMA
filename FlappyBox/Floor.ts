namespace FlappyBox {
  import ƒ = FudgeCore;

  export class Floor extends ƒ.Node {

    public constructor() {
      super("Floor");
      this.createFloor();
    }

    public createFloor(): void {
      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad(); 
      let floorMaterial: ƒ.Material = new ƒ.Material("Floor", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("rgb(239, 209, 170)"))); //brown
      
      let floor: ƒ.Node = new ƒ.Node("Wall");
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      floor.addComponent(cmpMesh);
      let cmpMaterial1: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(floorMaterial);
      floor.addComponent(cmpMaterial1);
      floor.addComponent(new ƒ.ComponentTransform());
      floor.cmpTransform.local.scaleX(5);
      floor.cmpTransform.local.translateY(-2);
      this.appendChild(floor); 
    }
  }
}