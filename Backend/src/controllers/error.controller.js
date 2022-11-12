const ApiError = require('../api-error');

exports.methodNotAllowed = (req, res, next) => {
	if (req.route) {
		// Determine which HTTP methods are supported
		const httpMethods = Object.keys(req.route.methods)
			.filter((method) => method !== '_all')
			.map((method) => method.toUpperCase());
		return next(
			new ApiError(405, 'Method Not Allowed', {
				Allow: httpMethods.join(', '),
			})
		);
	}
	return next();
};

exports.resourceNotFound = (req, res, next) => {
	// Handler for unknown URL path.
	//		Call next() to pass to the error handling function.
	return next(new ApiError(404, 'Resource not found'));
};

exports.handleError = (error, req, res, next) => {
	// The centralized error handling function.
	// In any route handler, calling next(error)
	//		will pass to this error handling function.
	return res
		.status(error.statusCode || 500)
		.set(error.headers || {})
		.json({
			message: error.message || 'Internal Server Error',
		});
};
