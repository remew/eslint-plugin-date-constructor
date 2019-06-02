'use strict';
const {RuleTester} = require('eslint');
const tester = new RuleTester();
const rule = require('../only-iso8601');

tester.run('only-iso8601', rule, {
  valid: [
    {code: "new Date()"},

    {code: "new Date('2019-05-29T12:34:56Z')"},
    {code: "new Date('2019-05-29T12:34:56.000Z')"},
    {code: "new Date('2019-05-29T12:34:56.000000Z')"},

    {code: "new Date('2019-05-29T12:34:56+09:00')"},
    {code: "new Date('2019-05-29T12:34:56-03:00')"},
    {code: "new Date('2019-05-29T12:34:56.0+09:00')"},
    {code: "new Date('2019-05-29T12:34:56.0-03:00')"},
    {code: "new Date('2019-05-29T12:34:56.000+09:00')"},
    {code: "new Date('2019-05-29T12:34:56.000-03:00')"},
    {code: "new Date('2019-05-29T12:34:56.000000+09:00')"},
    {code: "new Date('2019-05-29T12:34:56.000000-03:00')"},
  ],
  invalid: [
    {code: "new Date('')", errors: ["'' is not a valid ISO 8601 string"]},
    {code: "new Date('2019/05/29 12:34')", errors: ["'2019/05/29 12:34' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56n000Z')", errors: ["'2019-05-29T12:34:56n000Z' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56.000z')", errors: ["'2019-05-29T12:34:56.000z' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56.000+-00:00')", errors: ["'2019-05-29T12:34:56.000+-00:00' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56.000-+00:00')", errors: ["'2019-05-29T12:34:56.000-+00:00' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56.000+0:0')", errors: ["'2019-05-29T12:34:56.000+0:0' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56.000+00:0')", errors: ["'2019-05-29T12:34:56.000+00:0' is not a valid ISO 8601 string"]},
    {code: "new Date('2019-05-29T12:34:56.000+0:00')", errors: ["'2019-05-29T12:34:56.000+0:00' is not a valid ISO 8601 string"]},
  ],
});
