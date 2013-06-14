# Rocambole Visualize

[Rocambole](https://github.com/millermedeiros/rocambole) recursively walks and adds extra information / helpers to [Esprima / Mozilla SpiderMonkey Parser API](http://esprima.org/doc/index.html#ast) compatible AST.

This module, rocambole visualize, is a web interface to display the generated tree in the browser, this is mostly needed for understanding the structure of the syntax tree.

Rocambole adds extra properties to each node, such as `parent`, `next` and `prev` that make serialization or logging to the console hard.

This tool handles circular references nicely to avoid infinite loops.

## How to use

Clone the repository and start the web server on port `8080`.

````
git clone https://github.com/piuccio/rocambole-visualize.git
npm install
npm start
````

# License

MIT
