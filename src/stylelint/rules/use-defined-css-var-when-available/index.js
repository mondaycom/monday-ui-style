const stylelint = require("stylelint");
const valueParser = require("postcss-value-parser");
const { getPropsToAllowedCssVars } = require("./parse-monday-css");

const { report, ruleMessages, validateOptions } = stylelint.utils;

const ruleName = "monday-ui-style/use-defined-css-var-when-available";
const messages = ruleMessages(ruleName, {
  expected: (original, expected) => {
    const asArray = Array.isArray(expected) ? expected : [expected];
    const multipleValues = asArray.length > 1;
    const expectedMsg = multipleValues ? `one of vars: \n${asArray.join("\n")}\n` : `"var(${asArray[0]})"`;
    return `Expected "${original}" to be ${expectedMsg}`;
  },
});

module.exports = stylelint.createPlugin(ruleName, function ruleFunction(primaryOption, secondaryOptionObject, context) {
  const propsToAllowedCssVars = getPropsToAllowedCssVars();

  return function lint(postcssRoot, postcssResult) {
    const validOptions = validateOptions(postcssResult, ruleName, {
      // No options for now...
    });

    if (!validOptions) {
      // If the options are invalid, don't lint
      return;
    }
    const isAutoFixing = Boolean(context.fix);
    postcssRoot.walkDecls((decl) => {
      // Iterate CSS declarations

      const valuesToVars = propsToAllowedCssVars[decl.prop];
      if (!valuesToVars) {
        return;
      }

      const parsedValue = valueParser(decl.value);
      parsedValue.walk((node) => {
        // iterate nodes inside values, e.g. "padding: 16px 20px" will have two value nodes: "16px" and "20px"
        if (node.type !== "word") {
          return;
        }

        const varReplacementsForValue = valuesToVars[node.value];

        if (!varReplacementsForValue || !varReplacementsForValue.length) {
          return;
        }
        const hasSingleReplacement = varReplacementsForValue.length === 1;

        if (isAutoFixing) {
          // We are in “fix” mode
          if (hasSingleReplacement) {
            // we only autofix single replacements
            const replacement = `var(${varReplacementsForValue[0]})`;
            const newValue = decl.value.replace(node.value, replacement);
            // Apply the fix. It's not pretty, but that's the way to do it
            if (decl.raws.value) {
              decl.raws.value.raw = newValue;
            } else {
              decl.value = newValue;
            }
          }
        } else {
          // We are in “report only” mode
          report({
            ruleName,
            result: postcssResult,
            message: messages.expected(node.value, varReplacementsForValue), // Build the reported message
            node: decl, // Specify the reported node
            word: node.value, // Which exact word caused the error? This positions the error properly
          });
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
