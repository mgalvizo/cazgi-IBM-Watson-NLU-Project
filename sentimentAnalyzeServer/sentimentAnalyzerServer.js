const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = new express();

app.use(express.static("client"));

const cors_app = require("cors");
app.use(cors_app());

function getNLUInstance() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
  const { IamAuthenticator } = require("ibm-watson/auth");

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2021-03-25",
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });

  return naturalLanguageUnderstanding;
}

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    features: {
      entities: {
        emotion: true,
        limit: 1,
      },
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      // console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2));
      return res.send(analysisResults.result.entities[0].emotion, null, 2);
    })
    .catch((err) => {
      // console.log('error:', err);
      return res.send("Something went wrong " + err);
    });
});

app.get("/url/sentiment", (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    features: {
      entities: {
        sentiment: true,
        limit: 1,
      },
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      // console.log(JSON.stringify(analysisResults.result.entities[0].sentiment, null, 2));
      return res.send(
        analysisResults.result.entities[0].sentiment.label,
        null,
        2
      );
    })
    .catch((err) => {
      // console.log('error:', err);
      return res.send("Something went wrong " + err);
    });
});

app.get("/text/emotion", (req, res) => {
  const analyzeParams = {
    text: req.query.text,
    features: {
      entities: {
        emotion: true,
        limit: 1,
      },
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      // console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2));
      return res.send(analysisResults.result.entities[0].emotion, null, 2);
    })
    .catch((err) => {
      // console.log('error:', err);
      return res.send("Something went wrong " + err);
    });
});

app.get("/text/sentiment", (req, res) => {
  const analyzeParams = {
    text: req.query.text,
    features: {
      entities: {
        sentiment: true,
        limit: 1,
      },
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      // console.log(JSON.stringify(analysisResults.result.entities[0].sentiment, null, 2));
      return res.send(
        analysisResults.result.entities[0].sentiment.label,
        null,
        2
      );
    })
    .catch((err) => {
      // console.log('error:', err);
      return res.send("Something went wrong " + err);
    });
});

let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
