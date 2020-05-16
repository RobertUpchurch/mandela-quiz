/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageMandelaDBName = process.env.STORAGE_MANDELADB_NAME
var storageMandelaDBArn = process.env.STORAGE_MANDELADB_ARN

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = process.env.STORAGE_MANDELADB_NAME;

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get("/scores/getScores", (req, res) => {
  const params = {
    "TableName": tableName,
    "KeyConditionExpression": "pk = :score1",
    "ExpressionAttributeValues": {
      ":score1": "score"
    }
  }

  dynamodb.query(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({message: "Unable to Get Scores", err: err})
    } else {
      res.statusCode(200);
      res.json({data: data, message: "success getting scores"})
    }
  })
});

app.post("/scores/addScore", (req, res) => {
  const params = {
    "TableName": tableName,
    "Item": {
      "pk": "score",
      "sk": req.body.sk,
      "name": req.body.name,
      "score": req.body.score
    }
  }

  dynamodb.put(params, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err});
    } else{
      res.statusCode = 200;
      res.json({message: 'success recording', data: data })
    }
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
