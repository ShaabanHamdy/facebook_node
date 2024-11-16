



let stackVar;

export const asyncHandling = (API) => {

    return (req, res, next) => {
        API(req, res, next).catch(err => {
            stackVar = err.stack
            return next(new Error(err.message, { caus: 500 }))
        })
    }
}

const globalErrorHandling = (err, req, res, next) => {
    if (err) {
        return res.status(err.caus || 500).json({ status: "fail Response", message: err.message, stack: err.stack })
    }
}


export default globalErrorHandling