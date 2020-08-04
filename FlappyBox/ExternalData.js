"use strict";
var FlappyBox;
(function (FlappyBox) {
    async function loadJSON() {
        let content = await load("ExternalData/data.json");
        return content;
    }
    FlappyBox.loadJSON = loadJSON;
    async function load(_filename) {
        let response = await fetch(_filename);
        let text = await response.text();
        let json = JSON.parse(text);
        return (json);
    }
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=ExternalData.js.map