export function graphGenerater(name, data, type = 'query') {
  let str = `${type} ${name} {\n`;
  str = `${str} ${data}\n}`;
  return str;
}

function graphqlWrapper(name, query, type = 'query', vars = null) {
  //console.log(vars);
  return {
    operationName: name,
    query: `${type} ${query}`,
    variables: vars,
  };
}

export default graphqlWrapper;
