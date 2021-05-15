const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const dbclient = new DynamoDBClient({ region: "us-west-2" });



async function getAWS(params) {
  try {
    const data = await dbclient.send(new GetItemCommand(params));
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function putAWS(params) {
  try {
    const data = await dbclient.send(new PutItemCommand(params));
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function verifyAccount(accountInfo) {
  const params = {
    TableName: "Customers",
    Key: { email: { S: accountInfo.email } },
  };
  const data = await getAWS(params);
  // console.log(data);
  //if data is empty
  return data.Item === undefined;
}

function createAccountDBEntry(accountInfo) {
  const params = {
    TableName: "Customers",
    Item: {
      firstName: {
        S: accountInfo.firstName,
      },
      lastName: {
        S: accountInfo.lastName,
      },
      email: {
        S: accountInfo.email,
      },
      password: {
        S: accountInfo.password,
      },
    },
  };
  putAWS(params);
}



module.exports = { runApi, createAccountDBEntry, verifyAccount};
