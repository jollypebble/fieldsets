const DiagramEvents = {
  wasClickedAtLeastOnce: false,
  init() {
    window.addEventListener("pointerdown", DiagramEvents.onClick);
    window.addEventListener("click", DiagramEvents.onClick);
    window.addEventListener("touchstart", DiagramEvents.onClick);
  },
  onClick() {
    DiagramEvents.wasClickedAtLeastOnce = true
  }
}

export default DiagramEvents;
