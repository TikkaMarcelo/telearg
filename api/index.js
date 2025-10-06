import { addonBuilder } from "stremio-addon-sdk";

const manifest = {
  id: "org.telefe.live",
  version: "1.0.0",
  name: "Telefe Argentina en Vivo",
  description: "Telefe Argentina en Vivo",
  resources: ["catalog", "stream"],
  types: ["tv"],
  catalogs: [
    {
      type: "tv",
      id: "telefe_catalog",
      name: "Telefe Channel"
    }
  ]
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(() =>
  Promise.resolve({
    metas: [
      {
        id: "telefe",
        type: "tv",
        name: "Telefe",
        poster:
          "https://upload.wikimedia.org/wikipedia/commons/1/11/Telefe_Actual.png?20160318191557",
        description: "Telefe en Vivo"
      }
    ]
  })
);

builder.defineStreamHandler(({ id }) =>
  id === "telefe"
    ? Promise.resolve({
        streams: [
          {
            title: "Telefe en Vivo",
            url: "https://la14hd.com/vivo/canales.php?stream=telefe"
          }
        ]
      })
    : Promise.resolve({ streams: [] })
);

// ✅ Wrap the addon interface in a Vercel serverless handler
export default async function handler(req, res) {
  const interfaceHandler = builder.getInterface();
  return interfaceHandler(req, res);
}
