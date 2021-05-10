import {TemplateResult, CSSResult, LitElement} from 'lit-element';
import { ButtonStateMixin, ControlStateMixin } from '@anypoint-web-components/anypoint-control-mixins';
import { CheckedElementMixin } from '@anypoint-web-components/anypoint-form-mixins';

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
 * 
 * @fires change Fired when the checked state changes due to user interaction.
 */
export class AnypointCheckbox  extends ButtonStateMixin(ControlStateMixin(CheckedElementMixin(LitElement))) {
  get styles(): CSSResult;

  render(): TemplateResult;

  static get formAssociated(): boolean;

  get form(): HTMLFormElement|null;

  onchange: EventListener;
  
  /**
   * @attribute
   */
  ariaActiveAttribute: string;
  /**
   * @attribute
   */
  indeterminate: boolean;
  /**
   * @attribute
   */
  formDisabled: boolean;

  constructor();

  connectedCallback(): void;

  _computeCheckboxClass(checked: boolean, invalid: boolean): string;

  _computeCheckmarkClass(checked: boolean, indeterminate: boolean): void;

  /**
   * Synchronizes the element's `active` and `checked` state.
   */
  _buttonStateChanged(): void;

  _clickHandler(): void;

  _checkedChanged(value: boolean): void;

  _spaceKeyDownHandler(e: KeyboardEvent): void;

  checkValidity(): boolean;

  formDisabledCallback(disabled: boolean): void;

  formResetCallback(): void;

  formStateRestoreCallback(state: any): void;
}
