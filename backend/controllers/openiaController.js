const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


exports.summaryController = async (req, res) => {
  try {
    const {text} = req.body;
    const  data  = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};





exports.paragraphController = async (req, res) => {

  try {
    const { text } = req.body;
    const data= await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      // model: "text-davinci-003",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      // console.log(data)
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};





exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const  data = await openai.completions.create({
      // model: "text-davinci-003",
      model: "gpt-3.5-turbo-instruct",  
      prompt: `Answer the question as Yoda from Star Wars would. Use Yoda's unique speaking style, which often involves reversed or fragmented syntax.
      Example:
      Me: 'What is your name?'
      Yoda: 'Yoda, my name is.'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};



exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};







exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: `generate a description for a scifi image of ${text}`,
      n:1,
      size:'512x512',
    });
    if (response) {
      // console.log(response.data[0]);
      if (response.data[0].url) {
        return res.status(200).json(response.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
