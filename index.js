import express from "express";
const app = express();

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

// Catalog (the tile you’ll see)
app.get("/catalog/:type/:id.json", (req, res) => {
  res.json({
    metas: [
      {
        id: "telefe",
        type: "tv",
        name: "Telefe",
        poster: "https://upload.wikimedia.org/wikipedia/commons/1/11/Telefe_Actual.png?20160318191557",
        description: "Telefe en Vivo"
      }
    ]
  });
});

// Stream (the video link Stremio will play)
app.get("/stream/:type/:id.json", (req, res) => {
  if (req.params.id === "telefe") {
    res.json({
      streams: [
        {
          title: "Telefe en Vivo",
          url: "https://la14hd.com/vivo/canales.php?stream=telefe"
        }
      ]
    });
  } else {
    res.json({ streams: [] });
  }
});

// Manifest (addon info)
app.get("/manifest.json", (req, res) => res.json(manifest));

// Default port for Vercel (important!)
app.listen(process.env.PORT || 3000, () => {
  console.log("Addon running on port 3000");
});
