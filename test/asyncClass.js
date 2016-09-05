class Test {
  async testMethod() {
    return new Promise(resolve => { setTimeout(resolve, 1000, 'qwe') });
  }
  async render() {
    return await this.testMethod();
  }
}

const t = new Test();
t.render().then(console.log);
