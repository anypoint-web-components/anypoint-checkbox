import { LitElement, html } from 'lit-element';
import { ButtonStateMixin, ControlStateMixin } from '@anypoint-web-components/anypoint-control-mixins';
import { CheckedElementMixin } from '@anypoint-web-components/anypoint-form-mixins';
import checkboxStyles from './Styles.js';

/* eslint-disable class-methods-use-this */

/**
 * `anypoint-checkbox`
 * Anypoint styled checkbox
 *
 * `<anypoint-checkbox>` is a button that can be either checked or unchecked.
 * User can tap the checkbox to check or uncheck it.  Usually you use checkboxes
 * to allow user to select multiple options from a set.
 * Avoid using a single checkbox as an option selector and use toggle button instead.
 *
 * ### Example
 *
 * ```html
 * <anypoint-checkbox>label</anypoint-checkbox>
 * <anypoint-checkbox checked>label</anypoint-checkbox>
 * ```
 *
 * ### Using with forms
 *
 * ```
 * npm i --save @polymer/iron-form
 * ```
 *
 * ```html
 * <script type="module">
 * import '@polymer/iron-form';
 * </script>
 * <iron-form>
 *  <form>
 *    <anypoint-checkbox name="subscribe" value="newsletter">Subscribe to our newsletter</anypoint-checkbox>
 *    <anypoint-checkbox name="terms" value="accepted" checked>Agree to terms and conditions</anypoint-checkbox>
 *    <anypoint-checkbox name="disabled" value="noop" disabled>This is never included</anypoint-checkbox>
 *  </form>
 * </iron-form>
 * <script>
 * const values = document.querySelector('iron-form').serializeForm();
 * console.log(values);
 * </script>
 * ```
 *
 * ### Styling
 *
 * `<anypoint-checkbox>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--anypoint-checkbox-input-border-color` | Border color of the checkbox input square | `--anypoint-color-aluminum4`
 * `--anypoint-checkbox-label-color` | A color of the label. | ` --anypoint-color-steel1`
 * `--anypoint-checkbox-label` | Mixin applied to the label | ``
 * `--anypoint-checkbox-label-checked-color` | Color of checked label | `--anypoint-color-steel1`
 * `--anypoint-checkbox-label-checked` | Mixin applies dto checked label | ``
 * `--anypoint-checkbox-unchecked-color` | Color of a label of unchecked checkbox | `--anypoint-color-steel1`
 * `--anypoint-checkbox-error-color` | Color of error state | `--anypoint-color-danger`
 * `--anypoint-checkbox-label-spacing` | Spacing between the label and the checkbox | `0`
 */
export class AnypointCheckbox extends ButtonStateMixin(ControlStateMixin(CheckedElementMixin(LitElement))) {
  get styles() {
    return checkboxStyles;
  }

  render() {
    const { checked, invalid, indeterminate } = this;
    return html`<style>${this.styles}</style>
      <div class="checkboxContainer">
        <div class="checkbox ${this._computeCheckboxClass(checked, invalid)}">
          <div class="checkmark ${this._computeCheckmarkClass(checked, indeterminate)}"></div>
        </div>
      </div>
      <label class="checkboxLabel"><slot></slot></label>`;
  }

  /**
   * @returns {EventListener} Previously registered event listener or null
   */
  get onchange() {
    return this._onchange || null;
  }

  /**
   * @param {EventListener} value An event listener for the `change` event or null to unregister
   */
  set onchange(value) {
    const old = this._onchange;
    if (old === value) {
      return;
    }
    if (old) {
      this.removeEventListener('change', old);
    }
    if (typeof value !== 'function') {
      this._onchange = null;
    } else {
      this._onchange = value;
      this.addEventListener('change', value);
    }
  }

  static get properties() {
    return {
      ariaActiveAttribute: { type: String },

      indeterminate: { type: Boolean, reflect: true },

      formDisabled: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.ariaActiveAttribute = 'aria-checked';
    this.checked = false;
    /* to work with iron-form */
    this._hasIronCheckedElementBehavior = true;
  }

  connectedCallback() {
    // button state mixin sets role to checkbox
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'checkbox');
    }
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!this.hasAttribute('aria-checked')) {
      this.setAttribute('aria-checked', 'false');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  _computeCheckboxClass(checked, invalid) {
    let className = '';
    if (checked) {
      className += 'checked ';
    }
    if (invalid) {
      className += 'invalid';
    }
    return className.trim();
  }

  _computeCheckmarkClass(checked, indeterminate) {
    if (!checked && indeterminate) {
      return '';
    }
    return checked ? '' : 'hidden';
  }

  /**
   * Synchronizes the element's `active` and `checked` state.
   */
  _buttonStateChanged() {
    if (this.disabled || this.indeterminate) {
      return;
    }
    this.checked = this.active;
  }

  _clickHandler() {
    if (this.disabled) {
      return;
    }
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.active = !this.active;
    this.dispatchEvent(new Event('change'));
  }

  _checkedChanged(value) {
    super._checkedChanged(value);
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.setAttribute('aria-checked', value ? 'true' : 'false');
    this.validate(this.checked);
  }

  _spaceKeyDownHandler(e) {
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    super._spaceKeyDownHandler(e);
  }

  checkValidity() {
    return this.required ? this.checked : true;
  }

  formDisabledCallback(disabled) {
    this.formDisabled = disabled;
  }

  formResetCallback() {
    this.checked = false;
  }

  formStateRestoreCallback(state) {
    this.checked = !!state;
  }
}
