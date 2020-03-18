// Catalysts Coding Contest - "Fibonacci" L1

// F_n = Phi^n / sqrt(5) generally rounded up.

var n = [6, 19, 28, 36, 38];
for (var i = 0; i < n.length; i++)
{
	//fibonacci(n[i]);
    console.log(fibonacci(n[i]));
}

function fibonacci(n) {
    let p = (1 + Math.sqrt(5))/2;
    let a = Math.pow(p, n) / Math.sqrt(5);

    return Math.round(a);
}