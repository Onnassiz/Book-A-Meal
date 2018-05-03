
class ControllerUtil {
	getErrorMessage(error) {
		const message = error.errors[0];
		return {
			[message.path]: message.message,
		};
	}
}

module.exports = ControllerUtil;
