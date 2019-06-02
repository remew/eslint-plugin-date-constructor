'use strict';

function generateErrorMessage(value) {
  return `'${value}' is not a valid ISO 8601 string`;
}

module.exports = {
  create: context => {
    return {
      NewExpression: node => {
        if (node.callee.type !== 'Identifier') {
          return;
        }
        if (node.callee.name !== 'Date') {
          return;
        }
        if (node.arguments.length !== 1) {
          return;
        }
        const [arg] = node.arguments;
        if (arg.type !== 'Literal') {
          return;
        }
        const regexp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,})?(?:Z|([-+]\d{2}:\d{2}))$/g;
        if (regexp.test(arg.value)) {
          return;
        }
        context.report({node, message: generateErrorMessage(arg.value)});
      },
    };
  },
};
