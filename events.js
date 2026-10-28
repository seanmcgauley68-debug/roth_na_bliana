window.events =
  JSON.parse(
    localStorage.getItem("events")
  ) || [];

if (!Array.isArray(events)) {
  events = [];
}
const builtInEvents = [
  { name: "Imbolc", day: 1, month: 2 },
  { name: "Spring Equinox", day: 20, month: 3 },
  { name: "Bealtaine", day: 1, month: 5 },
  { name: "Summer Solstice", day: 21, month: 6 },
  { name: "Lúnasa", day: 1, month: 8 },
  { name: "Autumn Equinox", day: 22, month: 9 },
  { name: "Samhain", day: 31, month: 10 },
  { name: "Winter Solstice", day: 21, month: 12 }
];
function displayEvents() {

  const list =
    document.getElementById("eventList");

  if (!list) return;

  list.innerHTML = events
    .map(e =>
      `📅 ${e.name}<br>${e.day}/${e.month}/${e.year}`
    )
    .join("<hr>");
}

function showNextEvent() {

  const box =
    document.getElementById("upcomingEvents");

  if (!box) return;

  if (events.length === 0) {
    box.innerHTML = "";
    return;
  }

  const today = new Date();

  let next = null;
  let smallestDiff = Infinity;

  events.forEach(e => {

    const eventDate = new Date(
      Number(e.year),
      Number(e.month) - 1,
      Number(e.day)
    );

    if (eventDate < today) {
      return;
    }

    const diff =
      eventDate - today;

    if (diff < smallestDiff) {
      smallestDiff = diff;
      next = e;
    }

  });

  if (!next) {
    box.innerHTML = "";
    return;
  }

  const daysAway =
    Math.ceil(
      smallestDiff / 86400000
    );

  box.innerHTML = `
    📅 ${next.name}<br>
    ${next.day}/${next.month}/${next.year}<br>
    ${daysAway} days away
  `;
}

function addEvent() {

  const name =
    document.getElementById("eventName").value;

  const day =
    document.getElementById("eventDay").value;

  const month =
    document.getElementById("eventMonth").value;

  const year =
    document.getElementById("eventYear").value;

  if (!name || !day || !month || !year) {
    return;
  }

  events.push({
    name,
    day,
    month,
    year
  });

  localStorage.setItem(
    "events",
    JSON.stringify(events)
  );

  displayEvents();
  showNextEvent();

  document.getElementById("eventName").value = "";
  document.getElementById("eventDay").value = "";
  document.getElementById("eventMonth").value = "";
  document.getElementById("eventYear").value = "";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    displayEvents();
    showNextEvent();
  }
);