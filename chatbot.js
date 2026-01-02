import Groq from "groq-sdk";
import NodeCache from "node-cache";
import { tavily } from "@tavily/core";
import dotenv from "dotenv";

dotenv.config();

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }); //cache for 24 hour

export async function generate(userMessage, threadId) {
  const baseMessages = [
    {
      role: "system",

      content: `You are a smart personal assistant who answers the asked questions

          you have access to foolowing tool:

          1. webSearch({query}:{query:string}) search the latest information on the web.
          current date and time ${new Date().toUTCString()}`,
    },

    /*  {
      role: "user",

      content: "when was the iphone 16 launched?",
    }, */
  ];

  const messages = cache.get(threadId) ?? baseMessages;

  messages.push({
    role: "user",
    content: userMessage,
  });

  const MAX_RETRIES = 10;
  const count = 0;

  while (true) {

    if (count >= MAX_RETRIES) {
      return "Sorry, I'm unable to process your request at the moment.";
    }
    count++;

    const completions = await groq.chat.completions.create({
      temperature: 0.19,
      model: "meta-llama/llama-4-scout-17b-16e-instruct",

      messages: messages,

      tools: [
        {
          type: "function",

          function: {
            name: "webSearch",

            description:
              "Search the latest informaton and realtime data on the internet",

            parameters: {
              // JSON Schema object

              type: "object",

              properties: {
                query: {
                  type: "string",

                  description: "The search query to perfrom search on the web",
                },
              },

              required: ["query"],
            },
          },
        },
      ],

      tool_choice: "auto",
    });

    messages.push(completions.choices[0].message);

    const toolCalls = completions.choices[0].message.tool_calls;

    if (!toolCalls) {
      //here we end the chatbot response

      cache.set(threadId, messages);
      console.log("Final messages:", messages);
      return completions.choices[0].message.content;
    }

    for (const tool of toolCalls) {
      //console.log("Invoking tool:", tool);

      const functionName = tool.function.name;
      const functionParams = tool.function.arguments;

      if (functionName === "webSearch") {
        const toolResult = await webSearch(JSON.parse(functionParams));

        // console.log("Tool result:", toolResult);

        messages.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: toolResult,
        });
      }
    }
  }
}

async function webSearch({ query }) {
  //here we will do tavily api call

  console.log("calling web search ");

  const response = await tvly.search(query);
  //console.log("tavily response:", response);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n");

  return finalResult;
}
