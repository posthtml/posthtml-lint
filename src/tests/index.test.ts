import posthtml from 'posthtml';
import { lint } from '../';
import { testCases } from './__fixtures__/testCases';

describe('posthtmlLint', () => {
  testCases.forEach(testCase => {
    test(`'${testCase.name}' matches the snapshot`, () => {
      posthtml()
        .use(lint())
        .process(testCase.input)
        .then((result: { html: string }) => {
          expect(result.html).toMatchSnapshot();
        });
    });
  });
});
