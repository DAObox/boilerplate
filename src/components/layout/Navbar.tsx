import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  return (
    <header className="bg-gradient-to-r from-sky-800 to-cyan-600 pb-24">
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between px-8 py-4">
        <div />
        <ConnectButton />
        <div className="w-full border-white border-opacity-20 py-4" />
      </div>
    </header>
  );
}
