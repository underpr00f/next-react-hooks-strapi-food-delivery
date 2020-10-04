// For check errors sleep promise
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const validateEmailInput = async (value) => {
  await sleep(500);
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};
// export const multipleValidations = (value, validations) => {
//     const checks = validations.map(validation => validation(value))
//     const failedChecks = checks.filter(check => !!check)
//     console.log(checks, failedChecks)
//     return failedChecks.length === 0 ? undefined : failedChecks.join(", ")
// }

// export const matchPasswords = (value, allValues, props, name) => {
//     if (allValues['password']) {
//         return value !== allValues['password'] ? "Passwords Don't Match" : undefined
//     } else {
//         return undefined
//     }
// }

// export const letters = value =>
//     value && !/^[a-zA-Z]+$/i.test(value)
//         ? 'Must consists only letters'
//         : undefined
// export const isurl = value =>
//     value && !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value)
//         ? 'URL is not valid, your URL must be like "https://example.com/"'
//         : undefined
// export const number = value =>
//     value && isNaN(Number(value)) ? 'Must be a number' : undefined
// export const minValue = min => value =>
//     value && value < min ? `Must be at least ${min}` : undefined
// export const minValue18 = minValue(18)

// export const tooOld = value =>
//     value && value > 65 ? 'You might be too old for this' : undefined
// export const aol = value =>
//     value && /.+@aol\.com/.test(value)
//         ? 'Really? You still use AOL for your email?'
//         : undefined
// export const alphaNumeric = value =>
//     value && /[^a-zA-Z0-9 ]/i.test(value)
//         ? 'Only alphanumeric characters'
//         : undefined
// export const phoneNumber = value =>
//     value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//         ? 'Invalid phone number, must be 10 digits'
//         : undefined
