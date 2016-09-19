const a = [{_id: 1, x: 1, y: 1}, {_id: 2, x: 2, y: 2}];

console.log(a.map(e => {
  const {_id: id, ...rest} = e;
  return {id, ...rest};
}));

function test({_id, ...rest}) {
  console.log({_id, ...rest});
}

test(a[0]);
