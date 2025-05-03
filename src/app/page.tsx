"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import Contacts from "@/components/Contacts";
import { Button } from "@/components/Control";
import { GoPaperclip } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { HiPaperAirplane } from "react-icons/hi";
import { LeftMessage, RightMessage } from "@/components/Message";

interface Message {
  text: string;
  sender: "left" | "right";
  name?: string;
  img_url?: string;
}

interface Contact {
  name: string;
  description: string;
  img_url: string;
  messages: Message[];
}

const aiContacts = [
  {
    name: "FalleN",
    description: "O professor",
    img_url: "/images/fallen.png",
    system: "Você é o Gabriel 'FalleN' Toledo, o Professor. Responda com sabedoria e estratégia como um líder de equipe no CS2.",
  },
  {
    name: "KSCERATO",
    description: "Hoje tem",
    img_url: "/images/kscerato.png",
    system: "Você é o KSCERATO, mantenha respostas frias, objetivas e analíticas, como um rifler decisivo.",
  },
  {
    name: "yuurih",
    description: "Carta 96",
    img_url: "/images/yuurih.png",
    system: "Você é o yuurih. Fale como um jogador agressivo, focado em execução rápida e eficiente.",
  },
  {
    name: "molodoy",
    description: "Promessa furiosa",
    img_url: "/images/molodoy.png",
    system: "Você é o molodoy. Fale como um jovem jogador empolgado, com energia e humildade.",
  },
  {
    name: "YEKINDAR",
    description: "Prime entry",
    img_url: "/images/yekindar.png",
    system: "Você é o YEKINDAR. Fale com inteligência e ousadia, como um lurker que sempre está um passo à frente.",
  },
];

