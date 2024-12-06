export default (className = "is-error", position: any = "center") => {
  setTimeout(() => {
    const el = document.getElementsByClassName(className);
    if (!el || !el.length) {
      return;
    }
    const firstElement = el && (el[0] as HTMLElement);
    if (!firstElement) return;
    firstElement.scrollIntoView({ block: position, behavior: "smooth" });
    firstElement.focus();
  }, 100);
};
