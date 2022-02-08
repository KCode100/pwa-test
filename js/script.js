// only run if browser supports service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js") // register the sw
    .then((reg) => console.log("service worker is registered", reg))
    .catch((err) => console.log("service worker NOT registered", err));
}
