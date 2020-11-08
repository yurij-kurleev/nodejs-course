const args = process.argv.slice(2);
const params = {};

args.forEach((paramValue, i) => {
  if (i % 2 === 1) {
    const paramKey = args[i-1].slice(1);
    params[paramKey] = paramValue;
  }
});

module.exports = {
  PORT: process.env.PORT || 3000,
  ENV: params.env || 'dev',
}