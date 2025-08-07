const log = (...args) => {
  console.log('[LOG]', ...args);
};

const error = (...args) => {
  console.error('[ERROR]', ...args);
};

module.exports = { log, error };
