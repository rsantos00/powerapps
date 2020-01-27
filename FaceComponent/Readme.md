Face Component

Check the video from: https://www.linkedin.com/posts/ruisantosnor_tensorflowjs-tensorflow-opensource-activity-6627425148507041792-Dzh2

Disclaimer: Part of the code was taken from the awesome dude who hacks https://github.com/justadudewhohacks/face-api.js/ 

To configure the component you will need to host the Tensor Flow models out side of Power Apps, for instance from a Azure WebSite.

After you have the website you can change the file:

1) js\faceIndex.js
2) js\faceLogic.js

In the component you have to change the index.ts file and update the .js entry point here: 

1) script.setAttribute("src","https://arscripts.azurewebsites.net/js/faceIndex.js");
