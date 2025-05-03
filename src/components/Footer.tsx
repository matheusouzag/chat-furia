import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
      <footer className="w-full bg-white p-10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-4 mb-4">
            <a href="https://www.facebook.com/furiagg" target="_blank" className="text-black"><FaFacebook size={24} /></a>
            <a href="https://www.instagram.com/furiagg/" target="_blank" className="text-black"><FaInstagram size={24} /></a>
            <a href="https://www.linkedin.com/company/furiagg/posts/?feedView=all" target="_blank" className="text-black"><FaLinkedin size={24} /></a>
          </div>
          <p className="text-sm text-black mt-4">© {new Date().getFullYear()} Desenvolvido por Matheus Souza.</p>
        </div>
      </footer>
  );
}

export { Footer };