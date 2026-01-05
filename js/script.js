if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sworker.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.error("Service Worker registration failed", err));
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault(); // stop auto mini-infobar
  deferredPrompt = event;

  // Show your custom install button or popup
  const installBtn = document.getElementById("installBtn");
  installBtn.style.display = "block";

  installBtn.addEventListener("click", async () => {
    installBtn.style.display = "none";
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    console.log(choiceResult.outcome);

    deferredPrompt = null;
  });
});

