import { newSpecPage } from '@stencil/core/testing';
import { AmplifyInput } from './amplify-input'

describe('amplify-input spec:', () => {
  describe('Render logic ->', () => {
    it('renders correct HTML', async () => {
      const page = await newSpecPage({
        components: [AmplifyInput],
        html: `<amplify-input></amplify-input>`,
      });

      expect(page.root).toMatchSnapshot();
    });
  });
});
