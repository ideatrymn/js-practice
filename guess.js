let keepPlaying = true;

while (keepPlaying) {
  const secret = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  while (true) {
    const answer = prompt("Guess a number from 1 to 100 (Cancel to quit):");

    if (answer === null) {
      console.log(`You quit. The number was ${secret}.`);
      keepPlaying = false;
      break;
    }

    const guess = Number(answer);

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      console.log("Please enter a whole number from 1 to 100.");
      continue;
    }

    attempts++;

    if (guess === secret) {
      console.log(`Correct! You got it in ${attempts} attempts.`);
      keepPlaying = confirm("Play again?");
      break;
    } else if (guess < secret) {
      console.log("Too low.");
    } else {
      console.log("Too high.");
    }
  }
}

console.log("Thanks for playing!");