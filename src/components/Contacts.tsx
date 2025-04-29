import Image from "next/image";

interface ContactProps {
    name: string;
    description: string;
    img_url: string;
  }

export default function Contacts({name, description, img_url,
} : ContactProps){
  return (
    <div
      className="flex items-center justify-between py-2 px-4 cursor-pointer border-b-2 border-gray hover:bg-[#E6E9ED] relative">
      <div className="flex items-center">
        <Image
          className="rounded-full"
          src={img_url}
          alt="user image"
          width={80}
          height={80}
        />
        <div className="ml-4">
          <h3 className="text-black">{name}</h3>
          <h5 className="text-[#494949]">{description}</h5>
        </div>
      </div>
    </div>
  );
}
