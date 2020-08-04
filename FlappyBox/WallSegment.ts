namespace FlappyBox {
  import ƒ = FudgeCore;

  export class WallSegment extends ƒ.Node {

    public getRectWorld(): ƒ.Rectangle {
      let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
      let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
      let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
      
      topleft.transform(this.mtxWorld, true);
      bottomright.transform(this.mtxWorld, true);

      let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}