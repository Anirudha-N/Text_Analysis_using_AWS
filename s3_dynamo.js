const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event,context,callback) => {
    
    //Building S3 Params string.Here we are assuming only 1 record per trigger
    let s3Params ={
        Bucket: event.Records[0].s3.bucket.name,
        Key: event.Records[0].s3.object.key
    };
    
    //connecting to Dyanamo DB using environment variable
    let dynParams={
      TableName: process.env.DYNAMODB_TABLE,
      Item:{}
    };
    
    //moving data from s3 files to dyanamo db table
    s3.getObject(s3Params,function(err,data){
       if(err){
           callback(err);
       } 
       else{
           let dynamoData= data.Body.toString().split('|');
           dynamoData.pop();
           
           dynamoData.forEach(function(row){
              dynParams.Item = JSON.parse(row);
              docClient.put(dynParams,function(err,data){
                 if(err) callback(err);  
                  else callback(null,data);
              });
           });
           
       }    
        
        
    });
    
};
