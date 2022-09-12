import "./stylesheets/main.css";

// Everything below is just a demo. You can delete all of it.

import { ipcRenderer } from "electron";
import jetpack from "fs-jetpack";
import { greet } from "./hello_world/hello_world";
import env from "env";

document.querySelector("#app").style.display = "block";

ipcRenderer.on('sync', function (evt, data) {
  console.log(data); // prints "foo"
  document.querySelector("#output-img").src = data;
});
