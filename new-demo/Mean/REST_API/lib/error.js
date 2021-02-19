module.exports = (ResponseCode, ResponseHeaderText, ResponseBodyText, ResponseMethod) => {
    const objResponse = {};
    objResponse.ResponseCode = ResponseCode;
    objResponse.ResponseHeaderText = ResponseHeaderText;
    objResponse.ResponseBodyText = ResponseBodyText;
    objResponse.ResponseMethod = ResponseMethod;
    return objResponse;
}