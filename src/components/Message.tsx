import Image from "next/image";

interface MessageProps {
  children: React.ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
  name?: string;
  img_url?: string;
}

function LeftMessage({ children, dangerouslySetInnerHTML, name, img_url }: MessageProps) {
  return (
    <div className="w-full h-fit flex gap-4">
      <div className="text-black flex flex-col items-center justify-start font-semibold">
        <Image
          className="text-center rounded-full object-cover"
          width={60}
          height={60}
          alt={name || "user"}
          src={img_url || "/images/foto_perfil.png"}
        />
        <span className="text-xs mt-1">{name}</span>
      </div>
      <div className="bg-[#E6E9ED] max-w-[35rem] w-max px-4 py-5 rounded-[0px_22px_22px_22px] text-[1.3rem] text-[#494949] flex flex-wrap items-start justify-center break-words">
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
      <div className="bg-[#06064A] text-white rounded-[22px_0_22px_22px] flex flex-col px-4 py-5 gap-4 break-all">
        {dangerouslySetInnerHTML ? (
          <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        ) : (
          <p className="leading-[1.6rem] text-[1.3rem] w-full text-justify">{children}</p>
        )}
      </div>
    </div>
  );
}

export { LeftMessage, RightMessage };