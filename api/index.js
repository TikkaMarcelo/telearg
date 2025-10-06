import { addonBuilder } from "stremio-addon-sdk";

// 1️⃣ Create the manifest
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

// 2️⃣ Create the addon builder
const builder = new addonBuilder(manifest);

// 3️⃣ Define catalog handler
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

// 4️⃣ Define stream handler
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

// 5️⃣ ✅ Vercel-compatible serverless export
export default async function handler(req, res) {
  try {
    const interfaceHandler = builder.getInterface();
    interfaceHandler(req, res); // Connect/Express handler wrapped inside Vercel function
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
