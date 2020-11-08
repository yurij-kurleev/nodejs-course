const debug = (...args) => {
  console.debug(...args);
}

const error = (...args) => {
  console.error(...args);
}

const log = (...args) => {
  console.log(...args);
}

const warn = (...args) => {
  console.warn(...args);
}

module.exports = {
  debug,
  error,
  log,
  warn,
}