let i=1;
while (i<=100){
    if (i%3==0 && i%5==0){
        console.log(`FizzBuzz`);
        i+=1;
    } else if (i%3==0){
        console.log(`Fizz`);
        i+=1;
    } else if (i%5==0){
        console.log(`Buzz`);
        i+=1;
    } else {
        console.log(`${i}`);
        i+=1;
    }
}