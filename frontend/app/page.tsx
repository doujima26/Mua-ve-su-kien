"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractAddress, contractAbi } from "../constants/contract";
import { motion } from "framer-motion";

// DÙNG CONFETTI TRÌNH DUYỆT – KHÔNG CẦN NPM
declare global {
  interface Window {
    confetti: any;
  }
}

function MintButton() {
  const { address, isConnected } = useAccount();
  const { data, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: data });

  const handleMint = () => {
    if (!isConnected || isPending || isLoading) return;
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "mintTicket",
      args: [address!],
    });
  };

  // BẮN CONFETTI KHI THÀNH CÔNG
  if (isSuccess && typeof window !== "undefined" && window.confetti) {
    window.confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#f97316", "#fbbf24", "#facc15", "#eab308"],
    });
  }

  const getButtonText = () => {
    if (!isConnected) return "Kết nối ví";
    if (isPending) return "Đang chờ...";
    if (isLoading) return "Đang xử lý...";
    if (isSuccess) return "Thành công!";
    return "Nhận vé NFT";
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.button
        whileHover={isConnected && !isPending && !isLoading && !isSuccess ? { scale: 1.08 } : {}}
        whileTap={isConnected && !isPending && !isLoading && !isSuccess ? { scale: 0.95 } : {}}
        onClick={handleMint}
        disabled={!isConnected || isPending || isLoading || isSuccess}
        className={`relative px-20 py-9 rounded-full text-3xl font-black tracking-widest transition-all duration-500 flex items-center gap-5 overflow-hidden shadow-2xl bg-size-200
          ${!isConnected || isPending || isLoading
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : isSuccess
            ? "bg-emerald-600 text-white"
            : "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black hover:bg-pos-100"
          }`}
      >
        <span className="relative z-10 drop-shadow-2xl">{getButtonText()}</span>
        {(isPending || isLoading) && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
          />
        )}
        <div className="absolute inset-0 bg-white/40 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-full" />
      </motion.button>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-800 border-4 border-emerald-400 rounded-2xl p-7 max-w-md mx-auto shadow-2xl text-center"
        >
          <p className="text-white font-black text-2xl drop-shadow-lg">
            Vé NFT đã đúc thành công!
          </p>
          <a
            href={`https://celo-sepolia.blockscout.com/tx/${data}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-amber-300 underline hover:text-yellow-200 font-bold text-lg"
          >
            Xem giao dịch
          </a>
        </motion.div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* TẢI CONFETTI TỪ CDN */}
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js" defer></script>

      <div
        className="min-h-screen flex flex-col text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/chaotan.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/88" />

        <header className="relative z-10 flex justify-between items-center p-6 md:p-10">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black drop-shadow-2xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-amber-300">
              Phenikaa NFT Event
            </span>
          </motion.h1>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-2.5 rounded-full shadow-2xl">
              <div className="bg-black/90 rounded-full px-4 py-2.5">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        </header>

        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="bg-gradient-to-br from-orange-700 via-amber-600 to-orange-800 p-12 md:p-16 rounded-3xl shadow-2xl border-4 border-amber-400 max-w-5xl w-full"
          >
            <h2 className="text-6xl md:text-8xl font-black text-center mb-12 drop-shadow-2xl text-amber-100">
              Chào Tân K19
              <br />
              <span className="text-4xl md:text-5xl text-yellow-200 font-bold">Sự Kiện 2025</span>
            </h2>

            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-10 md:p-12 rounded-2xl border-4 border-amber-300 shadow-2xl mb-16">
              <p className="text-2xl md:text-3xl text-white font-black text-center leading-relaxed drop-shadow-2xl">
                Chào mừng các tân sinh viên K19!<br />
                Nhận ngay <span className="text-yellow-200">vé NFT độc quyền</span><br />
                Tham dự <span className="text-amber-100 text-3xl md:text-4xl">Sự kiện Chào tân 2025</span>
              </p>
              <p className="text-lg md:text-xl text-amber-100 mt-6 text-center font-bold">
                Kết nối ví <span className="text-yellow-300">Celo Sepolia</span> để nhận vé!
              </p>
            </div>

            <MintButton />
          </motion.div>
        </main>

        <footer className="relative z-10 text-center py-6 bg-black/90 border-t-4 border-amber-600">
          <p className="text-amber-100 font-bold text-lg">
            © 2025 <span className="text-orange-400">Phenikaa NFT Ticket</span> | 
            Built with <span className="text-red-500">❤️</span> on <span className="text-amber-400">Celo Sepolia</span>
          </p>
        </footer>
      </div>
    </>
  );
}