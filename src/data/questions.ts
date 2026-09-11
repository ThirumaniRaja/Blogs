import type { Question } from '@/types'

export const questions: Question[] = [
  {
    id: 'closures-1',
    title: 'What is a closure?',
    difficulty: 'Easy',
    category: 'Closures',
    tags: ['closures', 'scope', 'functions'],
    question: 'What will the following code log to the console, and why?',
    explanation:
      'A closure is created when a function "remembers" the variables from its lexical scope even after the outer function has returned. Here, `counter` keeps a private reference to `count` via the returned function, so each call to `increment()` mutates the same `count` that persists between calls.',
    codeExample: `function createCounter() {
  let count = 0;
  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());`,
    expectedOutput: `1\n2\n3`,
    quiz: {
      options: [
        '1, 2, 3 — the inner function keeps a persistent reference to `count`',
        '1, 1, 1 — a new `count` is created on every call',
        'undefined, undefined, undefined',
        'A ReferenceError is thrown because `count` is out of scope',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'closures-2',
    title: 'Classic closure-in-a-loop pitfall',
    difficulty: 'Medium',
    category: 'Closures',
    tags: ['closures', 'var', 'let', 'loops'],
    question: 'What does this code print, and how would you fix it if `1 2 3` was the intended output?',
    explanation:
      '`var` is function-scoped, so all three `setTimeout` callbacks close over the *same* `i`, which equals 3 by the time the callbacks run. Using `let` instead creates a new binding of `i` per iteration, so each closure captures its own value (1, 2, 3).',
    codeExample: `for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Fix: replace var with let`,
    expectedOutput: `4\n4\n4`,
    quiz: {
      options: [
        '4, 4, 4 — because `var` shares one binding across all iterations',
        '1, 2, 3 — because closures always capture the value at creation time',
        '3, 3, 3',
        'It throws a TypeError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'hoisting-1',
    title: 'var, let, and the Temporal Dead Zone',
    difficulty: 'Easy',
    category: 'Scope & Hoisting',
    tags: ['hoisting', 'let', 'const', 'tdz'],
    question: 'What happens when this code runs?',
    explanation:
      '`var` declarations are hoisted and initialized to `undefined`, so accessing `a` before its assignment logs `undefined`. `let`/`const` declarations are hoisted too, but they remain uninitialized in the "Temporal Dead Zone" until their declaration line executes, so accessing `b` before that line throws a `ReferenceError`.',
    codeExample: `console.log(a);
var a = 1;

console.log(b);
let b = 2;`,
    expectedOutput: `undefined\nUncaught ReferenceError: Cannot access 'b' before initialization`,
    quiz: {
      options: [
        '`undefined` then a ReferenceError from the Temporal Dead Zone',
        '`1` then `2`',
        '`undefined` then `undefined`',
        'A SyntaxError before anything runs',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'this-1',
    title: 'Losing `this` in a callback',
    difficulty: 'Medium',
    category: 'this Keyword',
    tags: ['this', 'arrow-functions', 'binding'],
    question: 'What is logged, and why does `this.value` break inside the regular function?',
    explanation:
      'Regular functions get their own `this`, determined by how they are *called* — passed as a bare callback to `setTimeout`, `this` defaults to the global object (or `undefined` in strict mode), so `this.value` is `undefined`. Arrow functions do not have their own `this`; they inherit it lexically from the surrounding scope, so `printArrow` keeps the object`s `this`.',
    codeExample: `const obj = {
  value: 42,
  printRegular: function () {
    setTimeout(function () {
      console.log(this.value);
    }, 0);
  },
  printArrow: function () {
    setTimeout(() => {
      console.log(this.value);
    }, 0);
  },
};

obj.printRegular();
obj.printArrow();`,
    expectedOutput: `undefined\n42`,
    quiz: {
      options: [
        '`undefined` from the regular function, `42` from the arrow function',
        '`42` from both, since both belong to `obj`',
        '`undefined` from both',
        'A TypeError is thrown',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'this-2',
    title: 'call, apply, and bind',
    difficulty: 'Medium',
    category: 'this Keyword',
    tags: ['this', 'call', 'apply', 'bind'],
    question: 'What does each console.log print?',
    explanation:
      '`call` and `apply` invoke the function immediately with the given `this`; the only difference is that `call` takes arguments individually while `apply` takes them as an array. `bind` instead returns a *new* function permanently bound to the given `this`, which is only invoked when `greetBound(...)` is called.',
    codeExample: `function greet(greeting) {
  return \`\${greeting}, \${this.name}\`;
}

const person = { name: 'Ada' };

console.log(greet.call(person, 'Hi'));
console.log(greet.apply(person, ['Hello']));
const greetBound = greet.bind(person);
console.log(greetBound('Hey'));`,
    expectedOutput: `Hi, Ada\nHello, Ada\nHey, Ada`,
    quiz: {
      options: [
        '"Hi, Ada", "Hello, Ada", "Hey, Ada"',
        '"Hi, undefined", "Hello, undefined", "Hey, undefined"',
        'All three throw a TypeError',
        '"Hi, Ada" and "Hello, Ada" only — bind does not execute anything',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'prototype-1',
    title: 'Prototype chain basics',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['prototype', 'oop', 'inheritance'],
    question: 'What is printed, and how does JavaScript find the `speak` method?',
    explanation:
      'Objects created via a constructor function link to `Constructor.prototype` through their internal `[[Prototype]]`. `dog.speak()` is not an own property of `dog`, so the engine walks the prototype chain to `Animal.prototype`, finds `speak`, and calls it with `this` bound to `dog`.',
    codeExample: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return \`\${this.name} makes a noise.\`;
};

const dog = new Animal('Rex');
console.log(dog.speak());
console.log(dog.hasOwnProperty('speak'));`,
    expectedOutput: `Rex makes a noise.\nfalse`,
    quiz: {
      options: [
        '"Rex makes a noise." then `false`, because `speak` lives on the prototype, not on `dog` itself',
        '"Rex makes a noise." then `true`',
        'A TypeError because `speak` is undefined',
        '"undefined makes a noise." then `false`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'async-1',
    title: 'Synchronous vs. asynchronous execution order',
    difficulty: 'Medium',
    category: 'Event Loop',
    tags: ['event-loop', 'async', 'settimeout'],
    question: 'In what order do these logs appear?',
    explanation:
      'Synchronous code runs first and completes the call stack. `setTimeout` callbacks (macrotasks) are queued and run after the current stack is empty. Promise `.then` callbacks (microtasks) are queued too, but the microtask queue is drained *before* the next macrotask, so the promise callback beats the timeout even with a 0ms delay.',
    codeExample: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
    expectedOutput: `1\n4\n3\n2`,
    quiz: {
      options: [
        '1, 4, 3, 2 — synchronous code, then microtasks, then macrotasks',
        '1, 2, 3, 4 in source order',
        '1, 4, 2, 3',
        '4, 1, 3, 2',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'promises-1',
    title: 'Chaining promises',
    difficulty: 'Medium',
    category: 'Promises',
    tags: ['promises', 'async', 'chaining'],
    question: 'What value does the final `.then` receive?',
    explanation:
      'Each `.then` returns a new promise. If the callback returns a plain value, the next `.then` receives that value directly. If it returns a promise, the chain waits for it to settle before continuing. Here every step returns a plain number, so the values simply accumulate through the chain.',
    codeExample: `Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => n * 3)
  .then((n) => console.log(n));`,
    expectedOutput: `6`,
    quiz: {
      options: ['6', '1', '3', 'It logs a Promise object, not a number'],
      correctIndex: 0,
    },
  },
  {
    id: 'promises-2',
    title: 'async/await error handling',
    difficulty: 'Hard',
    category: 'Promises',
    tags: ['async-await', 'try-catch', 'error-handling'],
    question: 'What is logged when `run()` is called?',
    explanation:
      '`await` on a rejected promise throws inside the `async` function, exactly like a synchronous `throw`. The surrounding `try/catch` intercepts it, so `catch` logs the error message instead of letting it become an unhandled rejection.',
    codeExample: `function fail() {
  return new Promise((_, reject) => reject(new Error('boom')));
}

async function run() {
  try {
    await fail();
  } catch (err) {
    console.log('caught:', err.message);
  }
}

run();`,
    expectedOutput: `caught: boom`,
    quiz: {
      options: [
        '"caught: boom"',
        'An unhandled promise rejection crashes the process',
        '"boom" printed without the "caught:" prefix',
        'Nothing is logged',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-1',
    title: 'Destructuring with default values',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['destructuring', 'defaults', 'objects'],
    question: 'What values do `a`, `b`, and `c` end up with?',
    explanation:
      'Destructuring defaults only apply when the extracted value is `undefined` — `null` and other falsy values do not trigger them. `a` is missing, so it gets the default `10`. `b` is explicitly `null`, so it stays `null`, its default is skipped. `c` is present as `5`.',
    codeExample: `const { a = 10, b = 20, c = 30 } = { b: null, c: 5 };
console.log(a, b, c);`,
    expectedOutput: `10 null 5`,
    quiz: {
      options: [
        '10 null 5 — defaults only kick in for `undefined`, not `null`',
        '10 20 5 — defaults apply to any falsy value',
        'undefined null 5',
        'A TypeError is thrown',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-2',
    title: 'Spread vs. rest in function signatures',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['spread', 'rest', 'functions'],
    question: 'What does `sumAll(1, 2, 3, 4)` return?',
    explanation:
      'The rest parameter `...nums` gathers every argument passed into `sumAll` into a real array, which is then reduced with addition, starting from `0`.',
    codeExample: `function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3, 4));`,
    expectedOutput: `10`,
    quiz: {
      options: ['10', '"1234"', 'NaN', '[1, 2, 3, 4]'],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-3',
    title: 'Optional chaining and nullish coalescing',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['optional-chaining', 'nullish-coalescing'],
    question: 'What is printed?',
    explanation:
      '`?.` short-circuits to `undefined` instead of throwing when it hits `null`/`undefined` along the chain, so `user?.address?.city` safely evaluates to `undefined`. The `??` operator then substitutes `"Unknown"` because the left side is `undefined` (note: `??` only falls back on `null`/`undefined`, unlike `||` which also falls back on `0` or `""`).',
    codeExample: `const user = { name: 'Sam' };
const city = user?.address?.city ?? 'Unknown';
console.log(city);`,
    expectedOutput: `Unknown`,
    quiz: {
      options: [
        '"Unknown"',
        'A TypeError: Cannot read properties of undefined',
        '`undefined`',
        '`null`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-1',
    title: 'map vs. forEach return values',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'map', 'foreach'],
    question: 'What do `mapped` and `forEached` hold after this runs?',
    explanation:
      '`map` returns a *new* array built from the callback`s return values, leaving the original untouched. `forEach` always returns `undefined` — it is used purely for side effects, not for producing a new collection.',
    codeExample: `const nums = [1, 2, 3];
const mapped = nums.map((n) => n * 2);
const forEached = nums.forEach((n) => n * 2);

console.log(mapped);
console.log(forEached);`,
    expectedOutput: `[2, 4, 6]\nundefined`,
    quiz: {
      options: [
        '`[2, 4, 6]` then `undefined`',
        '`[2, 4, 6]` then `[2, 4, 6]`',
        '`undefined` then `[2, 4, 6]`',
        '`[1, 2, 3]` then `undefined`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-2',
    title: 'reduce to group items',
    difficulty: 'Hard',
    category: 'Array Methods',
    tags: ['array', 'reduce', 'grouping'],
    question: 'What does `grouped` look like after running this reduce?',
    explanation:
      '`reduce` walks the array while building up an accumulator object. For each word its first letter is used as a bucket key; if the bucket does not exist yet it is created as an empty array, then the word is pushed into it — producing an object grouping words by starting letter.',
    codeExample: `const words = ['apple', 'banana', 'avocado', 'blueberry', 'cherry'];

const grouped = words.reduce((acc, word) => {
  const key = word[0];
  acc[key] = acc[key] || [];
  acc[key].push(word);
  return acc;
}, {});

console.log(grouped);`,
    expectedOutput: `{ a: ['apple', 'avocado'], b: ['banana', 'blueberry'], c: ['cherry'] }`,
    quiz: {
      options: [
        '{ a: [apple, avocado], b: [banana, blueberry], c: [cherry] }',
        '{ apple: "a", banana: "b", avocado: "a", blueberry: "b", cherry: "c" }',
        'An array of five separate objects, one per word',
        'A TypeError because `acc[key]` starts as undefined',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-3',
    title: 'Sorting numbers correctly',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'sort'],
    question: 'What does `nums.sort()` print without a compare function?',
    explanation:
      'By default, `Array.prototype.sort` converts elements to strings and compares UTF-16 code units. That means `10` sorts before `2` because `"1"` < `"2"` lexicographically. To sort numbers correctly you must pass a compare function like `(a, b) => a - b`.',
    codeExample: `const nums = [10, 2, 33, 4];
console.log(nums.sort());`,
    expectedOutput: `[10, 2, 33, 4] sorted as strings -> [10, 2, 33, 4]`,
    quiz: {
      options: [
        '`[10, 2, 33, 4]` — default sort compares elements as strings',
        '`[2, 4, 10, 33]` — sort always orders numbers correctly',
        '`[4, 33, 2, 10]`',
        'A TypeError is thrown because the array has mixed digit lengths',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-1',
    title: 'Type coercion with == vs ===',
    difficulty: 'Easy',
    category: 'Type Coercion',
    tags: ['equality', 'coercion'],
    question: 'Which comparisons are true?',
    explanation:
      '`==` coerces operands to a common type before comparing, so `"5" == 5` is `true` and `null == undefined` is `true` (a special-cased rule). `===` never coerces, so `"5" === 5` is `false` because the types differ.',
    codeExample: `console.log('5' == 5);
console.log('5' === 5);
console.log(null == undefined);
console.log(null === undefined);`,
    expectedOutput: `true\nfalse\ntrue\nfalse`,
    quiz: {
      options: [
        'true, false, true, false',
        'true, true, true, true',
        'false, false, true, true',
        'true, false, false, false',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-2',
    title: 'The infamous [] + [] and [] + {}',
    difficulty: 'Hard',
    category: 'Type Coercion',
    tags: ['coercion', 'operators'],
    question: 'What do these two expressions evaluate to?',
    explanation:
      'The `+` operator on objects/arrays first calls `toString()`/`valueOf()`. `[].toString()` is `""`, so `[] + []` becomes `"" + ""` = `""`. `{}.toString()` is `"[object Object]"`, so `[] + {}` becomes `"" + "[object Object]"` = `"[object Object]"`.',
    codeExample: `console.log([] + []);
console.log([] + {});`,
    expectedOutput: `""\n"[object Object]"`,
    quiz: {
      options: [
        '`""` then `"[object Object]"`',
        '`0` then `NaN`',
        'A TypeError for both',
        '`"[object Array]"` then `"[object Object]"`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-1',
    title: 'Default parameters and evaluation order',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['functions', 'default-parameters'],
    question: 'What is logged?',
    explanation:
      'Default parameters are evaluated left-to-right at call time, and later defaults can reference earlier parameters. Since `b` has no default and is not passed, it is `undefined`; `total`s default `a + b` then evaluates to `NaN` because `undefined` poisons the addition.',
    codeExample: `function total(a = 1, b, c = a + b) {
  return c;
}

console.log(total(5, undefined));`,
    expectedOutput: `NaN`,
    quiz: {
      options: [
        '`NaN`, because `b` is `undefined` and `a + b` is not a number',
        '`6`',
        '`5`',
        'A ReferenceError because `a` is used before `b` is defined',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-2',
    title: 'IIFE and module-style privacy',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['iife', 'closures', 'modules'],
    question: 'What does `counter.increment()` return on the second call, and why can`t we access `count` directly?',
    explanation:
      'The IIFE runs immediately and returns an object exposing only `increment`/`value`. `count` lives in the closure created by the IIFE and is never attached to the returned object, so it is effectively private — a common pattern before ES modules and classes.',
    codeExample: `const counter = (function () {
  let count = 0;
  return {
    increment: () => ++count,
    value: () => count,
  };
})();

counter.increment();
console.log(counter.increment());
console.log(counter.count);`,
    expectedOutput: `2\nundefined`,
    quiz: {
      options: [
        '2, then undefined — `count` is private to the closure',
        '1, then 0',
        '2, then 0',
        'A ReferenceError on the second log',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-1',
    title: 'Shallow copy vs. deep reference',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['objects', 'spread', 'references'],
    question: 'Does changing `copy.address.city` also change `original.address.city`?',
    explanation:
      'The spread operator `{ ...original }` performs a *shallow* copy: top-level properties are copied by value, but nested objects are copied by reference. `address` in `copy` still points to the same object as in `original`, so mutating a nested property affects both.',
    codeExample: `const original = { name: 'Kai', address: { city: 'Austin' } };
const copy = { ...original };
copy.address.city = 'Denver';

console.log(original.address.city);`,
    expectedOutput: `Denver`,
    quiz: {
      options: [
        '"Denver" — nested objects are shared by reference in a shallow copy',
        '"Austin" — the spread operator deep clones everything',
        'undefined',
        'A TypeError because address is read-only',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-2',
    title: 'Object.freeze and mutation',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['objects', 'freeze', 'immutability'],
    question: 'What is `user.age` after this code runs?',
    explanation:
      '`Object.freeze` makes an object shallowly immutable: attempts to reassign existing properties are silently ignored in non-strict mode (or throw in strict mode). Since `age` cannot be changed, it stays `30`.',
    codeExample: `const user = Object.freeze({ name: 'Nia', age: 30 });
user.age = 31;
console.log(user.age);`,
    expectedOutput: `30`,
    quiz: {
      options: [
        '30 — frozen objects reject property reassignment',
        '31',
        'undefined',
        'A SyntaxError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'async-2',
    title: 'Promise.all vs Promise.allSettled',
    difficulty: 'Hard',
    category: 'Promises',
    tags: ['promises', 'promise-all', 'promise-allsettled'],
    question: 'How do `Promise.all` and `Promise.allSettled` differ when one promise rejects?',
    explanation:
      '`Promise.all` rejects as soon as *any* input promise rejects, discarding the results of the others. `Promise.allSettled` always resolves once every promise has settled, returning an array of `{status, value}` or `{status, reason}` objects — useful when you want every outcome regardless of failures.',
    codeExample: `const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).catch((e) => console.log('all rejected:', e));

Promise.allSettled([p1, p2, p3]).then((results) =>
  console.log('allSettled:', results.map((r) => r.status))
);`,
    expectedOutput: `all rejected: error\nallSettled: [ 'fulfilled', 'rejected', 'fulfilled' ]`,
    quiz: {
      options: [
        '`Promise.all` short-circuits on the first rejection; `Promise.allSettled` waits for every promise and reports each status',
        'Both behave identically',
        '`Promise.allSettled` throws on the first rejection instead',
        '`Promise.all` ignores rejections and returns `undefined` for them',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'scope-1',
    title: 'Block scope vs function scope',
    difficulty: 'Easy',
    category: 'Scope & Hoisting',
    tags: ['scope', 'block', 'var', 'let'],
    question: 'What does this log?',
    explanation:
      '`var` ignores block boundaries (`if` blocks are not a new scope for `var`), so `x` leaks out and is `10` outside the block. `let` is block-scoped, so the outer `y` declared with `let` remains untouched by the one declared inside the `if` block, and logs `1`.',
    codeExample: `if (true) {
  var x = 10;
  let y = 20;
}
console.log(x);

let y = 1;
if (true) {
  let y = 20;
}
console.log(y);`,
    expectedOutput: `10\n1`,
    quiz: {
      options: [
        '10, then 1 — `var` escapes the block, `let` stays block-scoped',
        '10, then 20',
        'A ReferenceError on the first log',
        '20, then 20',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'classes-1',
    title: 'Class fields and `this` in methods',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['classes', 'this', 'arrow-functions'],
    question: 'Why does calling `handleClick` as a detached function still work correctly?',
    explanation:
      'Declaring `handleClick` as an arrow-function class field binds `this` lexically to the instance at creation time, rather than depending on the call-site. So even when the method is extracted and invoked without its object context (e.g., passed as a callback), `this` still refers to the instance.',
    codeExample: `class Button {
  label = 'Submit';
  handleClick = () => {
    console.log(\`Clicked: \${this.label}\`);
  };
}

const btn = new Button();
const clickHandler = btn.handleClick;
clickHandler();`,
    expectedOutput: `Clicked: Submit`,
    quiz: {
      options: [
        '"Clicked: Submit" — arrow class fields bind `this` lexically',
        'A TypeError: Cannot read properties of undefined',
        '"Clicked: undefined"',
        'Nothing is logged because the method was detached',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-1',
    title: 'Event delegation',
    difficulty: 'Medium',
    category: 'DOM & Events',
    tags: ['dom', 'events', 'delegation'],
    question: 'Why attach a single click listener to `<ul>` instead of one per `<li>`?',
    explanation:
      'Events bubble up the DOM tree, so a click on any `<li>` also triggers listeners on its ancestors. Attaching one listener to the parent `<ul>` and inspecting `event.target` lets you handle clicks on any current *or future* child without re-binding listeners — this is event delegation, and it is more memory-efficient for large or dynamic lists.',
    codeExample: `document.querySelector('ul').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Clicked item:', event.target.textContent);
  }
});`,
    expectedOutput: `Clicked item: <text of the clicked li>`,
    quiz: {
      options: [
        'It uses event bubbling to handle clicks on any (including future) child with one listener',
        'It is required because `<li>` elements cannot have their own listeners',
        'It prevents the page from reloading',
        'It has no real benefit over per-item listeners',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-2',
    title: 'Debouncing an input handler',
    difficulty: 'Hard',
    category: 'DOM & Events',
    tags: ['debounce', 'performance', 'closures'],
    question: 'How many times does the API call actually fire if the user types 5 characters quickly (within the delay window)?',
    explanation:
      'Debounce uses a closure over `timer` to cancel any pending timeout every time the function is invoked again, only letting the last call through after `delay` ms of silence. So rapid typing within the delay window results in exactly one call, fired after the user pauses.',
    codeExample: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => console.log('Searching for', query), 300);
search('r');
search('re');
search('rea');
search('reac');
search('react');`,
    expectedOutput: `Searching for react`,
    quiz: {
      options: [
        'Once — only the final call survives the debounce delay',
        'Five times — once per keystroke',
        'Zero times — debounce blocks all calls',
        'Twice — the first and last calls both fire',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'generators-1',
    title: 'Generator functions basics',
    difficulty: 'Hard',
    category: 'ES6+',
    tags: ['generators', 'iterators'],
    question: 'What values come out of calling `.next()` three times?',
    explanation:
      'A generator function pauses at each `yield` and resumes from there on the next `.next()` call. The first two calls yield `1` and `2` respectively (with `done: false`); the third call runs past the last `yield` to the end of the function body, returning `{ value: undefined, done: true }`.',
    codeExample: `function* gen() {
  yield 1;
  yield 2;
}

const it = gen();
console.log(it.next());
console.log(it.next());
console.log(it.next());`,
    expectedOutput: `{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: undefined, done: true }`,
    quiz: {
      options: [
        '{value:1,done:false}, {value:2,done:false}, {value:undefined,done:true}',
        'It yields 1, 2, and then throws an error',
        '{value:1,done:true} immediately on the first call',
        'An infinite loop, since generators never finish',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-4',
    title: 'Flattening nested arrays',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'flat'],
    question: 'What does `nested.flat(Infinity)` return?',
    explanation:
      '`Array.prototype.flat(depth)` flattens nested arrays up to `depth` levels. Passing `Infinity` flattens arbitrarily deep nesting into a single flat array.',
    codeExample: `const nested = [1, [2, [3, [4, [5]]]]];
console.log(nested.flat(Infinity));`,
    expectedOutput: `[1, 2, 3, 4, 5]`,
    quiz: {
      options: ['[1, 2, 3, 4, 5]', '[1, [2, [3, [4, [5]]]]]', '[1, 2, [3, 4, 5]]', 'An error, since Infinity is not a valid depth'],
      correctIndex: 0,
    },
  },
  {
    id: 'strings-1',
    title: 'Template literals and tagged templates',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['template-literals', 'strings'],
    question: 'What does the tagged template function receive, and what is logged?',
    explanation:
      'A tagged template function receives the literal string segments as its first argument (an array) and each interpolated expression as the subsequent arguments. Here `highlight` wraps each interpolated value in `**` markers while stitching the strings array back together.',
    codeExample: `function highlight(strings, ...values) {
  return strings.reduce(
    (result, str, i) => \`\${result}\${str}\${values[i] ? \`**\${values[i]}**\` : ''}\`,
    ''
  );
}

const name = 'Ada';
const age = 36;
console.log(highlight\`Name: \${name}, Age: \${age}\`);`,
    expectedOutput: `Name: **Ada**, Age: **36**`,
    quiz: {
      options: [
        '"Name: **Ada**, Age: **36**"',
        '"Name: Ada, Age: 36"',
        'A TypeError because tagged templates require a class',
        '"Name: ${name}, Age: ${age}"',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'maps-sets-1',
    title: 'Map vs plain object for keys',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['map', 'set', 'data-structures'],
    question: 'Why does using an object as a key work correctly with `Map` but not with a plain object?',
    explanation:
      'Plain object keys are always coerced to strings, so any object key becomes `"[object Object]"`, causing collisions between different keys. `Map` preserves the original key by reference (or value for primitives), so distinct object references remain distinct keys.',
    codeExample: `const objKey1 = { id: 1 };
const objKey2 = { id: 2 };

const plainObj = {};
plainObj[objKey1] = 'first';
plainObj[objKey2] = 'second';
console.log(Object.keys(plainObj).length);

const map = new Map();
map.set(objKey1, 'first');
map.set(objKey2, 'second');
console.log(map.size);`,
    expectedOutput: `1\n2`,
    quiz: {
      options: [
        '1, then 2 — object keys collide as strings, Map keeps them distinct',
        '2, then 2',
        '2, then 1',
        '1, then 1',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'error-1',
    title: 'try/catch/finally execution order',
    difficulty: 'Medium',
    category: 'Error Handling',
    tags: ['try-catch', 'finally', 'error-handling'],
    question: 'In what order do the logs appear, and what does `run()` return?',
    explanation:
      '`finally` always executes, even when the `try` block returns — but if `finally` *also* contains a `return`, it overrides any return value from `try` or `catch`. Here the flow logs `try`, then `catch` (since an error is thrown), then `finally`, and the final returned value is the one from `finally`.',
    codeExample: `function run() {
  try {
    console.log('try');
    throw new Error('fail');
  } catch (e) {
    console.log('catch');
    return 'from catch';
  } finally {
    console.log('finally');
    return 'from finally';
  }
}

console.log(run());`,
    expectedOutput: `try\ncatch\nfinally\nfrom finally`,
    quiz: {
      options: [
        'try, catch, finally, then "from finally" is returned',
        'try, catch, then "from catch" is returned, finally never runs',
        'try, finally, catch',
        'A crash because you cannot return from finally',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'modules-1',
    title: 'Named vs default exports',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['modules', 'import-export'],
    question: 'What is the key difference between a default export and a named export?',
    explanation:
      'A module can have only one default export but many named exports. Default exports can be imported under any local name (`import whatever from "./math"`), while named exports must be imported using their exact exported name (optionally renamed with `as`), typically inside curly braces.',
    codeExample: `// math.js
export default function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// consumer.js
import add, { subtract } from './math.js';
console.log(add(2, 3), subtract(5, 2));`,
    expectedOutput: `5 3`,
    quiz: {
      options: [
        'A module can have one default export but many named exports, each imported differently',
        'Default and named exports behave identically in every way',
        'Named exports can only be used with CommonJS, not ES modules',
        'Default exports must always be classes',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-3',
    title: 'Implicit string concatenation with +',
    difficulty: 'Easy',
    category: 'Type Coercion',
    tags: ['coercion', 'operators', 'numbers'],
    question: 'What does `3 + 2 + "7"` evaluate to?',
    explanation:
      'The `+` operator evaluates left to right. `3 + 2` are both numbers, so they add normally to `5`. Then `5 + "7"` mixes a number with a string, so JavaScript converts `5` to `"5"` and concatenates, producing `"57"`.',
    codeExample: `console.log(3 + 2 + '7');`,
    expectedOutput: `57`,
    quiz: {
      options: ['"57"', '12', '"327"', 'NaN'],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-4',
    title: "Why does typeof null return 'object'?",
    difficulty: 'Easy',
    category: 'Type Coercion',
    tags: ['typeof', 'null', 'quirks'],
    question: 'What does `typeof null` return, and why?',
    explanation:
      'This is a long-standing bug from the very first JavaScript engine: values were tagged internally, and the tag for objects happened to be the same tag `null` was given. `typeof null` has returned `"object"` ever since, and fixing it would break existing code, so it was never corrected. To check for `null` specifically, compare with `=== null` instead of relying on `typeof`.',
    codeExample: `console.log(typeof null);
console.log(typeof undefined);`,
    expectedOutput: `object\nundefined`,
    quiz: {
      options: [
        '"object" — a legacy bug in how `null` was tagged internally',
        '"null" — typeof has a special case for null',
        '"undefined"',
        'It throws a TypeError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-5',
    title: 'Truthy and falsy values',
    difficulty: 'Easy',
    category: 'Type Coercion',
    tags: ['truthy', 'falsy', 'conditionals'],
    question: 'Which of these values are "falsy" in a boolean context?',
    explanation:
      'JavaScript has exactly six falsy values: `false`, `0` (and `-0`), `""` (empty string), `null`, `undefined`, and `NaN`. Every other value — including `"0"`, `[]`, and `{}` — is truthy, which surprises many developers coming from other languages.',
    codeExample: `[false, 0, '', null, undefined, NaN, '0', [], {}].forEach((v) =>
  console.log(v, Boolean(v))
);`,
    expectedOutput: `false false\n0 false\n"" false\nnull false\nundefined false\nNaN false\n"0" true\n[] true\n{} true`,
    quiz: {
      options: [
        'false, 0, "", null, undefined, and NaN — everything else, including "0", [], and {}, is truthy',
        'Only false and null are falsy',
        'Empty arrays and objects are always falsy',
        'Any number, including 0, is truthy',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-6',
    title: 'null vs undefined',
    difficulty: 'Easy',
    category: 'Type Coercion',
    tags: ['null', 'undefined'],
    question: 'What is the conceptual difference between `null` and `undefined`?',
    explanation:
      '`undefined` means a variable has been declared (or a parameter/property exists) but has not been assigned a value yet — it is JavaScript`s own default. `null` is a value a developer assigns deliberately to represent "no value" or "empty" on purpose. They are loosely equal (`null == undefined` is `true`) but never strictly equal (`null === undefined` is `false`), and `typeof` reports `"undefined"` for the former and `"object"` for the latter.',
    codeExample: `let a;
let b = null;

console.log(a);
console.log(b);
console.log(typeof a, typeof b);
console.log(a == b, a === b);`,
    expectedOutput: `undefined\nnull\nundefined object\ntrue false`,
    quiz: {
      options: [
        '`undefined` means "not assigned yet"; `null` means "intentionally empty" — they are loosely but not strictly equal',
        'They are completely interchangeable in every situation',
        '`typeof null` is "null" and `typeof undefined` is "undefined"',
        '`null === undefined` is true',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'numbers-1',
    title: 'isNaN vs Number.isNaN',
    difficulty: 'Medium',
    category: 'Numbers',
    tags: ['numbers', 'nan', 'coercion'],
    question: 'Why do `isNaN("hello")` and `Number.isNaN("hello")` disagree?',
    explanation:
      'The global `isNaN()` first coerces its argument to a number, then checks if the result is `NaN` — since `"hello"` cannot be converted to a number, it coerces to `NaN` and `isNaN` returns `true`. `Number.isNaN()` does not coerce at all; it only returns `true` if the value is already of type number *and* is `NaN`. Since `"hello"` is a string, `Number.isNaN("hello")` is `false`.',
    codeExample: `console.log(isNaN('hello'));
console.log(Number.isNaN('hello'));
console.log(Number.isNaN(0 / 0));`,
    expectedOutput: `true\nfalse\ntrue`,
    quiz: {
      options: [
        'true, false, true — isNaN coerces first, Number.isNaN does not',
        'true, true, true',
        'false, false, true',
        'Both always return the same result',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'numbers-2',
    title: 'Floating point precision surprises',
    difficulty: 'Medium',
    category: 'Numbers',
    tags: ['numbers', 'floating-point', 'precision'],
    question: 'What does `0.1 + 0.2 === 0.3` evaluate to, and why?',
    explanation:
      'JavaScript numbers use the IEEE-754 double-precision binary floating-point format, which cannot represent most decimal fractions exactly. `0.1 + 0.2` actually computes to `0.30000000000000004`, which is not strictly equal to `0.3`. To compare floating-point numbers safely, check that the difference is smaller than a small epsilon value instead of using `===`.',
    codeExample: `console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);`,
    expectedOutput: `0.30000000000000004\nfalse\ntrue`,
    quiz: {
      options: [
        '`false` — binary floating-point cannot represent 0.1 or 0.2 exactly',
        '`true` — JavaScript rounds decimal addition automatically',
        'A TypeError is thrown',
        '`false` because 0.1 and 0.2 are strings',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'numbers-3',
    title: 'parseInt and the radix argument',
    difficulty: 'Easy',
    category: 'Numbers',
    tags: ['numbers', 'parseint', 'radix'],
    question: 'What do `parseInt("1010", 2)` and `parseInt("08")` return?',
    explanation:
      '`parseInt` accepts an optional radix (base) as its second argument. `parseInt("1010", 2)` reads `"1010"` as binary, giving `10`. Without a radix, `parseInt` guesses the base from the string`s prefix; `"08"` has no `0x` prefix so it is parsed as base 10, giving `8`. Always pass an explicit radix to avoid ambiguity across environments.',
    codeExample: `console.log(parseInt('1010', 2));
console.log(parseInt('08'));
console.log(parseInt('FF', 16));`,
    expectedOutput: `10\n8\n255`,
    quiz: {
      options: ['10, 8, 255', '1010, 8, FF', '10, NaN, 255', '2, 8, 16'],
      correctIndex: 0,
    },
  },
  {
    id: 'array-5',
    title: 'Checking for arrays with Array.isArray',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'isarray', 'type-checking'],
    question: 'Why should you use `Array.isArray(value)` instead of `typeof value === "object"` to detect arrays?',
    explanation:
      'Arrays are objects in JavaScript, so `typeof []` returns `"object"` just like a plain object would — it cannot distinguish the two. `Array.isArray()` is a dedicated check that correctly reports `true` only for actual arrays, regardless of which realm (iframe, worker, etc.) they were created in.',
    codeExample: `console.log(typeof []);
console.log(Array.isArray([]));
console.log(Array.isArray({ length: 0 }));`,
    expectedOutput: `object\ntrue\nfalse`,
    quiz: {
      options: [
        '`typeof` cannot tell arrays from plain objects; `Array.isArray` can',
        '`typeof []` returns "array"',
        'Both approaches are equivalent',
        '`Array.isArray` throws for non-array inputs',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-6',
    title: 'flatMap: map and flatten in one step',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'flatmap'],
    question: 'What does `[1, 2, 3].flatMap((n) => [n, n * 2])` return?',
    explanation:
      '`flatMap` runs the callback like `map` (each call can return an array), then flattens the results by exactly one level. It is equivalent to calling `.map(fn).flat()`, but performs both steps more efficiently in a single pass.',
    codeExample: `const result = [1, 2, 3].flatMap((n) => [n, n * 2]);
console.log(result);`,
    expectedOutput: `[1, 2, 2, 4, 3, 6]`,
    quiz: {
      options: [
        '[1, 2, 2, 4, 3, 6]',
        '[[1, 2], [2, 4], [3, 6]]',
        '[2, 4, 6]',
        '[1, 2, 3]',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-7',
    title: 'Splicing an array',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'splice', 'mutation'],
    question: 'What does `fruits` contain after `fruits.splice(1, 1, "mango", "grape")`?',
    explanation:
      '`splice(start, deleteCount, ...items)` mutates the array in place: it removes `deleteCount` elements starting at index `start`, then inserts the given items at that position. Here it removes 1 element at index 1 (`"banana"`) and inserts `"mango"` and `"grape"` in its place.',
    codeExample: `const fruits = ['apple', 'banana', 'cherry'];
fruits.splice(1, 1, 'mango', 'grape');
console.log(fruits);`,
    expectedOutput: `['apple', 'mango', 'grape', 'cherry']`,
    quiz: {
      options: [
        "['apple', 'mango', 'grape', 'cherry']",
        "['apple', 'banana', 'cherry', 'mango', 'grape']",
        "['apple', 'cherry']",
        "['mango', 'grape']",
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-8',
    title: 'find vs filter',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'find', 'filter'],
    question: 'How do `find` and `filter` differ when searching an array?',
    explanation:
      '`find` returns the *first* element that satisfies the callback (or `undefined` if none match), and stops iterating as soon as it finds a match. `filter` always scans the whole array and returns a *new array* containing every matching element (or an empty array if none match).',
    codeExample: `const nums = [4, 9, 16, 25];
console.log(nums.find((n) => n > 10));
console.log(nums.filter((n) => n > 10));`,
    expectedOutput: `16\n[16, 25]`,
    quiz: {
      options: [
        '`find` returns the first match as a single value; `filter` returns all matches as an array',
        'They always return identical results',
        '`find` returns an array and `filter` returns a single value',
        '`filter` stops at the first match like `find`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-9',
    title: 'findLast and findLastIndex',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'findlast', 'findlastindex'],
    question: 'What does `[5, 12, 8, 20, 3].findLast((n) => n < 10)` return, and how is it different from `find`?',
    explanation:
      '`findLast` works like `find` but scans the array from the *end* toward the start, returning the first match it encounters in that direction. Here, scanning backward from index 4, `3` (< 10) is found immediately, so it is returned — whereas `find` would have returned `5`, the first match scanning forward.',
    codeExample: `const nums = [5, 12, 8, 20, 3];
console.log(nums.findLast((n) => n < 10));
console.log(nums.find((n) => n < 10));`,
    expectedOutput: `3\n5`,
    quiz: {
      options: [
        '3, then 5 — findLast searches from the end, find searches from the start',
        '5, then 5 — both search from the start',
        '3, then 3',
        'undefined for both',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-10',
    title: 'Sorting an array of objects by property',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'sort', 'objects'],
    question: 'How does `users.sort((a, b) => a.age - b.age)` order the array?',
    explanation:
      'The compare function receives two elements at a time; returning a negative number means the first should come before the second, positive means after, and zero means keep their relative order. Subtracting `b.age` from `a.age` produces ascending order by age, since smaller ages yield negative results and sort earlier.',
    codeExample: `const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Peter', age: 35 },
];

users.sort((a, b) => a.age - b.age);
console.log(users.map((u) => u.name));`,
    expectedOutput: `['Jane', 'John', 'Peter']`,
    quiz: {
      options: [
        "['Jane', 'John', 'Peter'] — sorted ascending by age",
        "['Peter', 'John', 'Jane'] — sorted descending by age",
        "['John', 'Jane', 'Peter'] — original order is preserved",
        'A TypeError because objects cannot be sorted',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-11',
    title: 'Merging and deduplicating arrays with Set',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'set', 'deduplication'],
    question: 'What does `[...new Set([...arr1, ...arr2])]` produce for `arr1 = [1, 2, 3]` and `arr2 = [2, 3, 4]`?',
    explanation:
      'Spreading both arrays together produces `[1, 2, 3, 2, 3, 4]`. Passing that into `new Set(...)` keeps only the unique values (a `Set` cannot contain duplicates), preserving first-seen insertion order. Spreading the `Set` back into an array yields the merged, deduplicated result.',
    codeExample: `const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const merged = [...new Set([...arr1, ...arr2])];
console.log(merged);`,
    expectedOutput: `[1, 2, 3, 4]`,
    quiz: {
      options: ['[1, 2, 3, 4]', '[1, 2, 3, 2, 3, 4]', '[4, 3, 2, 1]', 'A Set object, not an array'],
      correctIndex: 0,
    },
  },
  {
    id: 'array-12',
    title: 'Converting array-like objects to real arrays',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'array-from', 'arguments'],
    question: 'Why can`t you call `.map()` directly on the `arguments` object, and how do you fix it?',
    explanation:
      '`arguments` (and things like a DOM `NodeList`) are "array-like": they have a `length` and indexed properties, but they don`t inherit from `Array.prototype`, so array methods like `.map()` aren`t available on them. Converting with `Array.from(arguments)` or the spread operator `[...arguments]` produces a real array with full access to array methods.',
    codeExample: `function sumAll() {
  const nums = Array.from(arguments);
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3));`,
    expectedOutput: `6`,
    quiz: {
      options: [
        '`arguments` is array-like but not a real array, so `Array.from` or spread is needed to use array methods on it',
        '`arguments` is already a full array in every engine',
        'You must use a `for` loop; there is no way to convert it',
        '`arguments.map` works fine without conversion',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-13',
    title: 'Rest parameters must come last',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['rest-parameters', 'syntax'],
    question: 'Why does `function items(list, ...rest, last) {}` fail to parse?',
    explanation:
      'A rest parameter collects "everything else" passed to the function, so by definition nothing can logically come after it — the engine wouldn`t know how many arguments belong to `rest` versus `last`. JavaScript enforces this with a `SyntaxError` at parse time: the rest parameter must always be the final parameter in the list.',
    codeExample: `function items(list, ...rest, last) {
  return [list, ...rest, last];
}
// SyntaxError: Rest parameter must be last formal parameter`,
    expectedOutput: `SyntaxError: Rest parameter must be last formal parameter`,
    quiz: {
      options: [
        'It throws a SyntaxError, because a rest parameter must be the last parameter',
        'It works fine and `last` is always undefined',
        'It silently ignores every parameter after `rest`',
        'JavaScript automatically moves `last` before `...rest`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-14',
    title: 'Sparse arrays and array holes',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'sparse-arrays', 'holes'],
    question: 'What is `arr.length` after `const arr = [1, 2, 3]; arr[10] = 99;`, and what do the skipped indices contain?',
    explanation:
      'Assigning to an index beyond the current length does not throw or fill in between values — it creates a "sparse" array with empty slots (holes) from index 3 through 9, and bumps `length` to one more than the highest assigned index (`10 + 1 = 11`). These holes are not the same as storing `undefined`: methods like `forEach` and `map` skip holes entirely, while direct index access like `arr[5]` still returns `undefined`.',
    codeExample: `const arr = [1, 2, 3];
arr[10] = 99;

console.log(arr.length);
console.log(arr[5]);
arr.forEach((val, i) => console.log('visited index', i));`,
    expectedOutput: `11\nundefined\nvisited index 0\nvisited index 1\nvisited index 2\nvisited index 10`,
    quiz: {
      options: [
        '11 — length becomes the highest index + 1, and forEach skips the empty holes entirely',
        '4 — length only counts assigned elements',
        '11, and forEach visits all 11 indices including the holes',
        'A RangeError is thrown for out-of-bounds assignment',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-3',
    title: 'Object.keys, Object.values, and Object.entries',
    difficulty: 'Easy',
    category: 'Objects',
    tags: ['objects', 'object-keys', 'object-entries'],
    question: 'What do `Object.keys`, `Object.values`, and `Object.entries` each return for `{ a: 1, b: 2 }`?',
    explanation:
      'All three inspect an object`s own enumerable properties, but return different shapes: `Object.keys` gives an array of property names, `Object.values` gives an array of the corresponding values, and `Object.entries` gives an array of `[key, value]` pairs — handy for looping with destructuring or converting an object to a `Map`.',
    codeExample: `const obj = { a: 1, b: 2 };
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));`,
    expectedOutput: `['a', 'b']\n[1, 2]\n[['a', 1], ['b', 2]]`,
    quiz: {
      options: [
        "['a', 'b'], then [1, 2], then [['a', 1], ['b', 2]]",
        'They all return the same array of keys',
        "[1, 2], then ['a', 'b'], then [['a', 1], ['b', 2]]",
        'Object.entries returns a plain object, not an array',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-4',
    title: 'Object.freeze vs Object.seal vs Object.preventExtensions',
    difficulty: 'Hard',
    category: 'Objects',
    tags: ['objects', 'freeze', 'seal', 'immutability'],
    question: 'What is the difference between `Object.freeze`, `Object.seal`, and `Object.preventExtensions`?',
    explanation:
      'These three methods offer increasing levels of restriction. `Object.preventExtensions` only blocks *adding new* properties — existing ones can still be updated or deleted. `Object.seal` also prevents deleting existing properties (and adding new ones), but their values can still be changed. `Object.freeze` is the strictest: it prevents adding, deleting, *and* updating any property, making the object fully immutable at the top level.',
    codeExample: `const sealed = Object.seal({ count: 1 });
sealed.count = 2;
delete sealed.count;
sealed.extra = true;
console.log(sealed);`,
    expectedOutput: `{ count: 2 }`,
    quiz: {
      options: [
        '`preventExtensions` blocks new properties only; `seal` also blocks deletion; `freeze` blocks all mutation',
        'All three behave identically',
        '`freeze` only blocks adding properties, `seal` blocks everything',
        '`seal` allows adding new properties but not changing values',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-5',
    title: 'JSON.stringify with a replacer array',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['json', 'stringify', 'serialization'],
    question: 'What does `JSON.stringify(obj, ["name", "level"])` produce for `{ name: "GFG", level: 4, company: true }`?',
    explanation:
      'The second argument to `JSON.stringify` can be an array of property names acting as an allow-list — only those properties are included in the resulting JSON string, in the order given. Any property not listed (like `company` here) is silently omitted.',
    codeExample: `const obj = { name: 'GFG', level: 4, company: true };
const json = JSON.stringify(obj, ['name', 'level']);
console.log(json);`,
    expectedOutput: `{"name":"GFG","level":4}`,
    quiz: {
      options: [
        '\'{"name":"GFG","level":4}\' — the replacer array acts as an allow-list of keys',
        'The full object is stringified, ignoring the array',
        'A TypeError is thrown because arrays cannot be replacers',
        '\'{"company":true}\' — everything except the listed keys is included',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-6',
    title: 'Assigning an object to another variable',
    difficulty: 'Easy',
    category: 'Objects',
    tags: ['objects', 'references'],
    question: 'After `let obj2 = obj1; obj1.name = "Changed";`, what does `obj2.name` show?',
    explanation:
      'Objects are held by reference in JavaScript. Assigning `obj1` to `obj2` does not create a new object — both variables point to the exact same object in memory. Mutating a property through either variable is visible through the other, since there is only one underlying object.',
    codeExample: `let obj1 = { name: 'GFG' };
let obj2 = obj1;
obj1.name = 'GeeksForGeeks';
console.log(obj2.name);`,
    expectedOutput: `GeeksForGeeks`,
    quiz: {
      options: [
        '"GeeksForGeeks" — both variables reference the same object',
        '"GFG" — obj2 keeps the original value',
        'undefined',
        'A TypeError because obj1 was reassigned',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-7',
    title: 'Basic object destructuring',
    difficulty: 'Easy',
    category: 'Objects',
    tags: ['objects', 'destructuring'],
    question: 'What values do `name` and `age` hold after destructuring `{ name: "Alice", age: 25 }`?',
    explanation:
      'Object destructuring unpacks properties into standalone variables using a shorthand syntax: `const { name, age } = user` looks up the properties named `name` and `age` on `user` and binds their values to new variables with matching names, avoiding repetitive `user.name` / `user.age` access.',
    codeExample: `const user = { name: 'Alice', age: 25 };
const { name, age } = user;
console.log(name, age);`,
    expectedOutput: `Alice 25`,
    quiz: {
      options: ['Alice 25', 'undefined undefined', '"name" "age"', 'A ReferenceError'],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-8',
    title: 'Merging objects: spread vs Object.assign',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['objects', 'spread', 'object-assign'],
    question: 'Do `{ ...a, ...b }` and `Object.assign({}, a, b)` behave the same way when merging objects?',
    explanation:
      'Both perform a shallow merge and both let later sources overwrite earlier ones when keys collide. The spread syntax `{ ...a, ...b }` always creates a brand-new object literal. `Object.assign(target, ...sources)` copies properties *onto* the given target object (mutating it) and also returns it — passing a fresh `{}` as the target, as shown here, produces the same practical result as spreading.',
    codeExample: `const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };

const spread = { ...a, ...b };
const assigned = Object.assign({}, a, b);

console.log(spread);
console.log(assigned);`,
    expectedOutput: `{ x: 1, y: 3, z: 4 }\n{ x: 1, y: 3, z: 4 }`,
    quiz: {
      options: [
        'Both produce { x: 1, y: 3, z: 4 } — later sources win on key collisions',
        'Object.assign keeps the first value on collisions instead of the last',
        'Spread throws an error when keys collide',
        'They produce different key orders that change the final values',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-9',
    title: 'Object.is vs ===',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['object-is', 'equality'],
    question: 'Where do `Object.is` and `===` disagree?',
    explanation:
      '`Object.is` behaves like `===` for almost every value, but fixes two edge cases: `Object.is(NaN, NaN)` is `true` (whereas `NaN === NaN` is famously `false`), and `Object.is(0, -0)` is `false` (whereas `0 === -0` is `true`, even though they are distinct values internally).',
    codeExample: `console.log(NaN === NaN, Object.is(NaN, NaN));
console.log(0 === -0, Object.is(0, -0));`,
    expectedOutput: `false true\ntrue false`,
    quiz: {
      options: [
        '`Object.is` treats NaN as equal to itself and distinguishes 0 from -0, unlike `===`',
        '`Object.is` and `===` always agree',
        '`Object.is` throws for NaN comparisons',
        '`===` treats NaN as equal to itself',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-3',
    title: "What makes a function 'higher-order'?",
    difficulty: 'Easy',
    category: 'Functions',
    tags: ['higher-order-functions', 'functional-programming'],
    question: 'Why are `map`, `filter`, and a custom function like `withLogging(fn)` all considered higher-order functions?',
    explanation:
      'A higher-order function is any function that takes one or more functions as arguments, returns a function, or both. `Array.prototype.map` and `filter` take a callback argument, so they qualify. A wrapper like `withLogging(fn)` that returns a *new* function which calls `fn` also qualifies, since it returns a function.',
    codeExample: `function withLogging(fn) {
  return (...args) => {
    console.log('calling with', args);
    return fn(...args);
  };
}

const loggedAdd = withLogging((a, b) => a + b);
console.log(loggedAdd(2, 3));`,
    expectedOutput: `calling with [ 2, 3 ]\n5`,
    quiz: {
      options: [
        'A function is higher-order if it accepts a function as an argument, returns one, or both',
        'Only built-in array methods can be higher-order',
        'A higher-order function must always be asynchronous',
        'Any function with more than one parameter is higher-order',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-4',
    title: 'Memoizing an expensive function',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['memoization', 'performance', 'closures'],
    question: 'How does the `memoize` wrapper avoid recomputing `slowSquare` for repeated inputs?',
    explanation:
      'Memoization caches a function`s results keyed by its arguments. The returned function checks a closure-captured `cache` map first; if the same argument was seen before, it returns the stored result immediately instead of re-running the expensive computation, trading memory for speed on repeated calls.',
    codeExample: `function memoize(fn) {
  const cache = new Map();
  return (n) => {
    if (cache.has(n)) return cache.get(n);
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
}

const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);

console.log(fastSquare(5));
console.log(fastSquare(5));`,
    expectedOutput: `25\n25`,
    quiz: {
      options: [
        'The second call returns the cached result instead of recalculating',
        'Memoization has no effect on repeated calls with the same argument',
        'The cache is cleared automatically after every call',
        'It only works with asynchronous functions',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-5',
    title: 'Default parameters and shared references',
    difficulty: 'Hard',
    category: 'Functions',
    tags: ['default-parameters', 'spread', 'references'],
    question: 'Why do the last two calls to `fun(obj)` produce different results than the first two calls to `fun()`?',
    explanation:
      'The default parameter `x = { ...obj }` only runs when no argument is passed, and it creates a *fresh* shallow copy each time — so calling `fun()` twice never affects `obj` itself, and each call divides a brand-new `num: 2` by 2. But when `obj` is passed explicitly, the default is skipped entirely and `x` becomes a direct reference to `obj`, so mutations via `x.num /= 2` permanently change `obj`, compounding on each subsequent call.',
    codeExample: `const obj = { num: 2 };
const fun = (x = { ...obj }) => {
  console.log((x.num /= 2));
};

fun();
fun();
fun(obj);
fun(obj);`,
    expectedOutput: `1\n1\n1\n0.5`,
    quiz: {
      options: [
        '1, 1, 1, 0.5 — calls without an argument copy `obj` fresh each time, but passing `obj` directly mutates the same object repeatedly',
        '1, 1, 1, 1 — the default parameter always creates a new copy',
        '1, 0.5, 0.25, 0.125 — every call divides the previous result',
        'A TypeError, because default parameters cannot use the spread operator',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-6',
    title: 'Currying a function',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['currying', 'closures', 'functional-programming'],
    question: 'What does `add(1)(2)(3)` return for the curried `add` function below?',
    explanation:
      'Currying transforms a function that takes multiple arguments into a sequence of functions that each take one argument. Every call to `add(a)` returns a new function that remembers `a` via closure, waiting for `b`, which in turn returns another function waiting for `c` before finally computing the sum.',
    codeExample: `const add = (a) => (b) => (c) => a + b + c;
console.log(add(1)(2)(3));`,
    expectedOutput: `6`,
    quiz: {
      options: ['6', '"123"', 'A function is logged, not a number', 'NaN'],
      correctIndex: 0,
    },
  },
  {
    id: 'oop-1',
    title: 'Does JavaScript support multiple inheritance?',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['oop', 'mixins', 'classes'],
    question: 'Can a JavaScript class extend more than one parent class directly?',
    explanation:
      'No — `class X extends A, B {}` is not valid syntax; a class can only extend a single parent, and an object`s prototype chain is a single linked list, not a tree. To share behavior from multiple sources, JavaScript uses mixins: plain objects or functions whose methods are copied onto a class`s prototype, simulating multiple inheritance without the class hierarchy itself branching.',
    codeExample: `const CanFly = (Base) => class extends Base {
  fly() { return \`\${this.name} is flying\`; }
};

class Animal {
  constructor(name) { this.name = name; }
}

class Bird extends CanFly(Animal) {}

const bird = new Bird('Sparrow');
console.log(bird.fly());`,
    expectedOutput: `Sparrow is flying`,
    quiz: {
      options: [
        'No — a class can extend only one parent; mixins are used to combine behavior from multiple sources',
        'Yes, using `class X extends A, B {}`',
        'Yes, but only for abstract classes',
        'No, and JavaScript has no workaround for combining behaviors',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'oop-2',
    title: 'Private class fields with #',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['classes', 'private-fields', 'encapsulation'],
    question: 'What happens when you try to access `account.#balance` from outside the class?',
    explanation:
      'Fields prefixed with `#` are truly private to the class body — they are not accessible, enumerable, or even visible from outside, unlike the "private by convention" underscore prefix. Referencing `#balance` from outside the declaring class is a `SyntaxError` at parse time, not just a runtime restriction, so external code must go through public methods like `getBalance()`.',
    codeExample: `class Account {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}

const account = new Account();
account.deposit(100);
console.log(account.getBalance());
// account.#balance;
// SyntaxError: Private field '#balance' must be declared in an enclosing class`,
    expectedOutput: `100\n(accessing account.#balance from outside the class throws a SyntaxError)`,
    quiz: {
      options: [
        'A SyntaxError, since `#` fields are only accessible inside the declaring class',
        'It returns `undefined` silently',
        'It returns 100, same as calling getBalance()',
        'It works fine because # is just a naming convention',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'oop-3',
    title: 'Static class members',
    difficulty: 'Easy',
    category: 'Prototypes & OOP',
    tags: ['classes', 'static'],
    question: 'Why does calling `Counter.increment()` work but `new Counter().increment()` does not?',
    explanation:
      '`static` members belong to the class itself, not to instances created from it — they are useful for utility methods or shared counters that don`t need per-instance state. Because `increment` is static, it only exists on `Counter` directly; instances do not inherit static methods, so calling it on an instance throws a `TypeError`.',
    codeExample: `class Counter {
  static count = 0;
  static increment() {
    return ++Counter.count;
  }
}

console.log(Counter.increment());
console.log(Counter.increment());`,
    expectedOutput: `1\n2`,
    quiz: {
      options: [
        'Static members belong to the class itself, not to instances',
        'Static members are copied to every instance automatically',
        '`static` is just a naming convention with no real effect',
        'Instances always have access to static methods via the prototype chain',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'event-loop-2',
    title: 'Is JavaScript single-threaded?',
    difficulty: 'Easy',
    category: 'Event Loop',
    tags: ['event-loop', 'concurrency', 'single-threaded'],
    question: 'If JavaScript only has one thread, how can it handle things like network requests without freezing the page?',
    explanation:
      'JavaScript`s main thread really does execute one statement at a time — there is no shared-memory multithreading for your code. Asynchronous behavior comes from the *host environment* (the browser or Node.js), which offloads slow operations like timers, network calls, and file I/O to separate background mechanisms (Web APIs / libuv thread pool), and queues their callbacks to run on the main thread via the event loop once the call stack is empty.',
    codeExample: `console.log('start');

fetch('/data').then(() => console.log('data loaded'));

console.log('end');`,
    expectedOutput: `start\nend\ndata loaded`,
    quiz: {
      options: [
        'The browser/Node.js handles async work in the background and queues callbacks for the single JS thread via the event loop',
        'JavaScript spins up a new thread for every async call',
        'fetch() blocks the thread until the response arrives',
        'JavaScript is actually multi-threaded by default',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-3',
    title: 'Why is innerHTML risky with user input?',
    difficulty: 'Medium',
    category: 'DOM & Events',
    tags: ['dom', 'security', 'xss'],
    question: 'What can go wrong if you set `element.innerHTML = userInput` directly?',
    explanation:
      'Setting `innerHTML` parses the string as HTML and inserts it into the DOM. If `userInput` contains something like `<img src=x onerror="stealCookies()">`, that markup is parsed and executed just like any other HTML — this is a classic Cross-Site Scripting (XSS) vulnerability. Prefer `textContent` for plain text, or sanitize/escape untrusted input (or use a trusted templating/sanitization library) before ever inserting it as HTML.',
    codeExample: `// Unsafe: executes attacker-controlled markup
element.innerHTML = userInput;

// Safer: inserted as literal text, never parsed as HTML
element.textContent = userInput;`,
    expectedOutput: `Using innerHTML with unsanitized input can execute injected scripts (XSS); textContent treats it as plain text.`,
    quiz: {
      options: [
        'Unsanitized input can inject and execute malicious HTML/scripts (XSS)',
        'innerHTML always escapes HTML automatically, so it is perfectly safe',
        'It only affects performance, never security',
        'textContent has the same risk as innerHTML',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-4',
    title: 'Implementing a throttle function',
    difficulty: 'Hard',
    category: 'DOM & Events',
    tags: ['throttle', 'debounce', 'performance'],
    question: 'Unlike debounce, how does throttle behave when an event fires repeatedly and quickly, such as on scroll?',
    explanation:
      'Throttle guarantees a function runs at most once per fixed time window, no matter how many times the event fires — the first call goes through immediately, and a flag blocks further calls until the cooldown period elapses. This differs from debounce, which waits for a pause in activity and only fires once *after* the events stop; throttle instead fires at a steady, capped rate *while* events are still happening.',
    codeExample: `function throttle(fn, limit) {
  let inCooldown = false;
  return (...args) => {
    if (inCooldown) return;
    fn(...args);
    inCooldown = true;
    setTimeout(() => (inCooldown = false), limit);
  };
}

const logScroll = throttle(() => console.log('scroll handled'), 200);
window.addEventListener('scroll', logScroll);`,
    expectedOutput: `"scroll handled" logs at most once every 200ms while scrolling continues`,
    quiz: {
      options: [
        'Throttle runs the function at a steady, capped rate during continuous events, instead of waiting for a pause like debounce',
        'Throttle and debounce behave identically',
        'Throttle only runs the function once total, ever',
        'Throttle runs the function on every single event, unlike debounce',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'storage-1',
    title: 'Creating, reading, and deleting cookies',
    difficulty: 'Medium',
    category: 'Browser & Storage',
    tags: ['cookies', 'document-cookie'],
    question: 'How do you create, read, and delete a cookie using `document.cookie`?',
    explanation:
      '`document.cookie` is a single string property with unusual semantics: assigning to it *adds or updates* one cookie (formatted as `name=value; expires=...; path=/`) rather than replacing everything, while reading it returns *all* cookies joined by `; `. To delete a cookie, you set the same name with an `expires` date in the past, which tells the browser to discard it immediately.',
    codeExample: `document.cookie = 'username=Ada; path=/';
console.log(document.cookie);

document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';`,
    expectedOutput: `username=Ada`,
    quiz: {
      options: [
        'Assigning to document.cookie adds/updates one cookie; setting expires in the past deletes it',
        'document.cookie is read-only and can only be set by the server',
        'Assigning to document.cookie replaces every existing cookie',
        'Cookies cannot be deleted from JavaScript, only from server headers',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'storage-2',
    title: 'localStorage vs sessionStorage vs cookies',
    difficulty: 'Easy',
    category: 'Browser & Storage',
    tags: ['localstorage', 'sessionstorage', 'cookies'],
    question: 'How do `localStorage`, `sessionStorage`, and cookies differ in lifetime and where they are sent?',
    explanation:
      '`localStorage` persists indefinitely (until explicitly cleared) and is scoped per origin, holding a few MB of string data purely on the client. `sessionStorage` behaves the same way but is cleared when the tab/window closes. Cookies are much smaller (~4KB), can have an expiration date, and — unlike the two Storage APIs — are automatically sent to the server with every matching HTTP request, which makes them useful for authentication but adds request overhead.',
    codeExample: `localStorage.setItem('theme', 'dark');
sessionStorage.setItem('tab', 'active');
document.cookie = 'sessionId=abc123; path=/';

console.log(localStorage.getItem('theme'));`,
    expectedOutput: `dark`,
    quiz: {
      options: [
        'localStorage persists until cleared, sessionStorage clears on tab close, and only cookies are sent automatically with HTTP requests',
        'All three are automatically sent with every HTTP request',
        'localStorage and sessionStorage are identical in every way',
        'Cookies can store megabytes of data like localStorage',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'algo-1',
    title: 'Binary search on a sorted array',
    difficulty: 'Medium',
    category: 'Algorithms',
    tags: ['algorithms', 'binary-search', 'arrays'],
    question: 'What does this `binarySearch` function return for `target = 5` in `[1, 2, 3, 4, 5, 6, 7]`, and why is the array required to be sorted?',
    explanation:
      'Binary search repeatedly checks the middle element and discards the half of the array that cannot contain the target, which only works because the array is sorted — that ordering is what guarantees everything left of a too-large midpoint is also too large (and vice versa). This gives O(log n) performance instead of the O(n) a linear scan would need. Here `5` sits at index `4`, which the search finds in just a few comparisons.',
    codeExample: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 5));`,
    expectedOutput: `4`,
    quiz: {
      options: [
        '4 — binary search relies on the array being sorted to safely discard half the search space each step',
        '5 — it returns the target value, not its index',
        '-1 — 5 is not found',
        '0 — binary search always starts from the first index',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'error-2',
    title: 'Throwing and catching custom errors',
    difficulty: 'Medium',
    category: 'Error Handling',
    tags: ['errors', 'custom-errors', 'throw'],
    question: 'What does `err instanceof ValidationError` return, and why is extending `Error` useful here?',
    explanation:
      'Extending the built-in `Error` class lets you create custom error types that still behave like normal errors (with a `message`, `stack` trace, etc.) while adding your own identity via `instanceof` checks or a `name` property. This lets calling code distinguish *why* something failed — e.g., handling a `ValidationError` differently from a network error — instead of parsing error message strings.',
    codeExample: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validate(age) {
  if (age < 0) throw new ValidationError('Age cannot be negative');
}

try {
  validate(-1);
} catch (err) {
  console.log(err instanceof ValidationError, err.message);
}`,
    expectedOutput: `true Age cannot be negative`,
    quiz: {
      options: [
        '`true`, "Age cannot be negative" — custom error classes let you check error types with instanceof',
        '`false`, because extending Error breaks instanceof checks',
        'A TypeError is thrown because Error cannot be extended',
        '`true`, but err.message is undefined',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-4',
    title: 'matchAll vs a manual exec loop',
    difficulty: 'Hard',
    category: 'ES6+',
    tags: ['regex', 'matchall', 'iterators'],
    question: 'What is the advantage of `str.matchAll(regex)` over manually looping with `regex.exec(str)`?',
    explanation:
      '`matchAll` returns an iterator of every match, each with full access to capture groups, without you having to manage the regex`s mutable `lastIndex` property yourself. A manual `while ((m = regex.exec(str)))` loop requires the regex to have the global (`g`) flag and depends on correctly tracking `lastIndex` between iterations — forgetting to advance it, or reusing the same regex elsewhere, easily causes infinite loops or skipped matches. `matchAll` avoids all of that bookkeeping.',
    codeExample: `const str = 'cat, bat, hat';
const regex = /(\\w)at/g;

for (const match of str.matchAll(regex)) {
  console.log(match[0], '-> group:', match[1]);
}`,
    expectedOutput: `cat -> group: c\nbat -> group: b\nhat -> group: h`,
    quiz: {
      options: [
        'matchAll avoids manual `lastIndex` bookkeeping and gives easy access to capture groups for every match',
        'matchAll only returns the first match, like exec',
        'exec is always faster and safer than matchAll',
        'matchAll does not support capture groups',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-5',
    title: 'WeakMap and WeakSet',
    difficulty: 'Hard',
    category: 'ES6+',
    tags: ['weakmap', 'weakset', 'garbage-collection'],
    question: 'Why would you choose a `WeakMap` over a regular `Map` for associating extra data with DOM elements or objects?',
    explanation:
      'A `WeakMap` only accepts objects as keys and holds those keys *weakly* — meaning if there are no other references to a key object left in the program, the garbage collector is free to reclaim it, and its entry disappears from the `WeakMap` automatically. A regular `Map` holds strong references to its keys, so objects used as keys stay alive in memory for as long as the `Map` exists, even if nothing else references them — a common source of memory leaks when caching metadata per-object over a long-lived program.',
    codeExample: `let el = { id: 'button' };
const metadata = new WeakMap();
metadata.set(el, { clicks: 0 });

console.log(metadata.get(el));

el = null; // the object becomes eligible for garbage collection,
           // and its WeakMap entry can be cleaned up automatically`,
    expectedOutput: `{ clicks: 0 }`,
    quiz: {
      options: [
        'WeakMap holds keys weakly, letting garbage collection reclaim entries once the key object is no longer referenced elsewhere',
        'WeakMap and Map behave identically in every case',
        'WeakMap allows primitive values as keys, unlike Map',
        'WeakMap prevents its keys from ever being garbage collected',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-6',
    title: 'Making an object iterable with Symbol.iterator',
    difficulty: 'Hard',
    category: 'ES6+',
    tags: ['symbol', 'iterators', 'for-of'],
    question: 'Why does `for...of` work on the `range` object below, even though it is a plain object, not an array?',
    explanation:
      '`for...of` (and the spread operator) work on any object that implements the iterable protocol — that is, has a method at the well-known key `Symbol.iterator` returning an iterator object with a `.next()` method. By defining `[Symbol.iterator]` on `range`, we tell JavaScript exactly how to step through its values, making a custom object behave like a built-in iterable such as an array or `Map`.',
    codeExample: `const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

console.log([...range]);`,
    expectedOutput: `[1, 2, 3]`,
    quiz: {
      options: [
        'Defining `[Symbol.iterator]` makes an object follow the iterable protocol so `for...of` and spread can step through it',
        'for...of works on every object automatically, with no extra code needed',
        'Symbol.iterator is only usable inside classes, not object literals',
        'It fails with a TypeError because range is not an array',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-7',
    title: 'Intercepting object operations with Proxy',
    difficulty: 'Hard',
    category: 'ES6+',
    tags: ['proxy', 'reflect', 'metaprogramming'],
    question: 'What gets logged when you read and write properties on the `proxy` below?',
    explanation:
      '`Proxy` wraps a target object with a set of "trap" functions that intercept fundamental operations. The `get` trap fires on every property read and the `set` trap fires on every property write, letting you add behavior like logging, validation, or computed defaults transparently — the caller interacts with `proxy` exactly like a normal object, unaware that traps are running behind the scenes.',
    codeExample: `const target = { name: 'Ada' };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(\`reading \${String(prop)}\`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(\`writing \${String(prop)} = \${value}\`);
    obj[prop] = value;
    return true;
  },
});

console.log(proxy.name);
proxy.name = 'Grace';`,
    expectedOutput: `reading name\nAda\nwriting name = Grace`,
    quiz: {
      options: [
        'The get and set traps log every property read and write before delegating to the real object',
        'Proxy silently blocks all property access unless explicitly allowed',
        'Traps only fire once per property, not on every access',
        'Proxy requires the target to be an array',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-8',
    title: 'Deep cloning with structuredClone',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['structuredclone', 'deep-clone', 'objects'],
    question: 'Why does `structuredClone` succeed here where `JSON.parse(JSON.stringify(...))` would silently lose data?',
    explanation:
      'The classic `JSON.parse(JSON.stringify(obj))` trick only round-trips values JSON supports — it silently drops `undefined`, functions, and `Symbol` properties, converts `Date` objects into plain strings, and cannot handle circular references at all. The built-in `structuredClone()` function performs a true deep clone using the structured clone algorithm, correctly preserving `Date`, `Map`, `Set`, typed arrays, and even circular references, without needing any library.',
    codeExample: `const original = { createdAt: new Date(2024, 0, 1), tags: new Set(['a', 'b']) };
const cloned = structuredClone(original);

console.log(cloned.createdAt instanceof Date);
console.log(cloned.tags instanceof Set);
console.log(cloned === original);`,
    expectedOutput: `true\ntrue\nfalse`,
    quiz: {
      options: [
        'structuredClone preserves types like Date and Set correctly, unlike the JSON.stringify/parse trick',
        'Both approaches behave identically for every data type',
        'structuredClone only works on arrays',
        'structuredClone returns a shallow copy, same as spread',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'closures-3',
    title: 'Each closure gets its own independent state',
    difficulty: 'Easy',
    category: 'Closures',
    tags: ['closures', 'state'],
    question: 'Do `counterA` and `counterB` share the same `count` variable?',
    explanation:
      'Every call to `createCounter()` runs the function body again, creating a brand-new `count` variable and a brand-new closure around it. `counterA` and `counterB` are separate functions, each with their own private `count`, so incrementing one never affects the other.',
    codeExample: `function createCounter() {
  let count = 0;
  return () => ++count;
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA());
console.log(counterA());
console.log(counterB());`,
    expectedOutput: `1\n2\n1`,
    quiz: {
      options: [
        '1, 2, 1 — each call to createCounter() creates an independent closure',
        '1, 2, 3 — all counters share one count variable',
        '1, 1, 1',
        'A ReferenceError on the second call',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'closures-4',
    title: 'The revealing module pattern',
    difficulty: 'Medium',
    category: 'Closures',
    tags: ['closures', 'module-pattern', 'encapsulation'],
    question: 'Why can code outside `bankModule` read the balance but never set it directly?',
    explanation:
      'The revealing module pattern uses an IIFE to create a private closure scope, then returns an object that exposes only selected functions as the public API. `balance` is never attached to the returned object, so it stays trapped in the closure — the only way to affect it is through the deliberately exposed `deposit` and `getBalance` functions.',
    codeExample: `const bankModule = (function () {
  let balance = 0;
  return {
    deposit(amount) { balance += amount; },
    getBalance() { return balance; },
  };
})();

bankModule.deposit(50);
console.log(bankModule.getBalance());
console.log(bankModule.balance);`,
    expectedOutput: `50\nundefined`,
    quiz: {
      options: [
        '50, then undefined — balance is private to the closure and never exposed directly',
        '50, then 50',
        'undefined, then 50',
        'A TypeError because balance is read-only',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'closures-5',
    title: 'Closures inside forEach vs a plain for loop with var',
    difficulty: 'Medium',
    category: 'Closures',
    tags: ['closures', 'foreach', 'var'],
    question: 'Why do the callbacks created inside `forEach` each log the correct index, even though the loop still uses `function` (not arrow) callbacks?',
    explanation:
      'Unlike a `for (var i ...)` loop, `Array.prototype.forEach` invokes its callback once per element, passing the current index as a fresh parameter on each call. Since parameters create a new binding per invocation (regardless of `var`/`let`), each closure captures its own separate `index`, avoiding the classic `var` loop pitfall entirely.',
    codeExample: `[10, 20, 30].forEach(function (value, index) {
  setTimeout(() => console.log(index, value), 0);
});`,
    expectedOutput: `0 10\n1 20\n2 30`,
    quiz: {
      options: [
        '0 10, 1 20, 2 30 — each forEach callback gets its own fresh `index` parameter',
        '2 30, 2 30, 2 30 — all callbacks share the last index',
        '0 10 only, the rest are skipped',
        'A TypeError because setTimeout cannot be used inside forEach',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'hoisting-2',
    title: 'Function declarations vs function expressions and hoisting',
    difficulty: 'Easy',
    category: 'Scope & Hoisting',
    tags: ['hoisting', 'functions'],
    question: 'Why does calling `sayHi()` work before its definition, but calling `sayBye()` throws?',
    explanation:
      'Function *declarations* (`function sayHi() {}`) are fully hoisted — both the name and the function body are available before execution reaches that line. A function *expression* assigned to a `const`/`let` (`const sayBye = function () {}`) only hoists the variable declaration, which stays in the Temporal Dead Zone until the assignment line runs, so calling it earlier throws.',
    codeExample: `sayHi();

function sayHi() {
  console.log('hi');
}

sayBye();

const sayBye = function () {
  console.log('bye');
};`,
    expectedOutput: `hi\nUncaught ReferenceError: Cannot access 'sayBye' before initialization`,
    quiz: {
      options: [
        'Function declarations are fully hoisted; function expressions assigned to const/let are not usable before their line runs',
        'Both work fine because all functions are hoisted the same way',
        'Both throw a ReferenceError',
        'sayBye() logs undefined instead of throwing',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'scope-2',
    title: 'Function declarations inside blocks',
    difficulty: 'Medium',
    category: 'Scope & Hoisting',
    tags: ['scope', 'functions', 'blocks'],
    question: 'What does `console.log(typeof greet)` print after the `if` block, in modern strict-mode JavaScript?',
    explanation:
      'Historically, function declarations inside blocks had inconsistent behavior across engines. Modern JavaScript (in strict mode / modules) treats a function declared inside a block as block-scoped, similar to `let` — so `greet` does not exist outside the `if` block at all, and `typeof greet` safely returns `"undefined"` rather than throwing.',
    codeExample: `'use strict';

if (true) {
  function greet() {
    return 'hello';
  }
}

console.log(typeof greet);`,
    expectedOutput: `undefined`,
    quiz: {
      options: [
        '"undefined" — the function declaration is scoped to the if block',
        '"function" — function declarations always escape blocks',
        'A ReferenceError is thrown',
        '"hello"',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'this-3',
    title: 'Losing this when detaching a method',
    difficulty: 'Medium',
    category: 'this Keyword',
    tags: ['this', 'methods', 'binding'],
    question: 'Why does `const greet = user.greet; greet();` fail to log the name correctly?',
    explanation:
      '`this` is determined by *how* a function is called, not where it was defined. `user.greet()` works because it is called as a method, with `this` set to `user`. Once you assign `user.greet` to a plain variable and call `greet()` on its own, there is no object before the dot — `this` falls back to `undefined` (in strict mode) or the global object, so `this.name` is no longer `user.name`.',
    codeExample: `const user = {
  name: 'Mia',
  greet() {
    console.log(this.name);
  },
};

user.greet();
const greet = user.greet;
greet();`,
    expectedOutput: `Mia\nTypeError: Cannot read properties of undefined (reading 'name')`,
    quiz: {
      options: [
        '"Mia", then a TypeError — this depends on the call-site, and greet() alone has no object context',
        '"Mia" both times',
        'undefined both times, no error',
        'A SyntaxError on the second call',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'this-4',
    title: '`this` inside a forEach callback within a method',
    difficulty: 'Medium',
    category: 'this Keyword',
    tags: ['this', 'arrow-functions', 'array-methods'],
    question: 'Why does the regular function callback fail to access `this.prefix`, while the arrow function callback succeeds?',
    explanation:
      'A regular `function` passed to `forEach` is invoked by `forEach` itself, with no particular `this` (so it defaults to `undefined` in strict mode) unless you pass a `thisArg` as forEach`s second argument. An arrow function has no `this` of its own — it captures `this` lexically from `logAll`, which is `this.prefix`s owning object, so it correctly resolves.',
    codeExample: `const logger = {
  prefix: '[LOG]',
  logAll(items) {
    items.forEach(function (item) {
      console.log(this?.prefix, item);
    });
    items.forEach((item) => {
      console.log(this.prefix, item);
    });
  },
};

logger.logAll(['a', 'b']);`,
    expectedOutput: `undefined a\nundefined b\n[LOG] a\n[LOG] b`,
    quiz: {
      options: [
        'The regular function callback has no bound `this` from forEach; the arrow function inherits `this` from logAll',
        'Both callbacks correctly access this.prefix',
        'Both callbacks fail with a TypeError',
        'forEach automatically binds `this` to the array being iterated',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'prototype-2',
    title: 'Object.create and prototype linking',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['prototype', 'object-create'],
    question: 'How does `Object.create(proto)` differ from a plain object literal `{}`?',
    explanation:
      '`Object.create(proto)` creates a brand-new object whose internal `[[Prototype]]` is set directly to `proto`, without running any constructor. This lets `child` inherit methods from `parent` through the prototype chain, while still allowing `child` to have its own additional properties — a lower-level, more explicit way to set up prototypal inheritance than using classes or constructor functions.',
    codeExample: `const parent = {
  greet() { return \`Hello, I am \${this.name}\`; },
};

const child = Object.create(parent);
child.name = 'Leo';

console.log(child.greet());
console.log(Object.getPrototypeOf(child) === parent);`,
    expectedOutput: `Hello, I am Leo\ntrue`,
    quiz: {
      options: [
        'Object.create links the new object`s prototype directly to the given object, enabling inheritance without a constructor',
        'Object.create copies all properties from the prototype onto the new object',
        'Object.create is identical to using {}',
        'Object.create throws unless the argument is a class',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'prototype-3',
    title: 'How instanceof actually works',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['prototype', 'instanceof'],
    question: 'What does `dog instanceof Animal` check under the hood?',
    explanation:
      '`instanceof` does not check a value`s "type" in the abstract — it walks the object`s prototype chain and checks whether `Animal.prototype` appears anywhere in it. If you later reassign `Animal.prototype` to a brand-new object, existing instances created before the reassignment still point to the *old* prototype object, so `instanceof` on them will return `false` against the new prototype.',
    codeExample: `function Animal() {}
const dog = new Animal();

console.log(dog instanceof Animal);

Animal.prototype = {};
console.log(dog instanceof Animal);`,
    expectedOutput: `true\nfalse`,
    quiz: {
      options: [
        'instanceof checks whether Animal.prototype is in the object`s prototype chain, so reassigning the prototype changes the result for old instances',
        'instanceof always returns true for objects created with new Animal()',
        'instanceof checks the constructor name as a string',
        'Reassigning Animal.prototype has no effect on instanceof',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'prototype-4',
    title: 'Reading and changing a prototype at runtime',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['prototype', 'getprototypeof', 'setprototypeof'],
    question: 'What does `dog.speak()` log after `Object.setPrototypeOf(dog, cat)` reassigns its prototype?',
    explanation:
      '`Object.getPrototypeOf(obj)` reads an object`s current `[[Prototype]]`, and `Object.setPrototypeOf(obj, newProto)` changes it at runtime, effectively rewiring which object`s methods `obj` inherits. After reassigning `dog`s prototype to `cat`, `dog.speak()` no longer finds a `speak` method through the old `Animal` chain — it now resolves `speak` through `cat` instead, changing its behavior without changing `dog` itself.',
    codeExample: `const animal = { speak() { return 'Generic sound'; } };
const cat = { speak() { return 'Meow'; } };

const dog = Object.create(animal);
console.log(dog.speak());

Object.setPrototypeOf(dog, cat);
console.log(dog.speak());`,
    expectedOutput: `Generic sound\nMeow`,
    quiz: {
      options: [
        'setPrototypeOf rewires which object`s methods dog inherits, changing its behavior at runtime',
        'setPrototypeOf only works on classes, not object literals',
        'Once set, a prototype can never be changed again',
        'dog.speak() throws a TypeError after setPrototypeOf',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'oop-4',
    title: 'Calling parent methods with super',
    difficulty: 'Medium',
    category: 'Prototypes & OOP',
    tags: ['classes', 'super', 'inheritance'],
    question: 'What does `dog.speak()` log, and why is the `super.speak()` call needed?',
    explanation:
      'Inside a subclass, `super.method()` explicitly calls the parent class`s version of that method, even when the subclass overrides it with the same name. Here, `Dog`s `speak` extends the behavior rather than fully replacing it: it first runs `Animal.prototype.speak` via `super.speak()`, then logs its own additional line.',
    codeExample: `class Animal {
  speak() { console.log('Animal makes a sound'); }
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log('Dog barks');
  }
}

new Dog().speak();`,
    expectedOutput: `Animal makes a sound\nDog barks`,
    quiz: {
      options: [
        '"Animal makes a sound" then "Dog barks" — super.speak() explicitly invokes the parent`s method first',
        'Only "Dog barks", since the override replaces the parent method entirely',
        'Only "Animal makes a sound"',
        'A ReferenceError because super is not allowed in overridden methods',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'event-loop-3',
    title: 'Microtask starvation',
    difficulty: 'Hard',
    category: 'Event Loop',
    tags: ['event-loop', 'microtasks', 'performance'],
    question: 'What happens if a promise callback keeps queuing another microtask forever?',
    explanation:
      'The event loop fully drains the microtask queue before moving on to the next macrotask (like a `setTimeout` callback or a repaint). If a microtask keeps scheduling more microtasks endlessly — for example, a `.then()` handler that calls `Promise.resolve().then(...)` again and again — the engine never gets a chance to reach the macrotask queue, starving timers, rendering, and I/O indefinitely. This is a subtle way to freeze an app without ever technically blocking with synchronous code.',
    codeExample: `function loopForever() {
  Promise.resolve().then(loopForever);
}
loopForever();

setTimeout(() => console.log('this may never run'), 0);`,
    expectedOutput: `The setTimeout callback is starved and never runs, because the microtask queue never empties.`,
    quiz: {
      options: [
        'The endless chain of microtasks prevents the event loop from ever reaching the macrotask queue, starving setTimeout',
        'setTimeout always runs before any microtasks, so it is unaffected',
        'The browser automatically cancels infinite microtask loops',
        'Microtasks and macrotasks run in the same queue, so there is no starvation risk',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'event-loop-4',
    title: 'queueMicrotask vs setTimeout(fn, 0)',
    difficulty: 'Medium',
    category: 'Event Loop',
    tags: ['event-loop', 'queuemicrotask', 'settimeout'],
    question: 'In what order do these three logs appear?',
    explanation:
      '`queueMicrotask` schedules a callback on the microtask queue, which is always drained completely before the next macrotask runs — the same queue used by resolved Promise `.then()` callbacks. `setTimeout(fn, 0)` schedules a macrotask, which only runs after all synchronous code *and* all pending microtasks have finished, so it always logs last relative to microtasks scheduled earlier in the same tick.',
    codeExample: `console.log('sync');

setTimeout(() => console.log('timeout'), 0);

queueMicrotask(() => console.log('microtask'));`,
    expectedOutput: `sync\nmicrotask\ntimeout`,
    quiz: {
      options: [
        'sync, microtask, timeout — microtasks always run before the next macrotask',
        'sync, timeout, microtask',
        'microtask, sync, timeout',
        'timeout, microtask, sync',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'promises-3',
    title: 'Promise.race for timeouts',
    difficulty: 'Medium',
    category: 'Promises',
    tags: ['promises', 'promise-race'],
    question: 'What does `Promise.race([slow, fast])` resolve or reject with?',
    explanation:
      '`Promise.race` settles as soon as the *first* input promise settles — whichever fulfills or rejects earliest wins, and every other promise`s outcome is ignored from that point on. This makes it a common building block for implementing timeouts: race a real request against a promise that rejects after N milliseconds.',
    codeExample: `const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 500));
const fast = new Promise((resolve) => setTimeout(() => resolve('fast'), 100));

Promise.race([slow, fast]).then((result) => console.log(result));`,
    expectedOutput: `fast`,
    quiz: {
      options: [
        '"fast" — Promise.race settles with whichever promise finishes first',
        '"slow" — Promise.race always waits for the last promise',
        'An array containing both results',
        'It rejects because two promises were racing',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'promises-4',
    title: 'Promise.any and AggregateError',
    difficulty: 'Hard',
    category: 'Promises',
    tags: ['promises', 'promise-any', 'aggregateerror'],
    question: 'What does `Promise.any([p1, p2])` do if `p1` rejects but `p2` eventually resolves?',
    explanation:
      '`Promise.any` resolves as soon as *any one* of the input promises fulfills, ignoring rejections along the way — it only rejects itself if *every* input promise rejects, in which case it rejects with an `AggregateError` that bundles all the individual errors together. This is effectively the opposite of `Promise.all`, which fails fast on the first rejection.',
    codeExample: `const p1 = Promise.reject('fail 1');
const p2 = new Promise((resolve) => setTimeout(() => resolve('success 2'), 100));

Promise.any([p1, p2]).then((result) => console.log(result));`,
    expectedOutput: `success 2`,
    quiz: {
      options: [
        '"success 2" — Promise.any resolves with the first fulfilled promise, ignoring rejections',
        'It rejects immediately because p1 rejected',
        'An AggregateError, since at least one promise failed',
        'undefined, since promises settled at different times',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'promises-5',
    title: 'Converting a callback API into a Promise',
    difficulty: 'Medium',
    category: 'Promises',
    tags: ['promises', 'callbacks', 'promisify'],
    question: 'How does wrapping `readFileCallback` in a `new Promise(...)` let you use `await` with it?',
    explanation:
      'Many older APIs use the "error-first callback" convention: `fn(args, callback)` where `callback(error, result)` is invoked when done. Wrapping such a function in `new Promise((resolve, reject) => {...})` lets you call `resolve(result)` on success and `reject(error)` on failure inside the callback, turning any callback-based API into a promise you can `await` or chain with `.then()`.',
    codeExample: `function readFileCallback(path, callback) {
  setTimeout(() => callback(null, \`contents of \${path}\`), 100);
}

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    readFileCallback(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromise('notes.txt').then((data) => console.log(data));`,
    expectedOutput: `contents of notes.txt`,
    quiz: {
      options: [
        'Wrapping the callback in a Promise executor and calling resolve/reject inside it converts callback-style code into an awaitable promise',
        'You can only promisify functions that already return a Promise',
        'The callback function must be declared with async for this to work',
        'setTimeout automatically returns a Promise in modern JavaScript',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-9',
    title: 'Array destructuring: skipping and defaults',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['destructuring', 'arrays'],
    question: 'What values do `first`, `third`, and `fourth` end up with?',
    explanation:
      'Array destructuring matches by *position*, not by name. Leaving a slot empty (just a comma) skips that element entirely without binding it to anything. Like object destructuring, a default value (`= 99`) only kicks in when the corresponding array slot is `undefined` — here there is no fourth element at all, so the default applies.',
    codeExample: `const [first, , third, fourth = 99] = ['a', 'b', 'c'];
console.log(first, third, fourth);`,
    expectedOutput: `a c 99`,
    quiz: {
      options: ['a c 99', 'a b 99', 'a c undefined', 'A SyntaxError from the empty slot'],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-10',
    title: 'Computed property names',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['objects', 'computed-properties'],
    question: 'What key does `obj` end up with when built from `{ [key]: "value" }`?',
    explanation:
      'Computed property name syntax `[expression]: value` lets you use the *result* of an expression as an object`s key, rather than a hard-coded identifier. Here `key` evaluates to `"role"`, so the object literal is equivalent to writing `{ role: "value" }` directly — useful whenever the property name is only known at runtime.',
    codeExample: `const key = 'role';
const obj = { [key]: 'admin', [\`\${key}Level\`]: 1 };
console.log(obj);`,
    expectedOutput: `{ role: 'admin', roleLevel: 1 }`,
    quiz: {
      options: [
        "{ role: 'admin', roleLevel: 1 }",
        "{ key: 'admin', 'keyLevel': 1 }",
        "{ '[key]': 'admin' }",
        'A SyntaxError, since keys cannot be computed',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-11',
    title: 'BigInt for numbers beyond MAX_SAFE_INTEGER',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['bigint', 'numbers'],
    question: 'Why does `9007199254740993n` stay precise while the equivalent regular number literal loses precision?',
    explanation:
      'Regular JavaScript numbers can only safely represent integers up to `Number.MAX_SAFE_INTEGER` (2^53 - 1); beyond that, some integers cannot be represented exactly and get silently rounded. `BigInt` (written with a trailing `n`) uses an arbitrary-precision integer representation, so it can hold exact values far beyond that limit — but `BigInt` and regular `Number` values cannot be mixed directly in arithmetic without explicit conversion.',
    codeExample: `console.log(9007199254740993 === 9007199254740992);
console.log(9007199254740993n === 9007199254740992n);
console.log(typeof 10n);`,
    expectedOutput: `true\nfalse\nbigint`,
    quiz: {
      options: [
        'Regular numbers lose precision above MAX_SAFE_INTEGER, but BigInt preserves exact values',
        'Both regular numbers and BigInt lose precision the same way',
        'BigInt is just a string wrapper around the number',
        'typeof 10n is "number"',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-12',
    title: 'Array.prototype.at() for negative indexing',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['array', 'at-method'],
    question: 'How does `arr.at(-1)` compare to `arr[arr.length - 1]`?',
    explanation:
      'The `.at()` method accepts negative indices to count from the end of an array (or string), so `arr.at(-1)` directly returns the last element without manually computing `arr.length - 1`. Unlike bracket notation, `arr[-1]` does *not* work this way — it looks for a literal property named `"-1"`, which does not exist, and returns `undefined`.',
    codeExample: `const arr = [10, 20, 30];
console.log(arr.at(-1));
console.log(arr[-1]);`,
    expectedOutput: `30\nundefined`,
    quiz: {
      options: [
        '30, then undefined — .at() supports negative indices, bracket notation does not',
        '30, then 30 — both support negative indices',
        'undefined, then 30',
        'A RangeError from the negative index',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-13',
    title: 'Optional catch binding',
    difficulty: 'Easy',
    category: 'ES6+',
    tags: ['try-catch', 'error-handling'],
    question: 'Why is this `try/catch` valid even though `catch` has no parameter?',
    explanation:
      'Since ES2019, the `catch` clause`s error parameter is optional — you can write `catch { ... }` when you want to handle an error without needing access to the error object itself, which is common when you just want to fall back to a default value regardless of what went wrong.',
    codeExample: `function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

console.log(safeParse('{"a":1}'));
console.log(safeParse('not json'));`,
    expectedOutput: `{ a: 1 }\nnull`,
    quiz: {
      options: [
        'The catch parameter is optional in modern JavaScript when the error object is not needed',
        'This is a SyntaxError; catch always requires a parameter',
        'catch without a parameter always receives undefined as an implicit variable named error',
        'It only works in TypeScript, not plain JavaScript',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-14',
    title: 'Logical assignment operators (??=, ||=, &&=)',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['operators', 'logical-assignment'],
    question: 'What do `config.timeout ??= 3000` and `config.debug ||= true` do?',
    explanation:
      '`a ??= b` only assigns `b` to `a` if `a` is currently `null` or `undefined` — it is shorthand for `a = a ?? b`. `a ||= b` assigns whenever `a` is falsy (so `0`, `""`, and `false` also trigger it) — shorthand for `a = a || b`. Here `timeout` is `undefined`, so it gets `3000`; `debug` is already `false` (a real, intentional value), but `||=` still overwrites it because `false` is falsy — a subtle gotcha compared to `??=`.',
    codeExample: `const config = { debug: false };

config.timeout ??= 3000;
config.debug ||= true;

console.log(config);`,
    expectedOutput: `{ debug: true, timeout: 3000 }`,
    quiz: {
      options: [
        '{ debug: true, timeout: 3000 } — ||= overwrites any falsy value, ??= only fills in null/undefined',
        '{ debug: false, timeout: 3000 } — ||= only overwrites undefined, like ??=',
        '{ debug: false, timeout: undefined }',
        'A TypeError, since config.timeout does not already exist',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'es6-15',
    title: 'Generating a range with Array.from',
    difficulty: 'Medium',
    category: 'ES6+',
    tags: ['array-from', 'iterables'],
    question: 'How does `Array.from({ length: 5 }, (_, i) => i * 2)` produce `[0, 2, 4, 6, 8]`?',
    explanation:
      '`Array.from` accepts an array-like or iterable as its first argument, and an optional mapping function as its second. `{ length: 5 }` is not iterable, but it *is* array-like (it just needs a `length`), so `Array.from` treats it as 5 empty slots, then runs the map function `(value, index) => ...` over each index to fill them in — a concise way to generate ranges without a manual loop.',
    codeExample: `const doubles = Array.from({ length: 5 }, (_, i) => i * 2);
console.log(doubles);`,
    expectedOutput: `[0, 2, 4, 6, 8]`,
    quiz: {
      options: [
        'Array.from treats { length: 5 } as 5 array-like slots and fills each using the mapping function`s index',
        'It throws a TypeError because {} is not an array',
        '[undefined, undefined, undefined, undefined, undefined]',
        'It only works with real arrays, not array-like objects',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-15',
    title: 'reduceRight for right-to-left folding',
    difficulty: 'Medium',
    category: 'Array Methods',
    tags: ['array', 'reduceright'],
    question: 'What does `["a", "b", "c"].reduceRight((acc, val) => acc + val)` produce?',
    explanation:
      '`reduceRight` works exactly like `reduce`, but processes the array from the *last* element to the first. Without an initial value, it starts with the last element as the accumulator and then folds in each preceding element, so the concatenation happens in reverse order compared to a normal `reduce`.',
    codeExample: `const result = ['a', 'b', 'c'].reduceRight((acc, val) => acc + val);
console.log(result);`,
    expectedOutput: `cba`,
    quiz: {
      options: ['"cba"', '"abc"', '"c"', 'undefined'],
      correctIndex: 0,
    },
  },
  {
    id: 'array-16',
    title: 'Array.of vs the Array constructor',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'array-of'],
    question: 'Why does `new Array(7)` behave differently from `Array.of(7)`?',
    explanation:
      'The `Array` constructor has a quirky single-argument overload: `new Array(7)` creates a sparse array with `length` 7 and no actual elements, treating `7` as a *size*. `Array.of(7)`, added specifically to avoid this ambiguity, always creates an array containing its arguments as elements — so `Array.of(7)` is `[7]`, a single-element array, regardless of the argument`s type or count.',
    codeExample: `console.log(new Array(7).length);
console.log(Array.of(7));`,
    expectedOutput: `7\n[7]`,
    quiz: {
      options: [
        '7, then [7] — new Array(n) with one number argument creates n empty slots; Array.of always wraps its arguments',
        '[7], then [7]',
        '7, then 7',
        'Both throw a RangeError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-17',
    title: 'copyWithin: shifting elements in place',
    difficulty: 'Hard',
    category: 'Array Methods',
    tags: ['array', 'copywithin', 'mutation'],
    question: 'What does `[1, 2, 3, 4, 5].copyWithin(0, 3)` produce?',
    explanation:
      '`copyWithin(target, start, end)` copies a slice of the array to another position *within the same array*, mutating it in place and keeping the original length. `copyWithin(0, 3)` copies everything from index 3 to the end (`[4, 5]`) and pastes it starting at index 0, overwriting whatever was there, while leaving the remaining tail elements (`3, 4, 5`) untouched at their original positions.',
    codeExample: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);
console.log(arr);`,
    expectedOutput: `[4, 5, 3, 4, 5]`,
    quiz: {
      options: [
        '[4, 5, 3, 4, 5] — elements from index 3 onward are copied to the start, overwriting in place',
        '[1, 2, 3, 4, 5] unchanged',
        '[3, 4, 5, 4, 5]',
        'A RangeError because the array would grow',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'array-18',
    title: 'Swapping variables with array destructuring',
    difficulty: 'Easy',
    category: 'Array Methods',
    tags: ['array', 'destructuring', 'swap'],
    question: 'How does `[a, b] = [b, a]` swap two variables without a temporary variable?',
    explanation:
      'The right-hand side `[b, a]` builds a brand-new array capturing the *current* values of `b` and `a` before any assignment happens. Destructuring then assigns that array`s first element to `a` and second element to `b` — effectively swapping them in one expression, with no manual temp variable needed.',
    codeExample: `let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);`,
    expectedOutput: `2 1`,
    quiz: {
      options: ['2 1', '1 2', '2 2', 'undefined undefined'],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-7',
    title: 'Why does [] == false return true?',
    difficulty: 'Hard',
    category: 'Type Coercion',
    tags: ['coercion', 'arrays', 'equality'],
    question: 'Walk through why `[] == false` evaluates to `true`.',
    explanation:
      'With `==`, JavaScript first converts the boolean `false` to the number `0`. Then, comparing an object (`[]`) with a number triggers `ToPrimitive` on the array, which calls `[].toString()`, producing `""`. Finally, `"" == 0` coerces the empty string to a number (`0`), leaving `0 == 0`, which is `true`. Each step is individually reasonable, but the chain of coercions is exactly why `==` is considered error-prone compared to `===`.',
    codeExample: `console.log([] == false);
console.log([] == 0);
console.log('' == 0);`,
    expectedOutput: `true\ntrue\ntrue`,
    quiz: {
      options: [
        'true — [] coerces to "" then to 0, and false coerces to 0, so both sides become equal',
        'false — arrays are never equal to booleans',
        'true only for [] == 0, not [] == false',
        'It throws a TypeError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'coercion-8',
    title: 'Boolean(value) vs !!value',
    difficulty: 'Easy',
    category: 'Type Coercion',
    tags: ['coercion', 'boolean'],
    question: 'Do `Boolean(value)` and `!!value` ever produce different results?',
    explanation:
      'No — both are standard ways to force a value to its boolean equivalent using the same underlying ToBoolean coercion rules. `!value` first negates and converts to boolean, and the second `!` negates it back, landing on the "true" boolean representation; `Boolean(value)` calls the same coercion directly. They are functionally identical, just different styles.',
    codeExample: `console.log(Boolean(0), !!0);
console.log(Boolean('hello'), !!'hello');
console.log(Boolean(null), !!null);`,
    expectedOutput: `false false\ntrue true\nfalse false`,
    quiz: {
      options: [
        'They always produce the same result — both use the same ToBoolean coercion',
        '!!value is stricter and rejects falsy strings',
        'Boolean(value) throws for null',
        '!!value converts to a string first',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-7',
    title: 'Function.length counts declared parameters',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['functions', 'function-length'],
    question: 'Why is `fn.length` for `function fn(a, b, c = 1, ...rest) {}` equal to `2`, not `4`?',
    explanation:
      'A function`s `.length` property reports the number of parameters declared *before* the first default value or rest parameter — it is meant to reflect how many arguments the function strictly expects without defaults. Parameters with default values, and any rest parameter, are excluded from the count entirely, even though they are still valid parameters you can pass arguments to.',
    codeExample: `function fn(a, b, c = 1, ...rest) {}
console.log(fn.length);`,
    expectedOutput: `2`,
    quiz: {
      options: [
        '2 — only parameters before the first default or rest parameter are counted',
        '4 — all declared parameters are counted',
        '3 — rest parameters count but defaults do not',
        '0 — .length always refers to the function body size',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-8',
    title: 'Recursion depth and stack overflow',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['recursion', 'call-stack'],
    question: 'Why does calling `countDown(100000)` eventually throw a `RangeError`?',
    explanation:
      'Every recursive call adds a new frame to the call stack, and each frame consumes memory that is only freed when that call returns. JavaScript engines impose a maximum call stack size; recursing tens of thousands of levels deep without returning exhausts it, throwing `"RangeError: Maximum call stack size exceeded"`. Since standard JavaScript does not guarantee tail-call optimization in practice, deep recursion like this is usually rewritten as an iterative loop to avoid the limit entirely.',
    codeExample: `function countDown(n) {
  if (n <= 0) return 'done';
  return countDown(n - 1);
}

countDown(100000);
// RangeError: Maximum call stack size exceeded`,
    expectedOutput: `RangeError: Maximum call stack size exceeded`,
    quiz: {
      options: [
        'Each recursive call adds a stack frame, and deep enough recursion exceeds the engine`s call stack limit',
        'JavaScript automatically optimizes all recursive calls into loops',
        'It logs "done" successfully every time',
        'Recursion has no depth limit in JavaScript',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'functions-9',
    title: 'Named function expressions can reference themselves',
    difficulty: 'Medium',
    category: 'Functions',
    tags: ['functions', 'recursion', 'function-expressions'],
    question: 'Why does `factorial(5)` still work correctly, relying on the internal name `fact` for recursion?',
    explanation:
      'Giving a function expression its own internal name (`function fact(n) {...}`, assigned to `const factorial`) creates a special binding for that name that is only visible *inside* the function body, separate from the outer `factorial` variable. Recursive calls inside the function always use that internal, stable binding, so even if the outer `factorial` variable were later reassigned, in-progress recursive calls keep working correctly via the internal name.',
    codeExample: `const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};

console.log(factorial(5));`,
    expectedOutput: `120`,
    quiz: {
      options: [
        'The internal name `fact` is a separate, stable binding used for recursion inside the function body',
        'It fails once factorial is reassigned',
        'Named function expressions cannot be recursive',
        'It logs undefined',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-10',
    title: 'Getters and setters on an object literal',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['objects', 'getters', 'setters'],
    question: 'What is logged when reading and writing `person.fullName`?',
    explanation:
      'A `get` accessor runs custom logic whenever the property is *read*, and a `set` accessor runs whenever it is *assigned* — from the outside, `fullName` looks like a normal property, but behind the scenes it derives its value from `first`/`last`, and assigning to it updates those underlying fields instead of storing `fullName` directly.',
    codeExample: `const person = {
  first: 'Ada',
  last: 'Lovelace',
  get fullName() {
    return \`\${this.first} \${this.last}\`;
  },
  set fullName(value) {
    [this.first, this.last] = value.split(' ');
  },
};

console.log(person.fullName);
person.fullName = 'Grace Hopper';
console.log(person.first, person.last);`,
    expectedOutput: `Ada Lovelace\nGrace Hopper`,
    quiz: {
      options: [
        '"Ada Lovelace", then "Grace Hopper" — the getter derives fullName, the setter splits it back into first/last',
        '"Ada Lovelace" both times, since setters do not affect other properties',
        'A TypeError, since fullName is read-only',
        '"undefined undefined" for the getter',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-11',
    title: 'Dot notation vs bracket notation for property access',
    difficulty: 'Easy',
    category: 'Objects',
    tags: ['objects', 'bracket-notation'],
    question: 'Why must you use bracket notation to read `user["first-name"]` but not `user.age`?',
    explanation:
      'Dot notation requires the property name to be a valid JavaScript identifier (no hyphens, spaces, or leading digits) known at write-time. Bracket notation accepts *any* string (or a variable holding a string), including ones with special characters or ones computed dynamically at runtime — which is why it is required here, since `"first-name"` contains a hyphen that dot notation cannot parse as part of a property name.',
    codeExample: `const user = { age: 30, 'first-name': 'Kim' };
console.log(user.age);
console.log(user['first-name']);`,
    expectedOutput: `30\nKim`,
    quiz: {
      options: [
        'Bracket notation accepts any string key, including ones invalid as identifiers; dot notation requires a valid identifier',
        'Dot notation and bracket notation are always fully interchangeable',
        'Bracket notation only works with numeric keys',
        'user["first-name"] throws a SyntaxError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-12',
    title: 'Object property and method shorthand',
    difficulty: 'Easy',
    category: 'Objects',
    tags: ['objects', 'shorthand', 'es6'],
    question: 'What object does `{ name, greet() { return name; } }` create when `name` is a variable in scope?',
    explanation:
      'ES6 shorthand syntax lets you write `{ name }` instead of `{ name: name }` when a variable`s name matches the desired key, and lets you write `greet() {}` instead of `greet: function () {}` for methods. Both are purely syntactic sugar — the resulting object is identical to one written the long way.',
    codeExample: `const name = 'Priya';
const age = 28;

const person = {
  name,
  age,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  },
};

console.log(person.greet());`,
    expectedOutput: `Hi, I'm Priya`,
    quiz: {
      options: [
        "\"Hi, I'm Priya\" — shorthand properties and methods are just concise syntax for the same object",
        'A SyntaxError because name has no explicit key',
        "\"Hi, I'm undefined\"",
        'The shorthand method cannot access `this`',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'objects-13',
    title: '`in` operator vs hasOwnProperty',
    difficulty: 'Medium',
    category: 'Objects',
    tags: ['objects', 'in-operator', 'hasownproperty'],
    question: 'Why does `"toString" in obj` return `true` while `obj.hasOwnProperty("toString")` returns `false`?',
    explanation:
      'The `in` operator checks the *entire* prototype chain for a property, including inherited ones — every plain object inherits `toString` from `Object.prototype`, so `in` finds it there. `hasOwnProperty` only checks properties defined directly *on* the object itself, ignoring anything inherited, so it correctly reports that `obj` does not declare its own `toString`.',
    codeExample: `const obj = { name: 'Test' };
console.log('name' in obj, obj.hasOwnProperty('name'));
console.log('toString' in obj, obj.hasOwnProperty('toString'));`,
    expectedOutput: `true true\ntrue false`,
    quiz: {
      options: [
        '`in` checks the whole prototype chain; hasOwnProperty only checks the object`s own properties',
        'They always return the same result',
        'hasOwnProperty checks the prototype chain, in does not',
        '`in` only works with arrays',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-5',
    title: 'stopPropagation vs stopImmediatePropagation',
    difficulty: 'Medium',
    category: 'DOM & Events',
    tags: ['dom', 'events', 'propagation'],
    question: 'If a button has two click listeners, what does `event.stopImmediatePropagation()` do that `event.stopPropagation()` does not?',
    explanation:
      '`stopPropagation()` prevents the event from bubbling up to ancestor elements, but *other listeners on the same element* still run normally. `stopImmediatePropagation()` does everything `stopPropagation()` does, *plus* it prevents any other listeners registered on that same element from running at all — useful when one handler needs to fully "claim" the event.',
    codeExample: `button.addEventListener('click', (e) => {
  console.log('first listener');
  e.stopImmediatePropagation();
});

button.addEventListener('click', () => {
  console.log('second listener'); // never runs
});`,
    expectedOutput: `first listener`,
    quiz: {
      options: [
        'stopImmediatePropagation also blocks other listeners on the same element, not just bubbling to ancestors',
        'They behave identically',
        'stopPropagation blocks other listeners on the same element too',
        'stopImmediatePropagation only works on the capture phase',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-6',
    title: 'The once and passive event listener options',
    difficulty: 'Medium',
    category: 'DOM & Events',
    tags: ['dom', 'events', 'addeventlistener'],
    question: 'What do the `{ once: true }` and `{ passive: true }` options do when added to `addEventListener`?',
    explanation:
      '`{ once: true }` automatically removes the listener after it fires a single time, saving you from manually calling `removeEventListener`. `{ passive: true }` is a performance hint telling the browser the listener will never call `preventDefault()`, which lets the browser start scrolling immediately instead of waiting to see if the handler blocks it — commonly used on `touchstart`/`wheel`/`scroll` listeners to keep scrolling smooth.',
    codeExample: `button.addEventListener(
  'click',
  () => console.log('clicked once'),
  { once: true }
);

window.addEventListener('scroll', () => {}, { passive: true });`,
    expectedOutput: `"clicked once" logs on the first click only; further clicks trigger nothing.`,
    quiz: {
      options: [
        'once removes the listener after it fires once; passive tells the browser the handler will not call preventDefault, improving scroll performance',
        'once and passive both permanently disable the listener immediately',
        'passive makes the listener run before the event even happens',
        'once and passive have no effect outside of React apps',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'events-7',
    title: 'Dispatching custom events',
    difficulty: 'Medium',
    category: 'DOM & Events',
    tags: ['dom', 'custom-events'],
    question: 'How does `new CustomEvent("cart:add", { detail: { id: 42 } })` let unrelated parts of an app communicate?',
    explanation:
      '`CustomEvent` lets you create and dispatch your own named events, carrying arbitrary data in the `detail` property, just like built-in events such as `click`. Any element can `dispatchEvent` a custom event, and any other code that added a listener for that event name (even on a different, unrelated component) will receive it — a lightweight way to decouple parts of an app without a shared state library.',
    codeExample: `document.addEventListener('cart:add', (e) => {
  console.log('Added item with id', e.detail.id);
});

const event = new CustomEvent('cart:add', { detail: { id: 42 } });
document.dispatchEvent(event);`,
    expectedOutput: `Added item with id 42`,
    quiz: {
      options: [
        'CustomEvent lets unrelated code communicate via named events carrying custom data in `detail`',
        'CustomEvent can only be used with click and keyboard events',
        'The detail property is always ignored by listeners',
        'dispatchEvent only works on the window object',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'error-3',
    title: 'Chaining errors with the cause option',
    difficulty: 'Medium',
    category: 'Error Handling',
    tags: ['errors', 'error-cause', 'debugging'],
    question: 'What does `err.cause` give you access to when catching the outer error?',
    explanation:
      'The `{ cause }` option (added to the `Error` constructor) lets you attach the original, lower-level error to a new, higher-level error without losing information — useful when you catch a low-level failure and want to re-throw a more meaningful, application-specific error while preserving the original stack trace and message for debugging.',
    codeExample: `function loadConfig() {
  try {
    throw new Error('ENOENT: file not found');
  } catch (fileErr) {
    throw new Error('Failed to load configuration', { cause: fileErr });
  }
}

try {
  loadConfig();
} catch (err) {
  console.log(err.message);
  console.log(err.cause.message);
}`,
    expectedOutput: `Failed to load configuration\nENOENT: file not found`,
    quiz: {
      options: [
        'err.cause exposes the original underlying error, preserving the full chain of failure',
        'err.cause is always undefined unless manually assigned after throwing',
        'The cause option silently swallows the original error',
        'err.cause only works with custom Error subclasses',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'error-4',
    title: 'Catching errors that escape try/catch',
    difficulty: 'Medium',
    category: 'Error Handling',
    tags: ['errors', 'global-error-handling', 'unhandledrejection'],
    question: 'How can you detect errors and rejected promises that were never caught anywhere in your code?',
    explanation:
      'The browser fires a global `error` event on `window` whenever an uncaught synchronous exception propagates all the way up, and a separate `unhandledrejection` event whenever a promise rejects with no `.catch()` handling it. Listening for both is a common last line of defense for logging/reporting unexpected failures in production, even though it is always better to handle errors closer to where they occur.',
    codeExample: `window.addEventListener('error', (event) => {
  console.log('Uncaught error:', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.log('Unhandled rejection:', event.reason);
});

Promise.reject(new Error('oops'));`,
    expectedOutput: `Unhandled rejection: Error: oops`,
    quiz: {
      options: [
        'The window "error" event catches uncaught exceptions; "unhandledrejection" catches promises rejected with no catch handler',
        'try/catch automatically forwards every error to these global events',
        'These events only fire in Node.js, never in browsers',
        'unhandledrejection fires for every promise, even ones that are handled',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'numbers-4',
    title: 'Number.MAX_SAFE_INTEGER',
    difficulty: 'Medium',
    category: 'Numbers',
    tags: ['numbers', 'precision', 'max-safe-integer'],
    question: 'What happens when you add 1 to `Number.MAX_SAFE_INTEGER` twice?',
    explanation:
      '`Number.MAX_SAFE_INTEGER` (2^53 - 1) is the largest integer JavaScript numbers can represent where every integer up to it is exactly representable and comparisons behave as expected. Beyond that point, the floating-point format cannot represent every integer exactly, so consecutive integers can collapse onto the same representable value — here, adding `1` twice in a row produces the *same* result both times.',
    codeExample: `console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER + 1);
console.log(Number.MAX_SAFE_INTEGER + 2);
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);`,
    expectedOutput: `9007199254740991\n9007199254740992\n9007199254740992\ntrue`,
    quiz: {
      options: [
        'Beyond MAX_SAFE_INTEGER, some distinct integers collapse to the same floating-point value',
        'JavaScript automatically switches to BigInt when exceeding MAX_SAFE_INTEGER',
        'It throws a RangeError',
        'Every integer remains uniquely representable no matter how large',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'numbers-5',
    title: 'toFixed rounding surprises',
    difficulty: 'Medium',
    category: 'Numbers',
    tags: ['numbers', 'tofixed', 'rounding'],
    question: 'Why does `(1.005).toFixed(2)` produce `"1.00"` instead of the expected `"1.01"`?',
    explanation:
      'Because of binary floating-point representation, the literal `1.005` is not stored exactly as `1.005` — it is actually stored as a value very slightly *less* than `1.005`. `toFixed` rounds based on the number`s true stored value, not the decimal text you typed, so it rounds down to `"1.00"`. This is the same root cause as the classic `0.1 + 0.2` surprise.',
    codeExample: `console.log((1.005).toFixed(2));
console.log((1.5).toFixed(0));
console.log((2.5).toFixed(0));`,
    expectedOutput: `1.00\n2\n3`,
    quiz: {
      options: [
        '"1.00" — because 1.005 is actually stored as a value slightly less than 1.005 in binary floating-point',
        '"1.01" — toFixed always rounds half up correctly',
        'A TypeError, since 1.005 has three decimal digits',
        '"1.00" because toFixed always rounds down',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'storage-3',
    title: 'IndexedDB vs localStorage',
    difficulty: 'Medium',
    category: 'Browser & Storage',
    tags: ['indexeddb', 'localstorage', 'storage'],
    question: 'Why would an app choose IndexedDB over localStorage for offline data?',
    explanation:
      '`localStorage` is synchronous, string-only, and limited to roughly 5-10MB — fine for small settings, but it can block the main thread and cannot store complex structured data directly. `IndexedDB` is an asynchronous, transactional, object-oriented database built into the browser: it can store much larger amounts of structured data (including blobs and files), supports indexes for efficient querying, and never blocks the main thread, making it the right choice for offline-capable apps with real datasets.',
    codeExample: `// localStorage: simple, synchronous, string-only
localStorage.setItem('settings', JSON.stringify({ theme: 'dark' }));

// IndexedDB: asynchronous, structured, much higher storage limits
const request = indexedDB.open('MyAppDB', 1);
request.onsuccess = () => console.log('IndexedDB ready');`,
    expectedOutput: `localStorage suits small synchronous key-value data; IndexedDB suits large, structured, asynchronous storage.`,
    quiz: {
      options: [
        'IndexedDB is asynchronous and handles much larger, structured data; localStorage is simpler but limited and synchronous',
        'localStorage and IndexedDB have identical storage limits and APIs',
        'IndexedDB can only store strings, just like localStorage',
        'localStorage is asynchronous while IndexedDB is synchronous',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'network-1',
    title: 'fetch does not reject on HTTP error status codes',
    difficulty: 'Medium',
    category: 'Networking',
    tags: ['fetch', 'http', 'error-handling'],
    question: 'Why does the `.catch()` block still run here, even though the server responds successfully with a 404?',
    explanation:
      'The `fetch` promise only rejects on *network-level* failures — like a DNS error, no connectivity, or a CORS block — not on HTTP error status codes such as 404 or 500. A 404 response is still a "successful" fetch from the browser`s perspective; you must manually check `response.ok` (or `response.status`) and throw yourself if you want failed HTTP responses to be treated as errors.',
    codeExample: `fetch('/api/does-not-exist')
  .then((response) => {
    console.log(response.status, response.ok);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
  })
  .catch((err) => console.log('caught:', err.message));`,
    expectedOutput: `404 false\ncaught: HTTP 404`,
    quiz: {
      options: [
        'fetch only rejects on network failures, not HTTP error statuses — you must check response.ok yourself',
        'fetch automatically rejects on any status code outside 200-299',
        'response.ok is always true regardless of status',
        'A 404 response causes fetch to throw a SyntaxError',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'network-2',
    title: 'Cancelling a fetch request with AbortController',
    difficulty: 'Hard',
    category: 'Networking',
    tags: ['fetch', 'abortcontroller', 'cancellation'],
    question: 'What happens to the `fetch` call when `controller.abort()` is called before the request finishes?',
    explanation:
      'An `AbortController` exposes a `signal` you can pass as `fetch`s `signal` option. Calling `controller.abort()` immediately cancels the in-flight request and causes the `fetch` promise to reject with an `AbortError` — commonly used to cancel a stale request, for example when a user types a new search query before the previous one finishes.',
    codeExample: `const controller = new AbortController();

fetch('/api/search?q=slow', { signal: controller.signal })
  .then((res) => res.json())
  .catch((err) => console.log('Request cancelled:', err.name));

controller.abort();`,
    expectedOutput: `Request cancelled: AbortError`,
    quiz: {
      options: [
        'The fetch promise rejects with an AbortError once abort() is called',
        'abort() has no effect once fetch has been called',
        'The request completes normally but the response body is emptied',
        'abort() can only be called before fetch(), not after',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'network-3',
    title: 'Fetching and parsing JSON with async/await',
    difficulty: 'Easy',
    category: 'Networking',
    tags: ['fetch', 'async-await', 'json'],
    question: 'Why are there two separate `await` calls needed to get usable data out of `fetch`?',
    explanation:
      '`fetch` resolves as soon as the response *headers* arrive, giving you a `Response` object — the body itself may still be streaming in. Calling `response.json()` returns a *second* promise that resolves once the body has been fully read and parsed as JSON, which is why both steps typically need their own `await` (or `.then()`) before you have the actual data to use.',
    codeExample: `async function getUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user;
}`,
    expectedOutput: `Resolves to the parsed JSON body once both the response and its body have loaded.`,
    quiz: {
      options: [
        'fetch resolves once headers arrive; .json() is a separate async step that reads and parses the body',
        'fetch already returns parsed JSON directly',
        'response.json() is synchronous and does not need await',
        'Both awaits are redundant and only one is ever needed',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'algo-2',
    title: 'Recursive factorial',
    difficulty: 'Easy',
    category: 'Algorithms',
    tags: ['algorithms', 'recursion'],
    question: 'What does `factorial(4)` return, and what stops the recursion from running forever?',
    explanation:
      'The `n <= 1` check is the base case — without it, the function would call itself indefinitely and eventually overflow the call stack. Each recursive call multiplies `n` by the factorial of everything below it, unwinding as `4 * (3 * (2 * (1)))` once the base case is hit, giving `24`.',
    codeExample: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(4));`,
    expectedOutput: `24`,
    quiz: {
      options: ['24', '10', '4', 'Infinity, since there is no base case'],
      correctIndex: 0,
    },
  },
  {
    id: 'algo-3',
    title: 'Checking for a palindrome with two pointers',
    difficulty: 'Medium',
    category: 'Algorithms',
    tags: ['algorithms', 'two-pointers', 'strings'],
    question: 'How does the two-pointer approach check if "level" is a palindrome without reversing the string?',
    explanation:
      'Instead of building a reversed copy of the string, the two-pointer technique compares characters from both ends moving inward simultaneously — one pointer starts at index `0`, the other at `length - 1`. If any pair of compared characters ever differs, it is not a palindrome; if the pointers cross without a mismatch, the string reads the same forwards and backwards.',
    codeExample: `function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome('level'));
console.log(isPalindrome('hello'));`,
    expectedOutput: `true\nfalse`,
    quiz: {
      options: [
        'true, then false — two pointers compare characters from both ends inward until they meet or mismatch',
        'false, then true',
        'true, then true',
        'It always returns true regardless of input',
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'algo-4',
    title: 'Checking if two strings are anagrams',
    difficulty: 'Medium',
    category: 'Algorithms',
    tags: ['algorithms', 'strings', 'hashmap'],
    question: 'How does counting character frequencies determine whether "listen" and "silent" are anagrams?',
    explanation:
      'Two strings are anagrams if they contain exactly the same characters with exactly the same frequencies, just rearranged. Building a frequency count of each character in the first string, then decrementing for each character seen in the second string, lets you verify a match in linear time — if every count returns to zero and the lengths matched up front, the strings are anagrams.',
    codeExample: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const counts = {};
  for (const char of a) counts[char] = (counts[char] || 0) + 1;
  for (const char of b) {
    if (!counts[char]) return false;
    counts[char]--;
  }
  return true;
}

console.log(isAnagram('listen', 'silent'));
console.log(isAnagram('hello', 'world'));`,
    expectedOutput: `true\nfalse`,
    quiz: {
      options: [
        'true, then false — matching character frequency counts confirm an anagram',
        'false, then true',
        'It only works if the strings are already sorted',
        'true for both, since both have the same length',
      ],
      correctIndex: 0,
    },
  },
]

export const categories = Array.from(new Set(questions.map((q) => q.category))).sort()
