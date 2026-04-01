import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage, SystemMessage} from "langchain"
const geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralmodel= new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
})


export async function generateResponse(message){
  const response = await geminimodel.invoke([new HumanMessage(message)])

  return response.text;

}


export async function generateTitle(message){
  const response = await mistralmodel.invoke([
    new SystemMessage("you are a helpful assistant that generates a title for a given text user will provide you with a text and you will generate a title for it that captures the essence of the text and is concise and engaging in 2-5 words giving user a quick overview of the content"),
    new HumanMessage(`Generate a title for this text: ${message}`)
  ])

  return response.text;
}



