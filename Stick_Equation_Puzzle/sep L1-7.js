// Coding Contest, Equation (Stick Puzzle) - Level 1

// Have an equation in the format of sticks, like displayed on simple eectronic calculators.
// The puzzle or challenge is trying to correct a wrong equation --> by manipulating 1 stick only.
//   Eg.:  9+8=14 (17=14, incorrect) =>  6+8=14 (14=14, correct)

// ** RULES **

const legals = "0123456789+-*/= ".split(""); // Allowed characters.

const adds = {};
const substracts = {};
const transf = {};

function add(c1, c2) {
    adds[c1].add(c2);
    substracts[c2].add(c1);
}

function transform(c1, c2) {
    transf[c1].add(c2);
    transf[c2].add(c1);
}

function ruleSet() { // How can a stick be moved around.
    legals.forEach( c => [adds, substracts, transf].forEach( s => s[c] = new Set()));
    add('-', '+');
    add('-', '=');
    add('0', '8');
    add('1', '7');
    add('3', '9');
    add('4', '9');
    add('5', '9');
    add('5', '6');
    add('6', '8');
    add('6', '9');
    add('9', '8');

    transform('3', '5');
    transform('3', '2');
    transform('6', '9');

    //add(' ', '1');
}

function evaluate(arr) { // Check for proper characters & placement.
    if (arr.indexOf('=') <= -1) return false;
    try {
        return !!eval(" " + arr.join("").replace('=', '==').replace('x', '*') + " ");
    } catch (x) {
        return false;
    }
}


// ** SOLVER **

function mutate(arr) {
    return transforms([' ', ...arr, ' ']).concat(moves(arr));
}

function replace(arr, index, re) {
    const res = [...arr]; // The "..." is a spread/ rest operator used for multiple/ variable number of argumants.
    res[index] = re;
    return res;
}

function transforms(arr) {
    return arr.flatMap((c, i) => [...transf[c]].map(re => replace(arr, i, re)));
}

function moves(arr) {
    return arr.flatMap((c, i) => [...substracts[c]].flatMap(re => adding(replace(arr, i, re), i)));
}

function adding(arr, except) {
    return arr.flatMap((c, i) => i === except ? [] : [...adds[c]].map(re => replace(arr, i, re)));
}


// ** USER INTERFACE **

function element(tag, txt, subs = []) {
    const e = document.createElement(tag);
    e.appendChild(document.createTextNode(txt));
    subs.forEach(s => e.appendChild(s));
    return e;
}

function toLink(txt) {
    const li = document.createElement('li');
    li.innerHTML = txt;
    makeLink(li);
    return li;
}

function makeLink(element) {
    element.addEventListener('click', e => putSample(e.srcElement.innerHTML));
}

function putSample(txt) {
    document.querySelector("#equation").value = txt;
    solve(txt);
}

function solve(eq) { // Correct the puzzle & present the results.
    console.log( 'Solving: ', eq);

    const isOK = evaluate(eq.split(""));
    const mutations = mutate(eq.split(""));
    const solutions = mutations.filter(arr => evaluate(arr))
        .map(m => m.join(""))
        .map(toLink);
    const other = mutations.filter(arr => !evaluate(arr))
        .map(m => m.join(""))
        .map(toLink);

    const statusElement = document.querySelector("#status");
    statusElement.innerHTML = '';


    if (!isOK && solutions.length > 0) {
        const q = element('span', eq);
        q.classList.add("matchsticks");
        statusElement.appendChild(element('p', `There are ${solutions.length} solution(s) to `, [q]));
        statusElement.appendChild(element('ul', "", solutions));
    }

    statusElement.appendChild(element('p', `${other.length} ${isOK ? 'Possible quiz tasks: ' : 'Incorrect mutations: '}`));
    statusElement.appendChild(element('ul', "", other));
}


function setup() {

    ruleSet();

    // User input.
    document.querySelector("#equation").addEventListener('input', e => solve(e.srcElement.value));
    const samples = document.querySelector("#samples");
    
    // Rules table.
    const span = set => element('span', [...set].join(""));
    const tbody = document.querySelector('tbody');
    for (let i = 0; i < legals.length-1; i++) {
        const c = legals[i];
        const o = element('th', c);
        const t = element('td', "", [span(transf[c])]);
        const a = element('td', "", [span(adds[c])]);
        const s = element('td', "", [span(substracts[c])]);
        tbody.appendChild(element('tr', "", [o, t, a, s]));
    }
}