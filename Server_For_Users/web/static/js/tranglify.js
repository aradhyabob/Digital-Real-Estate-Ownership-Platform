<<<<<<< HEAD
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("trianglify-bg");

    if (canvas) {
        let pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            cell_size: 100, // Adjust size of triangles
            variance: 0.7,
            seed: "custom-seed",
        });

        pattern.toCanvas(canvas);
    } else {
        console.error("Canvas element with ID 'trianglify-bg' not found!");
    }
});
=======
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("trianglify-bg");

    if (canvas) {
        let pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            cell_size: 100, // Adjust size of triangles
            variance: 0.7,
            seed: "custom-seed",
        });

        pattern.toCanvas(canvas);
    } else {
        console.error("Canvas element with ID 'trianglify-bg' not found!");
    }
});
>>>>>>> 52f405b20d9f714bef9b90e6482acdac5e53cc0c
