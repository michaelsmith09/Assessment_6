const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  // CODE HERE
  test("check that shuffle returns an array", async () => {
    const testArray = ['testOne', 3, 'testSeven', 6];
    const result = shuffle(testArray) 
    expect(Array.isArray(result)).toBe(true);
  });
  test("check that shuffle returns an array", async () => {
    const testArray = ['testOne', 3, 'testSeven', 6];
    const result = shuffle(testArray)
    expect(result.length).toBe(testArray.length);
  });
});
