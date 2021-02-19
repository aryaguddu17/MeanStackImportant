module.exports = (ResponseCode, ResponseHeaderText, ResponseBodyText, ResponseMethod, Data) => {
    const objResponse = {};
    objResponse.ResponseCode = ResponseCode;
    objResponse.ResponseHeaderText = ResponseHeaderText;
    objResponse.ResponseBodyText = ResponseBodyText;
    objResponse.ResponseMethod = ResponseMethod;
    objResponse.Data = Data
    return objResponse;
}