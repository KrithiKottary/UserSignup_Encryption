var i = 0;

export const test_middleware = (req, res, next) => {
    i++;
    console.log(`test_middleware called: ${i} times`);
    next();
}