process.on('unhandledRejection', console.dir);

const fetch = require('node-fetch');
const fs = require('fs');
const url = "http://localhost:8080/webplatform/myresource/upload";

/* wrong */
// const filepath = "D:\apache_MVM_event2.zip";
/* correct */
const filepath = "D:/apache_MVM_event2.zip";

const FormData = require('form-data');
const form = new FormData();
form.append('file', fs.createReadStream(filepath));
// form.append('blah', 42);

fetch(url, {
    method: 'POST',
    body: form
})
// .then(res => res.text())
// .then(text => console.log(text));

.then(res => res.json())
.then(json => console.log(json));
// .then(response => response.json())
// .catch(error => console.error('Error:', error))
// .then(response => console.log('Success:', JSON.stringify(response)));

/* success 
const options = {
	method: 'POST',
  body: form
  // ,
	// headers: {
  //   ...form.getHeaders()
  // }
};

fetch(url, options)
	.then(res => res.text())
	.then(text => console.log(text));
*/

/*
fetch(url, {
  method: 'POST',
  body: form,
  headers: {
    'Content-Type': 'multipart/form-data'
    // ,'Authorization': authParam
  }
})
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(myJson) {
  //   console.log(JSON.stringify(myJson));
  // });
  .then(res => res.text())          // convert to plain text
  .then(text => console.log(text)) ;
*/

/** success
const axios = require('axios')

  const file = fs.createReadStream(filepath)
  form.append('file', file)
  const config = {
    headers: {
      // 'X-AUTH-Token': auth_token,
      // 'X-API-Token': env.API_TOKEN,
      ...form.getHeaders()
    },
  }
  const result = axios.post(url, form, config)
 */