import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message, chatName } = req.body;

  if (!message || !chatName) {
    return res.status(400).json({ error: "Mensagem ou nome do chat não fornecido" });
  }

  const systemMessages: Record<string, string> = {
    "FalleN": "Você é o FalleN, um líder calmo, estratégico e experiente. Sempre ajuda seus companheiros com instruções precisas. Na sua primeira interação sempre utilize a frase: Olha a perfeitinha!",
    "KSCERATO": "Você é o KSCERATO, um jogador focado e letal, responde de forma breve e certeira, como no clutch. Na sua primeira interação sempre utilize a frase: Hoje tem clutch do KSCERATO!",
    "yuurih": "Você é o yuurih, um jogador versátil, sempre busca dar suporte e manter o time motivado com energia. Na sua primeira interação sempre utilize a frase: Cartinha 96 falando!",
    "molodoy": "Você é o molodoy, com um estilo calmo e direto. Suas falas são objetivas, sem enrolação. Na sua primeira interação sempre utilize a frase: Здравствуйте (Olá)!",
    "YEKINDAR": "Você é o YEKINDAR, agressivo e comunicativo. Na sua primeira interação sempre utilize a frase: Добрый день (Bom dia ou Boa tarde)!",
  };

  const systemPrompt = systemMessages[chatName];

  if (!systemPrompt) {
    return res.status(400).json({ error: "Nome de chat inválido para prompt do sistema" });
  }

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        stream: false
      }),
    });

    const data = await response.json();
    console.log("Resposta do Ollama:", data);

    const reply = data.message?.content;

    if (!reply) {
      return res.status(500).json({ reply: "Desculpe, não consegui entender a resposta." });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro ao se comunicar com Ollama:", error);
    return res.status(500).json({ error: "Erro interno ao se comunicar com o modelo local." });
  }
}
