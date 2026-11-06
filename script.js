function fizzBuzz(n) {
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return n;
}
for (let i = 1; i <= 100; i++) {
    console.log(fizzBuzz(i));
}
console.log(fizzBuzz(3));     // Fizz
console.log(fizzBuzz(5));     // Buzz
console.log(fizzBuzz(15));    // FizzBuzz
console.log(fizzBuzz(7));     // 7
console.log(fizzBuzz(100));   // Buzz
console.log(fizzBuzz(150));   // FizzBuzz