// Watermark Disappear And Appear Effect
const Logo = document.getElementById("logo");
const Watermark = document.getElementById("watermark");
const Nav_Buttons = [
    document.getElementById("nav-btn1"),
    document.getElementById("nav-btn2")
]

Logo.addEventListener('mouseover', function () {
    console.log("Mouse Over Logo")

    Watermark.style.animation = "appearText 0.25s linear forwards"
})
Logo.addEventListener('mouseout', function () {
    console.log("Mouse Left Logo")
    
    Watermark.style.animation = "disappearText 0.5s linear forwards"
})

for (let i = 0; i < Nav_Buttons.length; i++) {
    // Get the row
    const Button = Nav_Buttons[i];

    Button.addEventListener('mouseover', function () {
        console.log("Mouse Over Nav Button")
    
        Button.style.animation = "NavColorBlue 0.1s linear forwards"
    })
    Button.addEventListener('mouseout', function () {
        console.log("Mouse Left Nav Button")
        
        Button.style.animation = "NavColorWhite 0.25s linear forwards"
    })
}