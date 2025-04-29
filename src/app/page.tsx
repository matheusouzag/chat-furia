"use client"

import { useState, useEffect } from "react";
import Contacts from "@/components/Contacts";
import { Button } from "@/components/Control";

import { GoPaperclip } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { HiPaperAirplane } from "react-icons/hi";
import { LeftMessage, RightMessage } from "@/components/Message";

export default function Chat() {
  const [contacts, setContacts] = useState([
    {
      name: "Assistente Virtual 1",
      description: "FURIA",
      img_url: "/images/foto_perfil.png",
      messages: [
        {
          text: "Bem-vindo! Qual é a sua dúvida técnica? (1-2):<br />1. top 1<br />2. top 2",
          sender: "left",
        },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState(0);
  const [inputMessage, setInputMessage] = useState("");

  const topics = [
    "topico 1",
    "topico 2"
  ];


  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newContacts = [...contacts];
    const userMessage = { text: inputMessage, sender: "right" };
    newContacts[activeChat].messages.push(userMessage);

    const userChoice = parseInt(inputMessage, 10);

    if (userChoice >= 1 && userChoice <= 6) {
      const supportResponse = {
        text: `Você escolheu a opção ${userChoice}:<br />${topics[userChoice - 1]}<br />Gostaria de saber mais sobre outro tópico? (1-2)`,
        sender: "left",
      };
      newContacts[activeChat].messages.push(supportResponse);
    } else {
      const errorMessage = {
        text: "Por favor, escolha um número válido entre 1 e 2.",
        sender: "left",
      };
      newContacts[activeChat].messages.push(errorMessage);
    }

    setContacts(newContacts);
    setInputMessage("");
  };

  return (
    <>
      <div className="bg-gradient-fundo">
        <div className="max-h-screen px-20 grid place-items-center bg-no-repeat bg-[url('/images/linhas-bg.png')] py-10">
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
              <Contacts
                      name={"primeiro nome"}
                      description={"descrição"}
                      img_url={"/images/foto_perfil.png"}
                    />
              </div>
            </div>
            <div className="w-[60vw] max-h-screen flex flex-col gap-6">
              <div className="flex items-center justify-end flex-row gap-[1rem]">
                <Button name={"Nova Conversa"}>
                  <FaPlus className="font-[2rem]" />
                </Button>
              </div>
              <div className="grid grid-rows-[auto_5rem] w-full h-full bg-white rounded-[22px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.4)]">
                <div className="flex flex-col bg-white p-6 gap-4 overflow-y-scroll">
                  {contacts[activeChat]?.messages.map((msg, i) =>
                    msg.sender === "left" ? (
                      <LeftMessage key={i} dangerouslySetInnerHTML={{ __html: msg.text }}>{msg.text}</LeftMessage>
                    ) : (
                      <RightMessage key={i} dangerouslySetInnerHTML={{ __html: msg.text }}>{msg.text}</RightMessage>
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage(); 
                        }
                      }}
                    />
                    <GoPaperclip className="text-[1.5rem] cursor-pointer" />
                  </div>
                  <button
                    onClick={sendMessage}
                    className="w-12 h-12 rounded-[50vh] border-none text-[1.2rem] rotate-[45deg] bg-azultech text-white cursor-pointer flex justify-center  items-center"
                  >
                    <HiPaperAirplane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
