import Image from "next/image";
import LoginButton from "../login-button/login-button";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 text-sm">
      <div className="">
        <Image src="/images/logo.png" alt="QB3 Logo" width={200} height={200} />
      </div>
      <nav className="space-x-8 text-white [&>a]:hover:text-[#67a5fc]">
        <a href="#">Start Dispatching</a>
        <a href="#">Earn with Storage</a>
        <a href="#">Join the Network (Buy QB3)</a>
      </nav>

      <div className="space-x-4 text-xs">
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;
