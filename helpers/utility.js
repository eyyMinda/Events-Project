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
  const [err, msg] = validators[index](input);
  return err ? msg : null;
}).filter(Boolean);

export const tryCatch = async (callback, errorMessage, res) => {
  try {
    const result = await callback();
    return res || result;
  } catch (error) {
    console.error('TRYCATCH ERROR: ', error);
    return { err: true, msg: errorMessage }; // Return the error response
  }
};