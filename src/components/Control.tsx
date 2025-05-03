interface ButtonProps {
  name: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ name, onClick, children }: ButtonProps) {
  return (
    <button
      className="h-12 px-4 text-[1.1rem] border-4 border-white flex items-center gap-4 bg-white text-[#494949] shadow-md font-medium cursor-pointer hover:bg-[#E6E9ED] hover:text-black hover:border-[#E6E9ED] rounded-full"
      onClick={onClick}
    >
      {children} {name}
    </button>
  );
}
