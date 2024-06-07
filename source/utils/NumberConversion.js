export const convertToTwoDecimals = (inputString) => {
    // Parse the string to a floating-point number
    const number = parseFloat(inputString);

    // Check if the input is a valid number
    if (!isNaN(number)) {
        // Round the number to two decimals using toFixed
        const roundedNumber = number.toFixed(2);
        
        // Convert the result back to a string and return
        return roundedNumber.toString();
    } else {
        // Handle the case where the input is not a valid number
        return "";
    }
}