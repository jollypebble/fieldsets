# Field Groups

Field groups are a grouping of fields that must come together as a set. Since the back end data architecture is field group agnostic as all fields will be updated on save, this is done primarily to return complex field objects for rendering input altering on the front end. These differ from Field Sets in that they have no shape associated with them outside what is rendered for the field input box. It is best practice to use Field Types instead of react-md input components when declaring a field group.
