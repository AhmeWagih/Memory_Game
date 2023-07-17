document.querySelector(".control-button span").onclick = function() {
    let name = prompt("What's Your Name");
    if (name === null || name === "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = name;
    }
    document.querySelector(".control-button").remove();
    document.getElementById("start").play();

    let span = document.querySelector(".timer span");

    function countup() {
        ++span.innerHTML;
        if (span.innerHTML === "20") {
            alert("You have lost Try again");
        }
        if (span.innerHTML === "20") {
            clearInterval(counter);
        }
    }

    let counter = setInterval(countup, 1000);

};

let duration = 1000;

let memoryBlocks = document.querySelector(".memory-blocks");

let blocks = Array.from(memoryBlocks.children);

let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function () {
        flipBlock(block);
    });
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    let flippedBlock = blocks.filter(flippedBlock =>
        flippedBlock.classList.contains(("is-flipped")));
    if (flippedBlock.length === 2) {
        stopCklick();
        checkBlock(flippedBlock[0], flippedBlock[1]);
    };
};

function stopCklick() {
    memoryBlocks.classList.add("no-clicking");
    setTimeout(() => {
        memoryBlocks.classList.remove("no-clicking");
    }, duration);
};

function checkBlock(first, second) {
    let tries = document.querySelector(".tries span");
    if (first.dataset.tec === second.dataset.tec) {
        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");

        first.classList.add("has-match");
        second.classList.add("has-match");

        document.getElementById("success").play();

    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            first.classList.remove("is-flipped");
            second.classList.remove("is-flipped");
        }, duration);

        document.getElementById("fail").play();
    }
};

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}