var imported = document.createElement('script');
imported.src = 'https://arscripts.azurewebsites.net/js/face-api.js';
//imported.defer = true;
document.head.appendChild(imported);

imported = document.createElement('script');
imported.src = 'https://arscripts.azurewebsites.net/js/faceLogic.js';
imported.defer = true;
document.head.appendChild(imported);
