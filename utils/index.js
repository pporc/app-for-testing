function testResult(postVal, trueVal) {
  let right = 0;
  let notRight = 0;

  trueVal.forEach((currentValue, index) => {
    if (currentValue === postVal[`test${index + 1}`]) { 
      right += 1;
    } else {
      notRight += 1;
    }
  });

  return { right, notRight };
}

function sortData(data) {
  const count = data.count;
  const list = [];
  const correct = [];

  for (let i = 1; i <= +count; i++) {
    const test = {};
    test.name = 'test' + i;
    test.question = data['question' + i];
    test.answer = data['answer' + i];

    list.push(test);
    correct.push(test.answer[data['isCorrect' + i]]);
  }

  return {
    name: data.testName,
    list,
    isCorrect: correct,
  };
}

module.exports = { testResult, sortData };
