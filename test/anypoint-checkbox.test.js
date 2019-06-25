import { fixture, assert, aTimeout } from '@open-wc/testing';
import { a11ySuite } from '@advanced-rest-client/a11y-suite/index.js';
import '@polymer/iron-test-helpers/mock-interactions.js';
import '../anypoint-checkbox.js';

/* global MockInteractions */

describe('<anypoint-checkbox>', function() {
  async function basicFixture() {
    return (await fixture(`<anypoint-checkbox></anypoint-checkbox>`));
  }

  async function noLabelFixture() {
    return (await fixture(`<anypoint-checkbox></anypoint-checkbox>`));
  }

  async function withLabelFixture() {
    return (await fixture(`<anypoint-checkbox>Batman</anypoint-checkbox>`));
  }

  async function roleFixture() {
    return (await fixture(`<anypoint-checkbox role="button">Batman</anypoint-checkbox>`));
  }

  async function checkedFixture() {
    return (await fixture(`<anypoint-checkbox checked>Batman</anypoint-checkbox>`));
  }

  async function tabindexFixture() {
    return (await fixture(`<anypoint-checkbox tabindex="-1">Batman</anypoint-checkbox>`));
  }

  async function indeterminateFixture() {
    return (await fixture(`<anypoint-checkbox indeterminate></anypoint-checkbox>`));
  }

  async function formFixture() {
    return (await fixture(`<form>
      <anypoint-checkbox name="test-name" value="test-value"></anypoint-checkbox>
    </form>`));
  }

  async function formCheckedFixture() {
    return (await fixture(`<form>
      <anypoint-checkbox name="test-name" value="test-value" checked></anypoint-checkbox>
    </form>`));
  }

  async function formCheckedRequiredFixture() {
    return (await fixture(`<form>
      <anypoint-checkbox name="test-name" value="test-value" checked required></anypoint-checkbox>
    </form>`));
  }

  describe('a11y', () => {
    let c1;
    let c2;
    let c3;
    let c4;
    let c5;
    beforeEach(async () => {
      c1 = await noLabelFixture();
      c2 = await withLabelFixture();
      c3 = await roleFixture();
      c4 = await checkedFixture();
      c5 = await tabindexFixture();
    });

    it('Sets role attribute', () => {
      assert.isTrue(c1.getAttribute('role') === 'checkbox');
      assert.isTrue(c2.getAttribute('role') === 'checkbox');
      assert.isTrue(c3.getAttribute('role') === 'button');
      assert.isTrue(c4.getAttribute('role') === 'checkbox');
    });

    it('Sets aria-checked attribute', () => {
      assert.equal(c1.getAttribute('aria-checked'), 'false');
      assert.equal(c2.getAttribute('aria-checked'), 'false');
      assert.equal(c3.getAttribute('aria-checked'), 'false');
      assert.equal(c4.getAttribute('aria-checked'), 'true');
    });

    it('Sets tabindex attribute', () => {
      assert.equal(c1.getAttribute('tabindex'), '0');
      assert.equal(c2.getAttribute('tabindex'), '0');
      assert.equal(c3.getAttribute('tabindex'), '0');
      assert.equal(c4.getAttribute('tabindex'), '0');
      assert.equal(c5.getAttribute('tabindex'), '-1');
    });

    a11ySuite('No label', '<anypoint-checkbox></anypoint-checkbox>');
    a11ySuite('With label', '<anypoint-checkbox>Batman</anypoint-checkbox>');
    a11ySuite('Aria label', '<anypoint-checkbox aria-label="Batman">Robin</anypoint-checkbox>');
    a11ySuite('Disabled', '<anypoint-checkbox disabled>Robin</anypoint-checkbox>');
    a11ySuite('Checked', '<anypoint-checkbox chected>Robin</anypoint-checkbox>');
  });

  describe('Defaults', () => {
    let c1;
    beforeEach(async () => {
      c1 = await noLabelFixture();
    });

    it('check checkbox via click', async () => {
      MockInteractions.tap(c1);
      await aTimeout();
      assert.equal(c1.getAttribute('aria-checked'), 'true', 'Has aria-checked');
      assert.isTrue(c1.checked, '.checked is true');
    });

    it('toggle checkbox via click', async () => {
      c1.checked = true;
      MockInteractions.tap(c1);
      await aTimeout();
      assert.isFalse(c1.getAttribute('aria-checked') !== 'false');
      assert.isFalse(c1.checked);
    });

    it('disabled checkbox cannot be clicked', async () => {
      c1.disabled = true;
      c1.checked = true;
      MockInteractions.tap(c1);
      await aTimeout();
      assert.isTrue(c1.getAttribute('aria-checked') === 'true');
      assert.isTrue(c1.checked);
    });

    it('checkbox can be validated', () => {
      c1.required = true;
      assert.isFalse(c1.validate());
      c1.checked = true;
      assert.isTrue(c1.validate());
    });

    it('disabled checkbox is always valid', () => {
      c1.disabled = true;
      c1.required = true;
      assert.isTrue(c1.validate());
      c1.checked = true;
      assert.isTrue(c1.validate());
    });
  });

  describe('Basic', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('check checkbox via click', (done) => {
      element.addEventListener('click', () => {
        assert.equal(element.getAttribute('aria-checked'), 'true');
        assert.isTrue(element.checked);
        done();
      });
      element.click();
    });

    it('Uncheck checkbox via click', (done) => {
      element.checked = true;
      element.addEventListener('click', () => {
        assert.equal(element.getAttribute('aria-checked'), 'false');
        assert.isFalse(element.checked);
        done();
      });
      element.click();
    });

    it('disabled checkbox cannot be clicked', (done) => {
      element.disabled = true;
      element.checked = true;
      element.click();
      setTimeout(() => {
        assert.equal(element.getAttribute('aria-checked'), 'true');
        assert.isTrue(element.checked);
        done();
      }, 1);
    });

    it('checkbox can be validated', () => {
      element.required = true;
      assert.isFalse(element.validate(), 'not validated');
      element.checked = true;
      assert.isTrue(element.validate(), 'is validated');
    });

    it('disabled checkbox is always valid', () => {
      element.disabled = true;
      element.required = true;
      assert.isTrue(element.validate());
      element.checked = true;
      assert.isTrue(element.validate());
    });

    it('Passes validation', () => {
      const result = element.checkValidity();
      assert.isTrue(result);
    });
  });

  describe('indeterminate', () => {
    let element;
    beforeEach(async () => {
      element = await indeterminateFixture();
    });

    it('Removes indeterminate when clicked', async () => {
      MockInteractions.tap(element);
      await aTimeout();
      assert.isFalse(element.indeterminate);
    });

    it('Removes indeterminate when checked changed', () => {
      element.checked = true;
      assert.isFalse(element.indeterminate);
    });

    it('Removes indeterminate when space pressed', async () => {
      MockInteractions.pressSpace(element);
      await aTimeout();
      assert.isFalse(element.indeterminate);
    });

    it('Removes indeterminate when enter pressed', async () => {
      MockInteractions.pressEnter(element);
      await aTimeout();
      assert.isFalse(element.indeterminate);
    });
  });

  describe('_computeCheckboxClass()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns empty string when no arguments', () => {
      const result = element._computeCheckboxClass(false, false);
      assert.equal(result, '');
    });

    it('Returns checked class for checked', () => {
      const result = element._computeCheckboxClass(true, false);
      assert.equal(result, 'checked');
    });

    it('Returns invalid class for invalid', () => {
      const result = element._computeCheckboxClass(false, true);
      assert.equal(result, 'invalid');
    });

    it('Returns both classes', () => {
      const result = element._computeCheckboxClass(true, true);
      assert.equal(result, 'checked invalid');
    });
  });

  describe('_internals', () => {
    it('Has associated form', async () => {
      const form = await formFixture();
      const element = form.querySelector('anypoint-checkbox');
      if (element._internals) {
        assert.isTrue(element.form === form);
      }
    });

    it('Form reset resets the control', async () => {
      const form = await formCheckedFixture();
      const element = form.querySelector('anypoint-checkbox');
      if (element._internals) {
        form.reset();
        assert.isFalse(element.checked);
      }
    });

    it('Sets custom validation', async () => {
      const form = await formCheckedRequiredFixture();
      const element = form.querySelector('anypoint-checkbox');
      if (element._internals) {
        element.checked = false;
        assert.isTrue(element.matches(':invalid'));
      }
    });
  });
});
