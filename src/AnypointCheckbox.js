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
 * Avoid using a single checkbox as an option selector and use toggle button intead.
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
 * import 'node_modules/@polymer/iron-form';
 * </script>
 * <iron-form>
 *  <form>
 *    <anypoint-checkbox name="subscribe" value="newsletetr">Subsceribe to our newsletter</anypoint-checkbox>
 *    <anypoint-checkbox name="tems" value="accepted" checked>Agree to terms and conditions</anypoint-checkbox>
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
 * `--anypoint-checkbox-input-border-bolor` | Border color of the checkbox input square | `--anypoint-color-aluminum4`
 * `--anypoint-checkbox-label-color` | A color of the label. | ` --anypoint-color-steel1`
 * `--anypoint-checkbox-label` | Mixin applied to the label | ``
 * `--anypoint-checkbox-label-checked-color` | Color of checked label | `--anypoint-color-steel1`
 * `--anypoint-checkbox-label-checked` | Mixin applie dto checked label | ``
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

  static get formAssociated() {
    return true;
  }

  get form() {
    return this._internals && this._internals.form;
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
    // @ts-ignore
    if (this.attachInternals) {
      // @ts-ignore
      this._internals = this.attachInternals();
    }
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
  }

  _checkedChanged(value) {
    super._checkedChanged(value);
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    this.setAttribute('aria-checked', value ? 'true' : 'false');
    if (this._internals) {
      this._internals.setFormValue(value ? this.value : '');

      if (!this.matches(':disabled') && this.hasAttribute('required') && !value) {
        this._internals.setValidity({
          customError: true
        }, 'This field is required.');
      } else {
        this._internals.setValidity({});
      }
    } else {
      this.validate(this.checked);
    }
  }

  _spaceKeyDownHandler(e) {
    if (this.indeterminate) {
      this.indeterminate = false;
    }
    super._spaceKeyDownHandler(e);
  }

  checkValidity() {
    if (this._internals) {
      return this._internals.checkValidity();
    }
    return this.required ? this.checked : true;
  }

  formDisabledCallback(disabled) {
    this.formDisabled = disabled;
  }

  formResetCallback() {
    this.checked = false;
    this._internals.setFormValue('');
  }

  formStateRestoreCallback(state) {
    this._internals.setFormValue(state);
    this.checked = !!state;
  }
  /**
   * Fired when the checked state changes due to user interaction.
   *
   * @event change
   */
  /**
   * Fired when the checked state changes.
   *
   * @event iron-change
   */
}
