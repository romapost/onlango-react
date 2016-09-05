function test() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'qwerty');
  });
}

(async () => { console.log(await test()) })();
