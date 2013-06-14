# Rocambole Visualize

[Rocambole](https://github.com/millermedeiros/rocambole) recursively walks and adds extra information / helpers to [Esprima / Mozilla SpiderMonkey Parser API](http://esprima.org/doc/index.html#ast) compatible AST.

This module, rocambole visualize, is a web interface to display the generated tree in the browser, this is mostly needed for understanding the structure of the syntax tree.

Rocambole adds extra properties to each node, such as `parent`, `next` and `prev` that make serialization or logging to the console hard.

This tool handles circular references nicely to avoid infinite loops.

## How to use

The easiest way it to use the github hosted version

http://piuccio.github.io/rocambole-visualize/

### Locally

If you want to run it locally on your machine you can clone the repository and start the web server on port `8080` by doing:

````
git clone https://github.com/piuccio/rocambole-visualize.git
npm install
npm start
````

# License

MIT
