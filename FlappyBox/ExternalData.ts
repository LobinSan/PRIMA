namespace FlappyBox {

  export interface ExternalData {
    "playerJumpSpeed": number;
    "playerJumpAngle": number;
    "playerFallRotSpeed": number;
    "playerJumpRotSpeed": number;
    "wallSpawnTime": number;
  }

  export async function loadJSON(): Promise<ExternalData> {
    let content: ExternalData = await load("ExternalData/data.json");

    return content;
  }

  async function load(_filename: string): Promise<ExternalData> {
    let response: Response = await fetch(_filename);

    let text: string = await response.text();
    let json: ExternalData = JSON.parse(text);

    return (json);
  }
}