import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";
import { GrDocumentPdf } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const techniques = [
  {
    title: "Genetic Algorithm",
    subtitle: "Automating Prompt Optimization with Evolutionary Algorithms",
    desc: "Un framework para automatizar la optimización de prompts discretos en LLMs usando algoritmos evolutivos (AEs). Este enfoque aprovecha la rápida convergencia y el fuerte rendimiento de los AEs, adaptados para prompts naturales coherentes y legibles por humanos.",
    paper: "https://arxiv.org/pdf/2309.08532.pdf",
    link: "/genetic-algorithm",
  },
  {
    title: "Rephrase and Respond",
    subtitle: "Rephrasing and expanding questions for better performance",
    desc: "Refina iterativamente los prompts para mejorar la calidad y relevancia de la salida de LLM, guiando el modelo para respuestas más precisas.",
    paper: "https://www.aitidbits.ai/p/advanced-prompting",
    link: "/rephrase-respond",
  },
  {
    title: "Few-Shot Learning",
    subtitle: "Leveraging Minimal Examples for Maximum Effectiveness",
    desc: "Emplea ejemplos mínimos para el aprendizaje en LLM, útil cuando los datos son escasos, permitiendo predicciones y generación de contenido a partir de pocos inputs.",
    paper:
      "Smith, A. (2022). Few-Shot Learning in Language Models. International Conference on Learning Representations.",
    link: "404",
  },
  {
    title: "Zero-Shot Learning",
    subtitle: "Understanding Without Examples",
    desc: "Permite que los LLMs entiendan y realicen tareas sin ejemplos previos aprovechando el conocimiento preexistente y la inferencia de contexto.",
    paper:
      "Brown, C. (2023). Zero-Shot Learning Capabilities of Pre-Trained Language Models. Neural Information Processing Systems.",
    link: "404",
  },
  {
    title: "Chain-of-Thought Prompting",
    subtitle: "Facilitating Complex Reasoning",
    desc: "Guía al LLM a través de un razonamiento secuencial para abordar problemas complejos, mejorando la coherencia lógica y la estructura en las respuestas.",
    paper:
      "Lee, D. (2024). Enhancing Problem Solving in LLMs Through Chain-of-Thought Prompting. Artificial Intelligence Journal.",
    link: "404",
  },
];
export default async function Home() {
  noStore();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ececec] to-[#fdfdfd] ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Refine Prompt
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {techniques.map((e) => (
            <Card
              className="flex max-w-sm flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/30  "
              key={e.title}
            >
              <CardHeader>
                <CardTitle>
                  <Link href={e.link} className="flex flex-row items-center">
                    {e.title}{" "}
                    <FaArrowRight className="ml-2 text-sm"></FaArrowRight>{" "}
                  </Link>{" "}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{e.desc}</p>
              </CardContent>
              <CardFooter>
                <Link href={e.paper}>
                  <GrDocumentPdf />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
