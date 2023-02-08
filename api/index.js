const express = require("express");
const {Configuration, OpenAIApi} = require("openai");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const configuration = new Configuration({apiKey: "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"});
const openai = new OpenAIApi(configuration);

app.get('/api', (req, res) => {
    const path = `/api/item/v4`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
  });

app.post("/question", async (req, res) => {
    const { prompt } = req.body;
    console.info(prompt)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    console.info(response.data)
    res.json(response.data)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
