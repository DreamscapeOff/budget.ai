// New Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 10;
scene.add(camera);

// Render
const canvas = document.querySelector('.object1')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setPixelRatio(window.devicePixelRatio * 2);
renderer.setSize((window.innerWidth * window.devicePixelRatio), (sizes.height * window.devicePixelRatio));
renderer.render(scene, camera);

// Controls
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.enableRotate = false;
controls.enablePan = false;
controls.enableKeys = false
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

// Typewriter Variables
let textBase = "";
let jobs = ["Budget Today.", "Save $$$."];
let jobIdx = 0;
let i = 0;
let reverse = false;
let typewriter = true;
let selectedobject = false
let selectobjectCD = true
setTimeout(() => {
    selectobjectCD = false
}, 5000);

// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to change color with GSAP
let LoadCD = function () {
    selectobjectCD = true
    setTimeout(() => {
        selectobjectCD = false
    }, 3000);
}

/// Presets

function changeColor() {
    console.log(selectobjectCD)
    if (selectobjectCD == false) {
        LoadCD();

        if (selectedobject == false) {
            selectedobject = true;

            const newColor = getRandomColor();
            gsap.to(mesh.material.color, {
                r: 255,
                g: 255,
                b: 255,
                duration: 3
            });

            const tl = gsap.timeline({ defaults: { duration: 2 } })
            const tl_spec = gsap.timeline({ defaults: { duration: .5 } })
            tl.fromTo(mesh.scale, { z: 1, x: 1, y: 1 }, { z: 0.5, x: 0.5, y: 0.5 });
            controls.autoRotateSpeed = 10;
            tl_spec.fromTo("nav", { y: "0%" }, { y: "-300%" })

            typewriter = false

            document.getElementsByClassName("object1")[0].style.animation = "center-canvas 0.25s linear forwards"
            
            document.getElementById("hero-header").style.animation = "disappearText 0.5s linear forwards"
            document.getElementById("hero-btn").style.animation = "disappearText 0.25s linear forwards"
            setTimeout(() => {
                document.getElementById("hero-header").style.animation += ", center-hero-header 0.1s linear forwards"

                setTimeout(() => {
                    document.getElementById("hero-header").innerHTML = "Get started with our state of the art AI-Model, 'EcoMinder'."
                    document.getElementById("hero-header").style.animation += ", appearText 0.25s linear forwards"

                    document.getElementsByClassName("ai-information-container")[0].style.display = "inline"
                    document.getElementsByClassName("ai-information-container")[0].style.animation = "visbilityAIinformation 0.5s linear forwards"
                }, 1000);
            }, 1000);
        } else if (selectedobject == true) {
            selectedobject = false;

            const newColor = getRandomColor();
            gsap.to(mesh.material.color, {
                r: 0,
                g: 1,
                b: 0.5137254901960784,
                duration: 1
            });

            const tl = gsap.timeline({ defaults: { duration: 3 } })
            const tl_spec = gsap.timeline({ defaults: { duration: .5 } })
            tl.fromTo(mesh.scale, { z: .5, x: .5, y: .5 }, { z: 1, x: 1, y: 1 });
            controls.autoRotateSpeed = 1;
            tl_spec.fromTo("nav", { y: "-300%" }, { y: "0%" })

            typewriter = true;

            document.getElementsByClassName("object1")[0].style.animation = "center-canvas 0.5s linear backwards"

            document.getElementById("hero-header").style.animation = "disappearText 0.5s linear forwards"
            setTimeout(() => {
                document.getElementById("hero-header").style.innerHTML = ""
                document.getElementById("hero-header").style.animation += ", center-hero-header 0.25s linear backwards"

                setTimeout(() => {
                    document.getElementById("hero-header").style.animation += ", appearText 0.25s linear forwards"
                    document.getElementById("hero-btn").style.animation = "appearText 0.5s linear forwards"

                    document.getElementsByClassName("ai-information-container")[0].style.animation = "visbilityAIinformation 0.5s linear backwards"
                    setTimeout(() => {
                        document.getElementsByClassName("ai-information-container")[0].style.display = "none"
                    }, 500);
                }, 1000);
            }, 1000);
        }
    }
}

