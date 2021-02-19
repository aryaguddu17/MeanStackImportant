
// for local code 
// export const environment = {
//     production: false,
//     apiUrl: 'http://localhost:50444/api/',
//     rojApiUrl: 'http://localhost:52609/api/',
//     signalrHub: 'http://localhost:50444/signalr',
//     DomainName: 'localhost',
//     mrigsUrl:'http://webapi.ruralskills.in/',
//   };


 // for test server deployement

export const environment = {
 production: true,
 apiUrl: 'http://35.154.38.47/rojgaar_admin/',
 //apiUrl: 'http://localhost:5000/api/',
 ysUrl: 'https://vlw49m7uq9.execute-api.ap-south-1.amazonaws.com/Prod/api/',
 //rojApiUrl: 'http://localhost:50446/api/',
 signalrHub: 'https://vlw49m7uq9.execute-api.ap-south-1.amazonaws.com/signalr',
 DomainName: '35.154.38.47',
};
