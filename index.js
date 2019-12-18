const Benchmark = require('benchmark');
const Suite = new Benchmark.Suite;

const _ = require('lodash');
const moment = require('moment');
const $ = require('jquery');

function Foo() {};
Foo.prototype = { _, moment, $ };

const foo = new Foo();

Suite.add('Object.getPrototypeOf', () => {
  const prototype = Object.getPrototypeOf(foo);
}).add('Reflect.getPrototypeOf', () => {
  const prototype = Reflect.getPrototypeOf(foo);
}).add('__proto__', () => {
  const prototype = foo.__proto__;
}).add('for in', () => {
  const prototype = {};
  for (const i in foo) {
    prototype[i] = foo[i];
  };
}).on('cycle', function(event) {
  console.info(String(event.target));
}).run();