// For clipboard copy test in TextBox component.
// {@link https://stackoverflow.com/questions/50023902/how-can-document-execcommand-be-unit-tested}
global.document.execCommand = jest.fn()
