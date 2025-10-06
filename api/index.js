import { addonBuilder } from "stremio-addon-sdk";

// Manifest
const manifest = {
  id: "org.telefe.live",
  version: "1.0.0",
  name: "Telefe Argentina en Vivo",
  description: "Telefe Argentina en Vivo",
  resources: ["catalog", "stream"],
  types: ["tv"],
  catalogs: [
    { type: "tv", id: "telefe_catalog", name: "Telefe Channel" }
  ]
};

// Create the addon builder
const builder = new addonBuilder(manifest);

// Catalog handler
builder.defineCatalogHandler(() =>
  Promise.resolve({
    metas: [
      {
        id: "telefe",
        type: "tv",
        name: "Telefe",
        poster:
          "https://upload.wikimedia.org/wikipedia/commons/1/11/Telefe_Actual.png",
        description: "Telefe en Vivo"
      }
    ]
  })
);

// Stream handler
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

// ✅ Vercel-compatible serverless export
export default function handler(req, res) {
  const interfaceHandler = builder.getInterface();
  interfaceHandler(req, res);
}
