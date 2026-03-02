import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {

 try {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: openai('gpt-4o-mini'), 
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
    }
    catch(error){
     console.error('Error processing chat request:', error);
     return new Response('Failed to process chat request', { status: 500 });
    }
 
}