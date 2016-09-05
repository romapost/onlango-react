import init from './lib';

(async () => {
  try {
    await init();
    console.log('Server started');
  } catch (e) {
    console.error(e);
  }
})();
