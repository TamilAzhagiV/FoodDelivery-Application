const validate = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse({

            body: req.body,

            params: req.params,

            query: req.query,

            headers: req.headers

        });

        if (!result.success) {

            return res.status(400).json({

                success: false,

                message: "Validation failed",

                errors: result.error.flatten().fieldErrors

            });

        }

        req.body = result.data.body || {};

        req.params = result.data.params || {};

        req.query = result.data.query || {};

        req.headers = result.data.headers || req.headers;

        next();

    };

};

module.exports = validate;