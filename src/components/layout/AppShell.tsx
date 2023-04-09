import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
