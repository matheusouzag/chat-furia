import Image from "next/image";

interface MessageProps {
  children: React.ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
}

function LeftMessage({ children, dangerouslySetInnerHTML }: MessageProps) {

  return (
    <div className="w-full h-fit flex gap-4">
      <div className="text-black flex flex-col items-center justify-start font-semibold">
        <Image
          className="text-center rounded-full"
          width={60}
          height={60}
          alt={"user"}
          src={`/images/foto_perfil.png`}
        />
      </div>
      <div className="bg-[#E6E9ED] max-w-[35rem] w-max px-4 py-3 rounded-[0px_22px_22px_22px] text-[1.3rem] text-[#494949] flex flex-wrap items-start justify-center break-words">
        {dangerouslySetInnerHTML ? (
          <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        ) : (
          <p>{children}</p>
        )}
      </div>
    </div>
  );
}

function RightMessage({ children, dangerouslySetInnerHTML }: MessageProps) {

  return (
    <div className="flex items-center self-end justify-end max-w-[70%]">
      <div className="bg-[#06064A] text-white rounded-[22px_0_22px_22px] flex flex-col px-4 py-3 gap-4 break-all">
        {dangerouslySetInnerHTML ? (
          <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        ) : (
          <p className="leading-[1.6rem] text-[1.3rem] w-full text-justify ">{children}</p>
        )}
      </div>
    </div>
  );
}

export { LeftMessage, RightMessage };
