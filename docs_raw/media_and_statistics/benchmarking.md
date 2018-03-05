## Benchmarking

---
### Docs

---

**The following document is the output of running the *test -> benchmark.js* unit test. It uses Bracket print, JSON.stringify and [serialize-javascript](https://www.npmjs.com/package/serialize-javascript) modules.**

## Performing benchmarks which do not have a failing condition
## With the style option set to true
### Using a large random assigned object

Bracket print: 125.026ms
Bracket print: 104.044ms
Bracket print: 77.880ms
Bracket print: 65.827ms
Bracket print: 66.925ms

-----------------------------

JSON.stringify: 6.126ms
JSON.stringify: 5.630ms
JSON.stringify: 10.881ms
JSON.stringify: 2.463ms
JSON.stringify: 2.269ms

-----------------------------

Yahoo stringify: 8.673ms
Yahoo stringify: 11.784ms
Yahoo stringify: 4.285ms
Yahoo stringify: 5.406ms
Yahoo stringify: 5.243ms

### Using a small random assigned object

Bracket print: 0.160ms
Bracket print: 0.093ms
Bracket print: 0.084ms
Bracket print: 0.067ms
Bracket print: 0.082ms

-----------------------------

Yahoo stringify: 0.081ms
Yahoo stringify: 0.027ms
Yahoo stringify: 0.011ms
Yahoo stringify: 0.013ms
Yahoo stringify: 0.016ms

-----------------------------

JSON.stringify: 0.011ms
JSON.stringify: 0.010ms
JSON.stringify: 0.009ms
JSON.stringify: 0.007ms
JSON.stringify: 0.006ms


### When parsing the nodejs path module

Bracket print: 20.235ms
Bracket print: 13.946ms
Bracket print: 13.934ms
Bracket print: 14.210ms
Bracket print: 11.874ms

-----------------------------

Yahoo stringify: unable to do this

-----------------------------

JSON.stringify: unable to do this

## With the style option set to false
### Using a large random assigned object

Bracket print: 51.808ms
Bracket print: 25.228ms
Bracket print: 35.969ms
Bracket print: 33.154ms
Bracket print: 33.085ms

-----------------------------

JSON.stringify: 2.637ms
JSON.stringify: 3.941ms
JSON.stringify: 6.260ms
JSON.stringify: 2.468ms
JSON.stringify: 2.582ms

-----------------------------

Yahoo stringify: 10.873ms
Yahoo stringify: 4.629ms
Yahoo stringify: 10.596ms
Yahoo stringify: 3.863ms
Yahoo stringify: 7.172ms

### Using a small random assigned object

Bracket print: 0.086ms
Bracket print: 0.063ms
Bracket print: 0.061ms
Bracket print: 0.055ms
Bracket print: 0.064ms

-----------------------------

Yahoo stringify: 0.023ms
Yahoo stringify: 0.014ms
Yahoo stringify: 0.014ms
Yahoo stringify: 0.026ms
Yahoo stringify: 0.015ms

-----------------------------

JSON.stringify: 0.009ms
JSON.stringify: 0.006ms
JSON.stringify: 0.006ms
JSON.stringify: 0.006ms
JSON.stringify: 0.005ms

### When parsing the nodejs path module

Bracket print: 8.673ms
Bracket print: 10.199ms
Bracket print: 7.042ms
Bracket print: 13.189ms
Bracket print: 9.997ms

-----------------------------

Yahoo stringify: unable to do this

-----------------------------

JSON.stringify: unable to do this

