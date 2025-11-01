"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractAddress, contractAbi } from "../constants/contract";
import { motion } from "framer-motion";

function MintButton() {
  const { address, isConnected } = useAccount();
  const { data, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: data });

  const handleMint = () => {
    if (!isConnected) return;
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "mintTicket",
      args: [address!],
    });
  };

  const getButtonText = () => {
    if (isPending) return "⏳ Đang chờ xác nhận...";
    if (isLoading) return "🔄 Đang xử lý giao dịch...";
    if (isSuccess) return "✅ Đúc thành công!";
    return "🎟️ Mua vé ngay";
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPending || isLoading || !isConnected}
        onClick={handleMint}
        className={`px-10 py-4 text-2xl font-bold rounded-full tracking-wide shadow-lg transition-all duration-300 
          ${
            isPending || isLoading || !isConnected
              ? "bg-gray-500 cursor-not-allowed text-gray-200"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-[0_0_40px_rgba(255,200,0,0.8)] text-black"
          }`}
      >
        {getButtonText()}
      </motion.button>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center"
        >
          <p className="text-green-400 font-medium text-lg">
            🎉 Vé NFT đã được đúc thành công!{" "}
            <a
              href={`https://celo-sepolia.blockscout.com/tx/${data}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange-400 hover:text-yellow-300 font-semibold"
            >
              Xem giao dịch
            </a>
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen text-white flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/chaotan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-yellow-400/30 shadow-lg">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-[0_0_10px_rgba(255,200,0,0.7)]">
          🎓 Phenikaa NFT Event
        </h1>
        <div className="bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full px-4 py-1 text-black font-semibold shadow-md hover:shadow-[0_0_15px_rgba(255,200,0,0.6)] transition">
          <ConnectButton />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-orange-500/90 border border-yellow-300/60 backdrop-blur-md p-10 rounded-3xl max-w-4xl w-full text-center shadow-[0_0_40px_rgba(255,150,0,0.5)]"
        >
          <h2 className="text-6xl font-extrabold mb-6 text-white drop-shadow-[0_0_25px_rgba(0,0,0,0.7)]">
            Sự kiện Chào tân K19
          </h2>

          <div className="bg-orange-400/80 rounded-2xl inline-block px-8 py-6 mb-10 border border-yellow-200 shadow-[0_0_25px_rgba(255,150,0,0.7)]">
            <p className="text-white text-2xl leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]">
              🌟 Chào mừng các tân sinh viên K19!  
              Đây là chiếc vé NFT độc quyền để tham dự  
              <span className="text-yellow-100 font-bold"> Sự kiện Chào tân 2025 </span>.  
              Hãy kết nối ví Celo Sepolia của bạn và nhận vé kỹ thuật số ngay hôm nay!
            </p>
          </div>

          <MintButton />
        </motion.div>
      </main>

      <footer className="relative z-10 text-center py-6 text-gray-300 text-sm bg-black/60 backdrop-blur-sm border-t border-orange-400/20">
        © 2025 <span className="text-orange-400 font-semibold">Phenikaa NFT Ticket</span>  
        | Built with ❤️ on <span className="text-yellow-400 font-medium">Celo</span>
      </footer>
    </div>
  );
}
