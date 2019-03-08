const Definder = {
  wasClickedAtLeastOnce: false,
  init() {
    window.addEventListener("pointerdown", Definder.onClick);
    window.addEventListener("click", Definder.onClick);
    window.addEventListener("touchstart", Definder.onClick);
  },
  onClick() {
    Definder.wasClickedAtLeastOnce = true
  }
}

export default Definder;