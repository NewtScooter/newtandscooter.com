document.querySelectorAll("[data-share]").forEach((button) => {
  button.addEventListener("click", async () => {
    const status = button.parentElement.querySelector("[data-share-status]");
    const url = new URL("/", window.location.href).toString();
    const shareData = {
      title: "Newt & Scooter Studios",
      text: "Independent games and interactive experiences, made in Ontario.",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        if (status) status.textContent = "Shared.";
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        if (status) status.textContent = "Site link copied.";
        return;
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }

    if (status) status.textContent = `Copy this link: ${url}`;
  });
});
