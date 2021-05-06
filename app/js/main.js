document.addEventListener("DOMContentLoaded", function () {

    const holdBtn = document.querySelector(".center-hold-btn"),
        rollBtn = document.querySelector(".center-roll-btn"),
        dices = document.querySelectorAll(".center-dices-el img")


    class Player {
        constructor(parent, turnScore, totalScore) {
            this.parent = parent
            this.turnScore = turnScore
            this.totalScore = totalScore
        }
    }

    const player1 = new Player(document.getElementById("player1"), document.getElementById("player1-turn-score"), document.getElementById("player1-total-score"))
    const player2 = new Player(document.getElementById("player2"), document.getElementById("player2-turn-score"), document.getElementById("player2-total-score"))


    player1.turnScore.innerText = 0;
    player1.totalScore.innerText = 0;
    player2.turnScore.innerText = 0;
    player2.totalScore.innerText = 0;

    let isPlaying = true;
    let active = 1;


    rollBtn.addEventListener("click", function () {
        roll()
    })

    holdBtn.addEventListener("click", function () {
        hold()
    })



    let turnScore = 0;
    function roll() {

        console.log(isPlaying);

        if (isPlaying) {
            let generate = function () {
                return Math.floor(Math.random() * 6) + 1
            }

            let twoRandomNumbers = [];
            for (let i = 0; i < 2; i++) {
                twoRandomNumbers.push(generate())
            }

            dices.forEach((dice, index) => {
                dice.src = `images/dice-${twoRandomNumbers[index]}.png`
            })

            turnScore += twoRandomNumbers.reduce((a, b) => a + b, 0);

            // if there are ones - switch player
            if (twoRandomNumbers.some(num => num === 1)) {

                turnScore = 0;

                if (active === 1) {
                    player1.turnScore.innerText = turnScore
                    active = 2
                    player1.parent.classList.remove("active")
                    player2.parent.classList.add("active")
                } else {
                    player2.turnScore.innerText = turnScore
                    active = 1
                    player2.parent.classList.remove("active")
                    player1.parent.classList.add("active")
                }

            }
            // if no ones - update score
            else {

                active === 1 ? player1.turnScore.innerText = turnScore : player2.turnScore.innerText = turnScore

            }

            return active
        }


    }

    function hold() {

        if (isPlaying) {
            if (active === 1) {
                let totalScore = parseInt(player1.totalScore.innerText) + turnScore;
                player1.totalScore.innerText = totalScore;
                player1.turnScore.innerText = 0;

                if (totalScore > 19) {
                    document.querySelector(".winner").innerText = "Player 1 wins!"
                    isPlaying = false;
                    console.log(isPlaying);
                }

                active = 2;

                player1.parent.classList.remove("active")
                player2.parent.classList.add("active")

            } else {

                let totalScore = parseInt(player2.totalScore.innerText) + turnScore;
                player2.totalScore.innerText = totalScore;
                player2.turnScore.innerText = 0;

                if (totalScore > 19) {
                    document.querySelector(".winner").innerText = "Player 2 wins!"
                    isPlaying = false;
                    console.log(isPlaying);
                }

                active = 1

                player2.parent.classList.remove("active")
                player1.parent.classList.add("active")
            }

            turnScore = 0;
        }


    }

})