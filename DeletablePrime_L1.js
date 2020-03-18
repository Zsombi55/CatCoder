// Catalysts Coding Contest - "Deletable Primes" L1

// Primes are numbers that can only be divided cleanly by 1 or themselves.
// If removing any single digit still results in a prime, the "original" was a deletable prime.


//  THIS IS INCOMPLETE and not quite in the right direction.
// Spent too long trying to solve this one; I will try again another time.
//
//  I wanted to upload this code anyway, as proof that I have tried to code it,
// but sadly it's not possible unless all answers are correct.
// 
//  The solutions were mostly woked out on paper, so I know how to solve it in theory:
// 4125673:12, 41256793:21, 337424981:made_mistake_so_unknown, 537430451:3, 200899998:0, 537499093:8, 2147483059:8
// the other three numbers were too long to do by hand in my alotted time - I am preparing for the interview afterall.


var n = 537430451;

// isPrime(n)
console.log("Is prime?" + isPrime(n));
if (isPrime(n)) {
    console.log("Is deletable? " + isDeletable(n));
}

function isPrime(n) {
  var sqrtN=Math.floor(Math.sqrt(n));   // no decimals
    var p = n != 1;     // boolean
    for(var i=2; i < sqrtN + 1; i++) {
        if(n % i === 0) {
            p = false;
            break;
        }
    }
    return p;
}

function isDeletable(n) {
    var s = toString(n);
    var d = true;
    
    truncateLeft(s);
    truncateRight(s);
    
    if (!d) {
        d = false;
        break;
    }
    return d;
}

function truncateLeft(s) { // truncate sequence from left
    var le = s.length;

    for (var i = 0 ; i < le; i++) {
        var tl = s.slice(i, le);
        if (isPrime(tl)) {
            console.log(tl);
        }
    }
}

function truncateRight(s) { // truncate sequence from right
    var le = s.length;

    for (var i = 0 ; i < le; i++) {
        var tr = s.slice(0, le - i);
        if (isPrime(tr)) {
            console.log(tr);
        }
    }
}
