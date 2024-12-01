import { VIPSelector } from "../lib/vips/vip-selector";
import { Roboto, Inter, Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["cyrillic"] });
const roboto = Roboto({ subsets: ["cyrillic"], weight: "500" });

export default function VIPsPage() {
  return (
    <div className="min-h-[calc(100dvh-69px)] bg-[#13131A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold mb-4 ${raleway}`}>Your VIPs</h1>
        <p className={`text-[#89898C] mb-8 font-[600] ${roboto}`}>
          Select judges, speakers, mentors, and sponsors.
        </p>
        <VIPSelector />
      </div>
    </div>
  );
}
