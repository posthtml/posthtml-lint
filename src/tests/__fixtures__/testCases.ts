interface ITestCase {
  name: string;
  input: string;
}

const testCases: ITestCase[] = [
  {
    name: 'No Duplicate Ids',
    input: `
      <div id="a"></div>
      <div id="a"></div>
    `
  },
  {
    name: 'No Duplicate Tags',
    input: `
      <body></body>
      <body></body>
    `
  },
  {
    name: 'No Empty Tags',
    input: `
      <a href=""></a>
      <img />
      <div><span></span></div>
    `
  },
  {
    name: 'No Missing Attributes',
    input: `
      <a></a>
      <img />
      <input />
    `
  }
];

export { testCases };
