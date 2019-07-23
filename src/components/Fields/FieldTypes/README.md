# Field Types
Field Types represent the input visualization for altering fields and the validation rules required of them.

* Default - A simple text box, no input validation.
* Currency - Requires numeric. Will return USD currency decimals and prefix input box with a `$`
* Hidden - Used for forms and tracking static data that might be set in code. No validation.
* Select - A single select drop down that you can pass valid string options. No validation.
* Function - Non-editable value that is calculated off a subset of fields. Functions can be defined in (Functions.js)[../Functions.js]
