const isPositive = (int) => {
    if (int >= 0 && Number.isInteger(int)) {
        return true
    } else {
        return false
    }
}

module.exports = {
    isPositive
};