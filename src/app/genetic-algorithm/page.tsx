"use client";
import { geneticAlgorithmformSchema } from "@/common/validators";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

export default function GeneticAlgotithm() {
  const [messages, setMessages] = useState<{ content: string; role: string }[]>(
    [],
  );
  const [results, setResults] = useState<string[]>([]);

  const { mutate, isLoading } = api.optimize.geneticAlgorithm.useMutation({
    onSuccess: (response) => {
      setResults((prev) => [...prev, response.answer?.message.content ?? ""]);
      setMessages((prev) => [
        ...prev,
        { content: response.answer?.message.content ?? "", role: "assistant" },
        { content: `siguiente iteración`, role: "user" },
      ]);
    },
  });

  const [values, setValues] =
    useState<z.infer<typeof geneticAlgorithmformSchema>>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof geneticAlgorithmformSchema>>({
    resolver: zodResolver(geneticAlgorithmformSchema),
    defaultValues: {
      apikey: "",
      prompt1: "",
      prompt2: "",
      file: "",
      messages: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof geneticAlgorithmformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate({ ...values, messages });
    setValues(values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#eaeaea] ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-2xl font-bold tracking-tight sm:text-[3rem]">
          Algoritmo Genético
        </h1>
        <Card className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-w-96 space-y-8"
            >
              <FormField
                control={form.control}
                name="apikey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OPENAI_API_KEY</FormLabel>
                    <FormControl>
                      <Input placeholder="sk-...." {...field} />
                    </FormControl>

                    <FormDescription>
                      Tu api key de openai,{" "}
                      <Link href={"https://platform.openai.com/api-keys"}>
                        aqui{" "}
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PROMPT 1</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PROMPT 2</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DATASET</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} rows={10} />
                    </FormControl>
                    <FormDescription>
                      Frases que mejoran el score, el formato es: frase, score
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Optimizar</Button>
            </form>
          </Form>
        </Card>

        {results.map((e, i) => (
          <Card key={i} className="p-2">
            <pre>{e}</pre>
          </Card>
        ))}

        <Button
          onClick={async () => {
            if (!values) {
              return;
            }

            await onSubmit(values);
          }}
        >
          Siguiente Iteración
        </Button>
      </div>
    </main>
  );
}
