import Link from "next/link";
import Image from "next/image";
import LoginButton from "../login-button/login-button";

const HeaderLanding = () => {
  return (
    <header className="flex items-center justify-between px-8 text-sm text-primary-foreground">
      <div>
        <Image src="/images/logo.png" alt="QB3 Logo" width={180} height={180} />
      </div>
      <nav className="space-x-8 [&>a]:text-lg [&>a]:text-primary-foreground/60 [&>a]:hover:text-primary-foreground">
        <Link href="/dispatch" legacyBehavior>
          <a>Start Dispatching</a>
        </Link>
        <Link href="/provide-storage" legacyBehavior>
          <a>Earn with Storage</a>
        </Link>
        <Link href="/buy-tokens" legacyBehavior>
          <a>Join the Network (Buy QB3)</a>
        </Link>
      </nav>
      <div className="space-x-4">
        <LoginButton />
      </div>
    </header>
  );
};

export default HeaderLanding;
