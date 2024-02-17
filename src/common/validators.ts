import { z } from "zod";

export const geneticAlgorithmformSchema = z.object({
    apikey: z.string().min(2, {
      message: "La clave de API debe tener al menos 2 caracteres.",
    }),
    prompt1: z.string().min(2, {
      message: "El texto de entrada debe tener al menos 2 caracteres.",
    }),
    prompt2: z.string().min(2, {
        message: "El texto de entrada debe tener al menos 2 caracteres.",
      }),
    file: z.string().min(2, {
        message: "El nombre del archivo debe tener al menos 2 caracteres.",
    }),
    messages: z.array(z.object({role: z.string() , content: z.string() })).optional(),
});

export const rephraseRespondSchema = z.object({
    apikey: z.string().min(2, {
      message: "La clave de API debe tener al menos 2 caracteres.",
    }),
    prompt: z.string().min(2, {
      message: "El texto de entrada debe tener al menos 2 caracteres.",
    }),
    messages: z.array(z.object({role: z.string() , content: z.string() })).optional(),
});