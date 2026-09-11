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
]

export const categories = Array.from(new Set(questions.map((q) => q.category))).sort()
