import RootLayout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <RootLayout home={true}>
      <div className="text-3xl font-bold mb-10">Uncountable Experiments</div>
      <div className="flex flex-row gap-5">
        <Link href="/experiments">
          <div className="w-64 h-64 bg-slate-700 flex flex-col items-center justify-center gap-4 rounded-lg cursor-pointer hover:scale-105 transition-all">
            <div>Data</div>
            <div className="mx-3 rounded-lg overflow-hidden"> 
            <img src="graph.png"/></div>
          </div>
        </Link>
        <Link href="/analysis">
          <div className="w-64 h-64 bg-slate-700 flex flex-col items-center justify-center gap-4 rounded-lg cursor-pointer hover:scale-105 transition-all">
            <div>Analysis</div>
            <div className="mx-3 rounded-lg overflow-hidden"> 
            <img src="graph_v2.png"/></div>
          </div>
        </Link>
      </div>
    </RootLayout>
  );
}
