const express = require("express");
const { google } = require("googleapis");

const dotenv = require("dotenv");
const { log } = require("console");
dotenv.config();

//server
const app = express();
const PORT = process.env.ENV_PORT || 8000;
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

//the calendar
const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY,
});

const scopes = ["https://www.googleapis.com/auth/calendar"];

//ROUTES
app.get("/google", (req, res) => {

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});

app.get("/", (req, res) => {
  res.send("main menu");
});

app.get("/google/redirect", async (req, res) => {
  console.log("/google/redirect");
  const tokens = oauth2Client.getToken(req.query.code);
  tokens.then((data) => {
    oauth2Client.setCredentials(data.tokens);
  });
  setTimeout(() => {
    res.redirect("/schedule");
  }, 500);
});

app.get("/schedule", (req, res) => {
  const event = {
    summary: "Google I/O 2023",
    location: "Ha Noi",
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: "2023-07-27T13:00:00",
      timeZone: "Asia/Bangkok",
    },
    end: {
      dateTime: "2023-07-27T18:00:00",
      timeZone: "Asia/Bangkok",
    },
  };
  log(oauth2Client);
  calendar.events.insert(
    {
      auth: oauth2Client,
      calendarId: "primary",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.htmlLink);
    }
  );
  res.redirect('/google');
});

app.listen(PORT, () => {
  console.log(`Server's ready on port ${PORT}`);
});
