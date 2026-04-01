import { generateResponse,generateTitle } from "../services/ai.service.js";
export async function sendMessage(req,res){
    const {message} = req.body;
    const result = await generateResponse(message);
    const title = await generateTitle(message);
    console.log(title)
    res.json({
        aiMessage: result,
        title
    })
   
}