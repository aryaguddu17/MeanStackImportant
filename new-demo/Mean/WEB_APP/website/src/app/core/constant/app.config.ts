export const appConfig = {
    secretKey: 'secret key 123',
    pageArray: [
        { val: 5, text: '5/Page' },
        { val: 10, text: '10/Page' },
        { val: 20, text: '20/Page' },
        { val: 30, text: '30/Page' },
        { val: 40, text: '40/Page' },
        { val: 50, text: '50/Page' },
        { val: 100, text: '100/Page' }
    ],
    withoutLoginUrls: ['/'],
    perPageDefault: 5,
    pageDefault: "1",
    perPageArray: [12, 24, 36, 48, 60],
    perPageTblArray: [10, 20, 30, 40, 50, 100],
    perPageTblDefault: 10,
    date_format: 'YYYY-MM-DD',
    yearRange: 100,
    statusCode: {
        'ok': 200,
        'error': 401,
        'warning': 404,
        'precondition': 412,
        'failed': 1002,
        'unauth': 402,
        'permission': 403,
        'internalError': 1004,
        'fbAccessTokenExpire': 405
    },
    pattern: {
        'NAME': /^[a-zA-Z . \-\']*$/,
        "CITY": /^[a-zA-Z . \-\']*$/,
        "EMAIL": /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "POSTAL_CODE": /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/, // /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        "PHONE_NO": /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/,
        "PASSWORD": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/,
        "DESCRIPTION": /^[ A-Za-z0-9_@./#&+-,]*$/,
        "TASK_CODE": /^[0-9999]{1,4}$/,
        "SUB_DOMAIN": /^[/a-z/A-Z][a-zA-Z0-9-]*[^/-/./0-9]$/,
        "PHONE_NO_MASK": ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "IVR_ACTION_KEY": /^[0-9]*$/,
        "IVR_NUMBER": /^[0-9]*$/,
        "RADIUS": /^[0-9]*(?:.)([0-9])+$/,
        "LATLONG": /^\s*(\-?\d+(\.\d+)?)$/,
        "SSN": /^((\d{3}-?\d{2}-?\d{4})|(X{3}-?X{2}-?X{4}))$/,
        "SSN_MASK": [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "PRACTICE_PASSWORD": /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "USERNAME": /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/,
        "USERNAME_MIN_SIZ": /^[a-zA-Z0-9_](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9_]){4,18}[a-zA-Z0-9_]$/,
        "WICARE_USERNAME": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,}/,
        "YEAR_MASK": /d{4}/,
        "DECIMAL": /\d+(\.\d{1,2})?/,
        "INPUTFIELD": /^[A-Za-z ]{1,80}$/
    },
    message: {
        'REMOVESOCAILPROFILE': 'Are you sure want to remove profile',
        'ACCOUNTCONNECTIONSUCCESS': 'Account connected successfully',
        'ACCOUNTRECONNECTIONSUCCESS': 'Reauthentication done successfully',

    }

};