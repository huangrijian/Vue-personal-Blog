window.addEventListener('scroll', (() => {
  let nav = document.querySelector('#nav_header');
  if (!nav) return
  if (document.documentElement.scrollTop == 0) {
    nav.classList.remove("slideOutLeft")
    nav.classList.add("bounceInLeft")
  } else {
    nav.classList.add("slideOutLeft")
  }
}), true)