export default function Chat() {
  const [contacts, setContacts] = useState<Contact[]>([{
    name: "Grupo FURIOSO",
    description: "Counter-Strike 2",
    img_url: "/images/foto_perfil.png",
    messages: [
      {
        text: "Bem-vindo! Acompanhe a conversa do grupo abaixo.",
        sender: "left",
        name: "ADMIN",
        img_url: "/images/foto_perfil.png",
      },
    ],
  }]);

  const [createdAIs, setCreatedAIs] = useState(0);
  const [activeChat, setActiveChat] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null); 

  const groupMessages = [
    "VAMO FURIAAA!!! 🔥",
    "Confio no KSCERATO, vai amassar hoje!",
    "PRESENTE",
    "yuurih tá jogando o fino demais!",
    "Vamos atropelar os caras!",
    "A FURIA vem forte nessa!",
    "AQUECE O RUSH B, QUE HOJE TEM FURIA!",
    "FalleN de AWP é arte",
    "KSCERATO é o monstro do clutch!",
    "Esse split da FURIA tá insano!",
    "Essa mirage vai ser nossa",
    "molodoy novo donk?",
    "Ninguém segura a FURIA hoje!",
    "FURIA 2x0 SEM DÓ!",
    "molodoy encaixou como uma luva",
    "É muita bala",
    "Hoje é dia de highlight do yuurih!",
    "FURIA tá voando baixo nesse major!",
    "YEKINDAR hoje ta impossivel",
    "Se ganhar hoje, é final garantida!"
  ];

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [contacts, activeChat]); 

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (activeChat === 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * groupMessages.length);
        const randomMsg = groupMessages[randomIndex];

        setContacts(prev => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            messages: [
              ...updated[0].messages,
              {
                text: randomMsg,
                sender: "left",
                name: "Torcedor",
                img_url: "/images/foto_perfil.png",
              }
            ],
          };
          return updated;
        });
      }, 2000);

      intervalRef.current = interval;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeChat]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { text: inputMessage, sender: "right" };
    const updatedContacts = [...contacts];
    updatedContacts[activeChat].messages.push(userMessage);
    setContacts(updatedContacts);

    const userInput = inputMessage;
    setInputMessage("");

    if (activeChat !== 0) {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userInput,
            chatName: contacts[activeChat].name,
          }),
        });

        const data = await response.json();

        const aiMessage: Message = {
          text: data.reply,
          sender: "left",
          name: contacts[activeChat].name,
          img_url: contacts[activeChat].img_url,
        };

        const newContacts = [...updatedContacts];
        newContacts[activeChat].messages.push(aiMessage);
        setContacts(newContacts);
      } catch (error) {
        console.error("Erro ao se comunicar com a IA:", error);
      }
    }
  };

  const createNewChat = () => {
    if (createdAIs >= 5) return;

    const nextAI = aiContacts[createdAIs];

    const newContact: Contact = {
      name: nextAI.name,
      description: nextAI.description,
      img_url: nextAI.img_url,
      messages: [
        {
          text: `Olá! Aqui quem fala é o ${nextAI.name}. Como posso te ajudar?`,
          sender: "left",
          name: nextAI.name,
          img_url: nextAI.img_url,
        },
      ],
    };

    setContacts(prev => [...prev, newContact]);
    setActiveChat(contacts.length);
    setCreatedAIs(prev => prev + 1);
  };

  return (
    <div>
      <Header />
      <div className="max-h-screen px-20 grid place-items-center bg-no-repeat bg-black py-10">
        <div className="grid grid-cols-[25rem_auto] grid-rows-[calc(100vh-7rem)] gap-8 py-4">
          <div className="flex flex-col self-start items-center justify-start gap-8 h-full">
            <div className="w-full h-12 bg-white rounded-[50vh] flex items-center justify-start overflow-hidden p-[1px]">
              <IoSearchSharp className="text-2xl ml-5 text-[#494949] cursor-pointer" />
              <input
                className="w-full h-12 pl-4 bg-none border-none text-[#494949] outline-none font-semibold text-[1.1rem]"
                type="text"
                placeholder="Pesquisar contatos..."
              />
            </div>
            <div className="w-full h-[calc(100vh-2rem)] flex bg-white rounded-[22px] flex-col shadow-[0_0_10px_rgba(0,0,0,0.4)] pb-1 overflow-y-auto">
              {contacts.map((contact, index) => (
                <div key={index} onClick={() => setActiveChat(index)}>
                  <Contacts
                    name={contact.name}
                    description={contact.description}
                    img_url={contact.img_url}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-[60vw] max-h-screen flex flex-col gap-6">
            <div className="flex items-center justify-end flex-row gap-[1rem]">
              <Button name="Converse com os Jogadores" onClick={createNewChat}>
                <FaPlus className="font-[2rem]" />
              </Button>
            </div>
            <div className="grid grid-rows-[1fr_5rem] w-full h-full bg-white rounded-[22px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.4)]">
              <div
                ref={chatBoxRef}
                className="flex flex-col bg-white p-6 gap-4 overflow-y-auto max-h-[calc(100vh-20rem)]"
              >
                {contacts[activeChat]?.messages.map((msg, i) =>
                  msg.sender === "left" ? (
                    <LeftMessage
                      key={i}
                      name={msg.name}
                      img_url={msg.img_url}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    >
                      {msg.text}
                    </LeftMessage>
                  ) : (
                    <RightMessage key={i}>{msg.text}</RightMessage>
                  )
                )}
              </div>

              <div className="grid grid-cols-[auto_3rem] p-4 gap-4 h-fit">
                <div className="grid grid-cols-[2rem_auto_2rem] items-center text-[#494949] px-4 w-full h-12 rounded-[50vh] bg-[#E6E9ED] gap-4">
                  <VscSmiley className="text-[1.5rem] cursor-pointer" />
                  <input
                    className="h-full bg-transparent border-none text-[#494949] text-[1.2rem] outline-none"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <GoPaperclip className="text-[1.5rem] cursor-pointer" />
                </div>
                <button
                  onClick={sendMessage}
                  className="w-12 h-12 rounded-[50vh] border-none text-[1.2rem] rotate-[45deg] bg-black text-white cursor-pointer flex justify-center items-center"
                >
                  <HiPaperAirplane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
