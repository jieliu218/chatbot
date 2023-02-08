const express = require("express");
const {Configuration, OpenAIApi} = require("openai");
const bodyParser = require("body-parser");

const app = express();
const port = 3006;
app.use(bodyParser.json());

const configuration = new Configuration({apiKey:  process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);


app.post("/api/question", async (req, res) => {
    const { prompt } = req.body;
    console.info(prompt)
    console.info('model: "text-davinci-003"')
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
