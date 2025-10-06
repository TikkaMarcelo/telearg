import { addonBuilder } from "stremio-addon-sdk";

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

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(() =>
  Promise.resolve({
    metas: [
      {
        id: "telefe",
        type: "tv",
        name: "Telefe",
        poster: "https://upload.wikimedia.org/wikipedia/commons/1/11/Telefe_Actual.png",
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

// Vercel-compatible wrapper
export default async function handler(req, res) {
  try {
    const interfaceHandler = builder.getInterface();
    // interfaceHandler expects standard Node.js req/res
    // Vercel provides compatible req/res objects
    await interfaceHandler(req, res);
  } catch (err) {
    console.error("Serverless function error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
