// Initial setup
document.addEventListener("DOMContentLoaded", () => {
    // Let the cameras blink randomly to clear state
    const dirs = ['north', 'south', 'east', 'west'];
    dirs.forEach(d => {
        document.getElementById('cam-' + d).innerText = 'Clear - No Alerts';
    });
});

function updateLight(direction, color) {
    const lightElement = document.getElementById(direction + "-light");
    if (!lightElement) return;

    const lights = lightElement.querySelectorAll(".light-glow");

    lights.forEach(light => {
        const lightColor = light.getAttribute("data-color");
        light.className = "w-8 h-8 rounded-full light-glow";

        if (lightColor === color) {
            light.classList.add("light-active-" + color);
        } else {
            light.classList.add("light-inactive-" + lightColor);
        }
    });
}

function handleEmergency(direction) {
    ["north", "south", "east", "west"].forEach(dir => updateLight(dir, "red"));
    updateLight(direction, "green");

    const display = document.getElementById("emergencyDisplay");

    display.innerText = "🚨 OVERRIDE: Clear path for " + direction.toUpperCase();
    display.className = "mt-5 p-4 rounded-xl text-center text-sm font-bold bg-red-900/30 border border-red-500 blink";
}

function simulateAmbulance() {
    const dirs = ['north', 'south', 'east', 'west'];
    const dir = dirs[Math.floor(Math.random() * dirs.length)];

    // Reset all cams
    dirs.forEach(d => {
        const cam = document.getElementById('cam-' + d);
        cam.innerText = 'Clear - No Alerts';
        cam.className = 'text-xs font-semibold text-emerald-400 transition-colors';
    });

    const activeCam = document.getElementById('cam-' + dir);
    activeCam.innerText = '🚑 AMBULANCE DETECTED!';
    activeCam.className = 'text-xs font-bold text-red-500 blink';

    // Automatically trigger emergency override
    handleEmergency(dir);
}

// Simulated Traffic Density
setInterval(() => {
    const dirs = ['north', 'south', 'east', 'west'];
    dirs.forEach(d => {
        const density = Math.floor(Math.random() * 100);
        const sens = document.getElementById('sens-' + d);
        const bar = document.getElementById('bar-' + d);

        let label = 'Low';
        let colorClass = 'text-emerald-400';
        let bgColorClass = 'bg-emerald-500/10';

        if (density > 75) {
            label = 'High';
            colorClass = 'text-red-400';
            bgColorClass = 'bg-red-500/10';
        } else if (density > 40) {
            label = 'Med';
            colorClass = 'text-amber-400';
            bgColorClass = 'bg-amber-500/10';
        }

        sens.innerText = `${label} (${density}%)`;
        sens.className = `text-2xl font-bold relative z-10 ${colorClass}`;
        bar.className = `absolute bottom-0 left-0 w-full transition-all duration-1000 ${bgColorClass}`;
        bar.style.height = `${density}%`;
    });
}, 3500); // Update every 3.5 seconds
