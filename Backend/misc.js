// Functions
function Dropdown() {
    const tl_spec = gsap.timeline({ defaults: { duration: .5 }})
    tl_spec.fromTo("nav", { y: "-300%" }, { y: "0%" })

    console.log("Dropped down menu")
}
function FadeOutLoadingScreen() {
  const loader = document.getElementsByClassName("loader")

  loader[0].style.animation = "fadeOut 1s ease-in-out forwards"

  document.body.style.overflow = "auto"

  // Drop down menu for other than index
  const tl_spec = gsap.timeline({ defaults: { duration: 0 }})
  tl_spec.fromTo("nav", { y: "0%" }, { y: "-300%" })
  
  setTimeout(Dropdown, 1500)
}

// Fade Out Loading Screen
document.body.style.overflow = "hidden"

setTimeout(FadeOutLoadingScreen, 3000)