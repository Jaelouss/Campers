export const htmlScrollLock = (lock: boolean) => {
  const html = document.documentElement;

  if (lock) {
    html.classList.add("no-scroll");
  } else {
    html.classList.remove("no-scroll");
  }
};
