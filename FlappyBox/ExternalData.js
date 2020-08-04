"use strict";
var FlappyBox;
(function (FlappyBox) {
    async function loadJSON() {
        console.log("Start load");
        let content = await load("ExternalData/data.json");
        console.log("Done load");
        console.log(content);
        return content;
    }
    FlappyBox.loadJSON = loadJSON;
    async function load(_filename) {
        console.log("Start fetch");
        let response = await fetch(_filename);
        let text = await response.text();
        let json = JSON.parse(text);
        console.log("Done fetch");
        return (json);
    }
})(FlappyBox || (FlappyBox = {}));
//# sourceMappingURL=ExternalData.js.map