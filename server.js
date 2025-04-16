import express from "express";
import { Liquid } from "liquidjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("view engine", "liquid");
app.set("views", "./views");

function sanitizeInput(input) {
  return input.replace(/<script.*?>.*?<\/script>/gi, "[blocked]");
}

app.get("/livechat", async (req, res) => {
  try {
    const response = await fetch("https://fdnd-agency.directus.app/items/mh_chats", {
      headers: {},
    });

    const data = await response.json();
    const messages = data.data;

    res.render("livechat", {
      page: "radio",
      radiostation: "Live Chat",
      messages,
    });
  } catch (error) {
    console.error("Failed to fetch chat messages:", error);
    res.status(500).send("Error fetching chat messages.");
  }
});

app.post("/livechat", async (req, res) => {
  const { sender, message } = req.body;
  const cleanSender = sanitizeInput(sender);
  const cleanMessage = sanitizeInput(message);

  try {
    await fetch("https://fdnd-agency.directus.app/items/mh_chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: cleanSender,
        message: cleanMessage,
        chathost: 2,
        status: "draft",
      }),
    });

    res.redirect("/livechat");
  } catch (error) {
    console.error("Failed to post chat message:", error);
    res.status(500).send("Error posting chat message.");
  }
});

app.get("/delete-chat/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`https://fdnd-agency.directus.app/items/mh_chats/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      res.send(`Message with ID ${id} deleted`);
    } else {
      const err = await response.text();
      res.status(400).send(`Failed to delete: ${err}`);
    }
  } catch (error) {
    console.error("Error deleting chat message:", error);
    res.status(500).send("Error deleting chat message.");
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
      return res.status(404).send("404 - Not Found");
    }

    const daysRes = await fetch("https://fdnd-agency.directus.app/items/mh_day?fields=*,shows.mh_shows_id.*.*");
    const daysJson = await daysRes.json();
    const allDays = daysJson.data;

    const selectedDate = req.query.date || new Date().toISOString().split("T")[0];
    console.log("Selected date:", selectedDate);
    console.log("Selected station slug:", stationSlug);

    const selectedDateObj = new Date(selectedDate);
    const formattedDate = selectedDateObj.toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const dayOfWeek = selectedDateObj.getDay();

    const referenceDayMap = {};
    allDays.forEach((day) => {
      const date = new Date(day.date);
      referenceDayMap[date.getDay()] = day;
    });

    const matchedDay = referenceDayMap[dayOfWeek];
    console.log("Matched day:", matchedDay);

    const showsWithTimes =
      matchedDay?.shows
        ?.filter((entry) => entry?.mh_shows_id?.show?.radiostation === selectedStation.id)
        .map((entry) => {
          const show = entry.mh_shows_id.show;
          return {
            name: show.name,
            body: show.body,
            thumbnail: show.thumbnail,
            start_time: entry.mh_shows_id.from,
            end_time: entry.mh_shows_id.until,
            id: entry.mh_shows_id.id,
            show_id: show.id,
            weekday: selectedDate
              ? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(selectedDate).getDay()]
              : null,
            date: selectedDate,
          };
        }) || [];

    console.log("Shows with times:", showsWithTimes);
    showsWithTimes.sort((a, b) => a.start_time.localeCompare(b.start_time));

    function timeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    showsWithTimes.forEach((show) => {
      show.start_minutes = timeToMinutes(show.start_time);
      show.end_minutes = timeToMinutes(show.end_time);
    });

    res.render("radio-template", {
      page: "radio",
      radiostation: selectedStation.name,
      selected_day: {
        shows: showsWithTimes,
        formatted_date: formattedDate,
      },
      days: allDays.map((day) => ({
        date: day.date,
        shows: day.shows,
      })),
      currentMinutes,
    });
  } catch (error) {
    console.error("Failed to fetch stations or shows:", error);
    res.status(500).send("Server error");
  }
});

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

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
  console.log(`Server started on http://localhost:${app.get("port")}`);
});
