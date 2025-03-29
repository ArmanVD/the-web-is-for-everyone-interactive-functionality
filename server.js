import express from "express";
import { Liquid } from "liquidjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("view engine", "liquid");
app.set("views", "./views");

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://fdnd-agency.directus.app/items/mh_radiostations");
    const json = await response.json();
    const stations = json.data;

    const slugify = (str) =>
      str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/%/g, "percent")
        .replace(/[^a-z0-9\-]/g, "");

    const stationsWithSlugs = stations.map((station) => ({
      ...station,
      slug: slugify(station.name),
    }));

    res.render("index", {
      page: "home",
      stations: stationsWithSlugs,
    });
  } catch (error) {
    console.error("Failed to fetch stations:", error);
    res.status(500).send("Server error");
  }
});

app.get("/:station", async (req, res) => {
  const stationSlug = req.params.station;

  try {
    const response = await fetch("https://fdnd-agency.directus.app/items/mh_radiostations");
    const json = await response.json();
    const allStations = json.data;

    const slugify = (str) =>
      str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/%/g, "percent")
        .replace(/[^a-z0-9\-]/g, "");

    const stationsWithSlugs = allStations.map((station) => ({
      ...station,
      slug: slugify(station.name),
    }));

    const selectedStation = stationsWithSlugs.find((station) => station.slug === stationSlug);

    if (!selectedStation) {
      return res.status(404).render("404");
    }

    // Fetch shows and filter by radiostation ID
    const showsResponse = await fetch("https://fdnd-agency.directus.app/items/mh_show");
    const showsJson = await showsResponse.json();
    const stationShows = showsJson.data.filter((show) => show.radiostation === selectedStation.id);

    // Pick first show as current (placeholder)
    const currentShow = stationShows[0] || {};
    const current_song = {
      show: currentShow.name || "",
      dj: currentShow.users?.[0] || "",
      title: "Back To Black",
      artist: "Amy Winehouse",
      image: currentShow.thumbnail ? `https://fdnd-agency.directus.app/assets/${currentShow.thumbnail}` : "",
    };

    res.render("radio-template", {
      page: "radio",
      radiostation: selectedStation.name,
      radio: selectedStation,
      current_song,
      previous_songs: [],
    });
  } catch (error) {
    console.error("Failed to fetch stations or shows:", error);
    res.status(500).send("Server error");
  }
});

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {});
