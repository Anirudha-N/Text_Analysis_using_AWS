# Text_Analysis_using_AWS
Let's analyze twitter sentiments.This project uses Twitter API and AWS kinesis,AWS kinesis Firehose,Comprehend,Lambda,S3 and DynamoDB

# Project Flow

1.Collect your Twiteer API Keys.

2.Collect your AWS account keys.

3.Create S3 bucket.

4.Configure Kinesis.

5.Using configured Kinesis,create a Firehose stream with destination as created S3 bucket.

6.Install Twitter API and aws-sdk by using npm.

7.Kinesis.js code will set connection between Titter API and AWS.It will make connection between Twitter API and Firehose stream.Data Will get dumped into S3 bucket.

8.Create DynamoDB tables 'RawTweets' -(It will consists tweet id,Timestamp,Text) and 'TwitterSentiments' -(It will consists 
Tweets Sentiments'

9.Create two lambda jobs:
    
    1.ExtractTweets:Trigger S3 bucket to this Lambda function.This function will conevert twitter raw files from S3 into DynamoDB table RawTweets.The function is written in S3_Dynamo.js file.Environment Variables are - DYNAMODB_TABLE = RawTweets
    
    2.ExtractSentiments:Trigger DynamoDB table RawTweets to this Lambda function.This function will analyze sentiments by using AWS Comprehend for each record in RawTweets table .The function is written in index.js file.Environment Variables are - DYNAMODB_TABLE = twitterSentiment.

10.Run Kinesis.js.After some time you will see data in S3 bucket.First lambda function will get executed after it finds data in S3 bucket.Second Lambda function will get executed when we will get records in DynamoDB RawTweets table. 

Please find Work Flow image in repo to get overview of project.If you have some queries contact me at aninile9495@gmail.com 
