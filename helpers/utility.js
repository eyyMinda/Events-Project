import { isValid } from "./authValidation";

export function transformObjToArr(data) {
  return Object.keys(data).map(key => ({
    id: key,
    ...data[key]
  }));
}

export const getCurrentDate = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

/**
 * @param {Array<string>} inputs | Array of strings ex: "Johnny"
 * @param {Array<function>} validators | Array of validator functions ex: isValid.name
 * @returns {Array<string>} | Array of error mesages received from validation functions
 */
export const validateMultipleInputs = (inputs, validators) => inputs.map((input, index) => {
  const [err, msg] = isValid[validators[index]](input);
  return err ? msg : null;
}).filter(Boolean);