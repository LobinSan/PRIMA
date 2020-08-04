"use strict";
var FlappyBox;
(function (FlappyBox) {
    var ƒ = FudgeCore;
    class WallSegment extends ƒ.Node {
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            topleft.transform(this.mtxWorld, true);
            bottomright.transform(this.mtxWorld, true);
            let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    FlappyBox.WallSegment = WallSegment;
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=WallSegment.js.map