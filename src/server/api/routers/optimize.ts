import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { geneticAlgorithmformSchema, rephraseRespondSchema } from "@/common/validators";
import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const optimizeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(geneticAlgorithmformSchema)
    .query(async ({ input }) => {
      console.log(input);

      const openai = new OpenAI({apiKey: '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'});

      const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}],
        model: "gpt-3.5-turbo",
      });
    
      return {
        result: completion.choices[0],
      };
    }),

  geneticAlgorithm: publicProcedure
    .input(geneticAlgorithmformSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      const openai = new OpenAI({apiKey: input.apikey});

      const context = input.messages ?? [];

      const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "vas a ejecutar la optimización de prompts tu respuesta son solo una iteración a la vez, vas a recibir un patrón iterar eso "},
          {"role": "user", "content": `Por favor, sigue las instrucciones paso a paso para generar un mejor prompt. Itera  1. Cruza los siguientes prompts y genera un nuevo prompt: \n Prompt 1: ${input.prompt1} Prompt 2: ${input.prompt2} \n 2. Muta el prompt generado en el Paso 1 y genera un prompt final entre corchetes con <prompt> y </prompt>.`},
         ...(context as ChatCompletionMessageParam[]),
        ],
        model: "gpt-3.5-turbo",
      });
      
      return {
        answer: completion.choices[0],
      };
    }),
  
  rephraseRespond: publicProcedure
    .input(rephraseRespondSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      const openai = new OpenAI({apiKey: input.apikey});

      const context = input.messages ?? [];

      const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "Eres un optimizador de prompts, se te brindara un prompt y lo reformularas y mejoras para que sea conscisa, claro y brindas en resultado dentro del tag [prompt] [prompt]"},
          {"role": "user", "content": `${input.prompt}`},
         ...(context as ChatCompletionMessageParam[]),
        ],
        model: "gpt-3.5-turbo",
      });
      
      return {
        answer: completion.choices[0],
      };
    }),
});
