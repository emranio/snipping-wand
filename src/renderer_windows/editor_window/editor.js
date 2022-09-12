import "./stylesheets/main.css";

// Everything below is just a demo. You can delete all of it.

import { ipcRenderer } from "electron";

document.querySelector("#app").style.display = "block";

ipcRenderer.on('sync', function (evt, data) {
  console.log(data); // prints "foo"
  document.querySelector("#output-img").src = data;
});
