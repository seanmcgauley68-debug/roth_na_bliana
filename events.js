let events =
  JSON.parse(
    localStorage.getItem("events")
  ) || [];

if (!Array.isArray(events)) {
  events = [];
}

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

  document.getElementById("eventName").value = "";
  document.getElementById("eventDay").value = "";
  document.getElementById("eventMonth").value = "";
  document.getElementById("eventYear").value = "";
}

document.addEventListener(
  "DOMContentLoaded",
  displayEvents
);