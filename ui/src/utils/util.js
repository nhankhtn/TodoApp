const { PATTERN_EMAIL } = require("~/constants");

export function isValidEmail(email) {
    return PATTERN_EMAIL.test(email);
}
