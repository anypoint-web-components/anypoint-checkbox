# anypoint-checkbox

Anypoint styled checkbox

## Usage

Install element:

```
npm i --save @anypoint-components/anypoint-checkbox
```

Import into your app:

```html
<script type="module" src="node_modules/@anypoint-components/anypoint-checkbox.js"></script>
```

Or into another component

```javascript
import '@anypoint-components/anypoint-checkbox.js';
```

Use it:

```html
<anypoint-checkbox>label</anypoint-checkbox>
<anypoint-checkbox checked>label</anypoint-checkbox>
```

### Using with forms

```
npm i --save @polymer/iron-form
```

```html
<script type="module">
import 'node_modules/@polymer/iron-form';
</script>
<iron-form>
 <form>
   <anypoint-checkbox name="subscribe" value="newsletetr">Subsceribe to our newsletter</anypoint-checkbox>
   <anypoint-checkbox name="tems" value="accepted" checked>Agree to terms and conditions</anypoint-checkbox>
   <anypoint-checkbox name="disabled" value="noop" disabled>This is never included</anypoint-checkbox>
 </form>
</iron-form>
<script>
const values = document.querySelector('iron-form').serializeForm();
console.log(values);
</script>
```

## Development

### Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

### Viewing Your Element

```
$ polymer serve
```

### Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
