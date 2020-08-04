namespace FlappyBox {

  export interface ExternalData {
    "playerJumpSpeed": number;
    "playerJumpAngle": number;
    "playerFallRotSpeed": number;
    "playerJumpRotSpeed": number;
    "wallSpawnTime": number;
  }

  export async function loadJSON(): Promise<ExternalData> {
    console.log("Start load");
    let content: ExternalData = await load("ExternalData/data.json");
    console.log("Done load");

    console.log(content);
    return content;
  }

  async function load(_filename: string): Promise<ExternalData> {
    console.log("Start fetch");

    let response: Response = await fetch(_filename);

    let text: string = await response.text();
    let json: ExternalData = JSON.parse(text);

    console.log("Done fetch");
    return (json);
  }
}