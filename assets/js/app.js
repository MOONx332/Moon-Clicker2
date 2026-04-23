let img = document.getElementById("clickerimg")
let display = document.getElementById("display")

let note = document.getElementById("note")

let cog = document.getElementById("cog")
let sbg = document.getElementById("settingsdiv")

let saveb = document.getElementById("savebutton")
let wipeb = document.getElementById("wipebutton")

let clicksound = document.getElementById("moonclick")
let buysound = document.getElementById("buy")
let errorsound = document.getElementById("error")

img.addEventListener("mouseenter", hover)
img.addEventListener("mouseleave", leave)
img.addEventListener("click", click)
img.addEventListener("mousedown", down)
img.addEventListener("mouseup", up)

saveb.addEventListener("click", saveevent)
saveb.addEventListener("mouseenter", savehover)
saveb.addEventListener("mouseleave", saveleave)
saveb.addEventListener("mousedown", savedown)
saveb.addEventListener("mouseup", saveup)

wipeb.addEventListener("click", wipeevent)
wipeb.addEventListener("mouseenter", wipehover)
wipeb.addEventListener("mouseleave", wipeleave)
wipeb.addEventListener("mousedown", wipedown)
wipeb.addEventListener("mouseup", wipeup)

cog.addEventListener("click", settingsevent)
cog.addEventListener("mouseenter", settingshover)
cog.addEventListener("mouseleave", settingsleave)
cog.addEventListener("mousedown", settingsdown)
cog.addEventListener("mouseup", settingsup)

let ucb = document.getElementById("upgradeclicks")
let ucbt = document.getElementById("tucb")

let ucb2 = document.getElementById("upgradeclicks2")
let ucbt2 = document.getElementById("tucb2")

ucb.addEventListener("click", ucbclick)
ucb2.addEventListener("click", ucbclick2)

document.addEventListener("keypress", keypressany)
document.addEventListener("keydown", keydownany)
document.addEventListener("keyup", keyupany)

let save = Number(localStorage.getItem("Moons")) || 0;
let savemulti = Number(localStorage.getItem("Multi")) || 1;
let savepersec = Number(localStorage.getItem("PerSec")) || 0;
let saveprice1 = Number(localStorage.getItem("Price1")) || 40;
let saveprice2 = Number(localStorage.getItem("Price2")) || 20;

let moons = save

let multi = savemulti
let persec = savepersec

let price1 = saveprice1
let price2 = saveprice2

let settingsopen = 0

let timehit = 0

display.innerHTML = (moons + " Moons")

function updatedisplay() {
    display.innerHTML = (moons + " Moons")
}

function updateupgrades() {
    ucbt.innerHTML = ("Upgrade Clicks - " + price1 + " Moons")
    ucbt2.innerHTML = ("Upgrade Moons Per Sec - " + price2 + " Moons")
}

function saveall() {
    localStorage.setItem("Moons", moons)
    localStorage.setItem("Multi", multi)
    localStorage.setItem("PerSec", persec)
    localStorage.setItem("Price1", price1)
    localStorage.setItem("Price2", price2)
}

function wipedata() {
    localStorage.removeItem("Moons")
    localStorage.removeItem("Multi")
    localStorage.removeItem("Price1")
    localStorage.removeItem("PerSec")
    localStorage.removeItem("Price2")
}

function keypressany() {
    clicksound.currentTime = 0
    moons = moons + multi
    clicksound.play()
}

function keydownany() {
    img.style.scale = "1"
    img.style.transform = "rotate(3deg)"
    img.src = "assets/img/moonopen.png"
}

function keyupany() {
    img.style.scale = "1.05"
    img.style.transform = "rotate(-2deg)"
    img.src = "assets/img/moon.png"
}

function hover() {
    img.style.scale = "1.05"
    img.style.transform = "rotate(-2deg)"
}

function leave() {
    img.style.scale = "1"
    img.style.transform = "rotate(0deg)"
}

function click() {
    clicksound.currentTime = 0
    moons = moons + multi
    clicksound.play()
}

function down() {
    img.style.scale = "1"
    img.style.transform = "rotate(3deg)"
    img.src = "assets/img/moonopen.png"
}

function up() {
    img.style.scale = "1.05"
    img.style.transform = "rotate(-2deg)"
    img.src = "assets/img/moon.png"
}

function saveevent() {
    buysound.currentTime = 0
    saveall()
    console.log("Saved!")
    note.style.opacity = "1"
    buysound.play()
    
    setTimeout(function() {
        note.style.opacity = "0"
    }, 3000)
}

function savehover() {
    saveb.style.transform = "scale(1.05)"
}

function saveleave() {
    saveb.style.transform = "scale(1)"
}

function savedown() {
    saveb.style.transform = "scale(0.95)"
}

function saveup() {
    saveb.style.transform = "scale(1.05)"
}

function wipeevent() {
    if (timehit < 1) {
        timehit = timehit + 1
        wipeb.innerHTML = ("You Sure?")

        setTimeout(function() {
            timehit = 0
            wipeb.innerHTML = ("Wipe Data")
        }, 1000);
    } else {
        wipedata()
        window.location.reload()
    }
}

function wipehover() {
    wipeb.style.transform = "scale(1.05)"
}

function wipeleave() {
    wipeb.style.transform = "scale(1)"
}

function wipedown() {
    wipeb.style.transform = "scale(0.95)"
}

function wipeup() {
    wipeb.style.transform = "scale(1.05)"
}

function settingshover() {
    cog.style.scale = "1.1"
}

function settingsleave() {
    cog.style.scale = "1"
}

function settingsdown() {
    cog.style.scale = "1"
}

function settingsup() {
    cog.style.scale = "1.1"
}

function settingsevent() {
    if (settingsopen = 0) {
        settingsopen = 1
        sbg.style.visibility = "visible"
    } else {
        settingsopen = 0
        sbg.style.visibility = "hidden"
    }

    console.log("Clicked")
}

function ucbclick() {
    if (moons >= price1) {
        buysound.currentTime = 0
        moons = moons - price1
        multi = multi * 2
        price1 = price1 * 2
        buysound.play()
    } else {
        errorsound.currentTime = 0
        errorsound.play()
    } 
}

function ucbclick2() {
    if (moons >= price2) {
        buysound.currentTime = 0
        moons = moons - price2

        if (persec < 1) {
            persec = 1
        } else {
            persec = persec * 2
        }

        price2 = price2 * 2
        buysound.play()
    } else {
        errorsound.currentTime = 0
        errorsound.play()
    } 
}

setInterval(function() {
    updatedisplay()
    updateupgrades()
}, 100);


setInterval(function() {
    moons += persec
}, 1000);

setInterval(function() {
    saveall()
    console.log("Autosaved!")
}, 60000);