// Event listener for mouse clicks
const button = document.getElementById("hero-btn");

button.addEventListener("click", function() {
    if (selectedobject == false) {
        changeColor()
    }
});
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position.
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray.
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && selectedobject == true) {
        // Intersected object(s) found.
        console.log('Object clicked:', intersects[0].object);

        changeColor()
    }
}

window.addEventListener('click', onMouseClick, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls if using OrbitControls
    renderer.render(scene, camera);
}

animate();

//Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop()

function SetInActionOpacityChange() {
const t2 = gsap.timeline({ defaults: { duration: 1 } })
t2.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t2.fromTo(".title", { opacity: 0 }, { opacity: 1 })
t2.fromTo(".object1", { opacity: 0 }, { opacity: 1 })
}

setTimeout(SetInActionOpacityChange, 3000)

function typeWriter() {
    // Generate some random text jitter between 45 and 75 ms to simulate a keyboard
    const typewriter_sound = document.getElementById("animated-description-sound")
    var textJitter = Math.floor(Math.random() * (70 - 45) + 45);

    // Check if we want to remove text ('reverse'), or add it.
    if (reverse) {
        if (document.getElementById("hero-header").innerHTML.length > textBase.length && typewriter == true) {
            // We're still in the process of removing the job
            document.getElementById("hero-header").innerHTML = document
                .getElementById("hero-header")
                .innerHTML.slice(0, -1);
            setTimeout(typeWriter, textJitter);
            if (document.visibilityState == "visible") {
                typewriter_sound.play();
            }
        } else {
            // deleting done. Set next job, and repeat with typing by
            // setting reverse to false
            jobIdx = (jobIdx + 1) % 2;
            reverse = false;
            setTimeout(typeWriter, 1000);
        }
    } else {
        // We're adding text
        if (i === (textBase + jobs[jobIdx]).length && typewriter == true) {
            // Line is done. Wait and then reverse
            i = textBase.length;
            reverse = true;

            // Wait a second, then start deleting
            setTimeout(typeWriter, 10000);
        } else {
            // Write text like a typewriter
            if (i < (textBase + jobs[jobIdx]).length && typewriter == true) {
                document.getElementById("hero-header").innerHTML = document.getElementById("hero-header").innerHTML + (
                    textBase + jobs[jobIdx]
                ).charAt(i);
                i++;
                setTimeout(typeWriter, textJitter);
                if (document.visibilityState == "visible") {
                    typewriter_sound.play();
                }
            }
        }
    }
}

typeWriter();

// Handle scroll event
var scrolled = window.scrollY;
var viewportHeight = window.innerHeight;
var threshold = viewportHeight;
let pastThreshold = false;

window.addEventListener('scroll', function() {
    scrolled = window.scrollY;
    
    if (scrolled > threshold && pastThreshold == false) {
        pastThreshold = true;

        document.getElementsByClassName("object1")[0].style.animation = "center-canvas 0s linear forwards, disappearCanvas 0.25s linear forwards"
        document.getElementById("hero-header").style.animation = "center-hero-header 0s linear forwards, disappearText 0.25s linear forwards"

        console.log('Scrolled past one 100vh');
    } else if (scrolled < threshold && pastThreshold == true) {
        pastThreshold = false;

        document.getElementsByClassName("object1")[0].style.animation = "center-canvas 0s linear forwards, appearCanvas 0.25s linear backwards"
        document.getElementById("hero-header").style.animation = "center-hero-header 0s linear forwards, appearText 0.25s linear forwards"

        console.log('Scrolled back into one 100vh');
    }
});

// Select the element
const informationImages = document.querySelectorAll("`.${information-images}`");
console.log(informationImage)

elements.forEach(element => {
    // Function to handle mouseover event
    function handleMouseOver() {
        element.style.animation = "expandImage 0.25s linear forward";
        console.log("hovered over image")
    }
    
    // Function to handle mouseout event
    function handleMouseOut() {
        element.style.animation = "originalImage 0.5s linear forward";
        console.log("left over image")
    }
    
    // Add event listeners for mouseover and mouseout
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
});


console.log("|| LOADED three.js ||")