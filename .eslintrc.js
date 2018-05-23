module.exports = {
	"extends": "airbnb",
	"rules": {
		"object-curly-newline": ["off"],
		"class-methods-use-this": ["off"],
		"indent": ["error", "tab"],
		"no-tabs": ["off"],
		"no-useless-constructor": ["off"],
		"arrow-body-style": ["off"],
		"guard-for-in": ["off"],
		"no-restricted-syntax": ["off"],
		"react/jsx-filename-extension": ["off"],
		"react/prefer-stateless-function": ["off"],
		"react/forbid-prop-types": ["off"],
		"react/jsx-indent": ["off"],
		"react/jsx-indent-props": ["off"],
		"jsx-a11y/anchor-is-valid": ["off"],
		"jsx-a11y/label-has-for": ["off"],
		"max-len": ["off"],
		"jsx-a11y/click-events-have-key-events": ["off"],
		"jsx-a11y/no-static-element-interactions": ["off"]
	},
	"globals": {
    "document": true,
		"window": true,
		"localStorage": true
  }
};
