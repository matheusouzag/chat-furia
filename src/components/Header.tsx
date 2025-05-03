import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Header() {
    return (
        <header className="w-full bg-white">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex py-2">
              <h1 className="text-xl font-bold hidden">FURIA</h1>
              <a href="https://www.furia.gg/"><img className="max-w-[100px]" src="/images/logo-furia.png" /></a>
            </div>
          </div>
        </header>
    );
  }
  
  export { Header };