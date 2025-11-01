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
        className={`px-10 py-4 text-xl font-bold rounded-full tracking-wide shadow-md transition-all duration-300 
          ${
            isPending || isLoading || !isConnected
              ? "bg-gray-500 cursor-not-allowed text-gray-200"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-[0_0_35px_rgba(255,170,0,0.7)] text-black"
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
      {/* Overlay mờ tối để nổi chữ */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md shadow-lg border-b border-orange-400/30">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-[0_0_10px_rgba(255,170,0,0.6)]">
          🎓 Phenikaa NFT Event
        </h1>
        <div className="bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full px-4 py-1 text-black font-semibold shadow-md hover:shadow-[0_0_15px_rgba(255,200,0,0.6)] transition">
          <ConnectButton />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black/70 border border-yellow-400/30 backdrop-blur-md p-10 rounded-3xl max-w-4xl w-full text-center shadow-[0_0_40px_rgba(255,180,0,0.3)]"
        >
          <motion.img
            src="/event-banner.png"
            alt="Sự kiện Chào tân K19"
            className="rounded-2xl mb-8 shadow-lg border border-yellow-400/50 mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          />

          <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-[0_0_20px_rgba(255,200,0,0.8)]">
            Vé Chào Tân K19 - Đại học Phenikaa
          </h2>

          <p className="text-gray-100 mb-10 text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
            🌟 Chào mừng các tân sinh viên K19!  
            Đây là chiếc vé NFT độc quyền để tham dự **Sự kiện Chào tân 2025**.  
            Hãy kết nối ví Celo Sepolia của bạn và nhận vé kỹ thuật số ngay hôm nay!
          </p>

          <MintButton />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-300 text-sm bg-black/50 backdrop-blur-sm border-t border-orange-400/20">
        © 2025 <span className="text-orange-400 font-semibold">Phenikaa NFT Ticket</span>  
        | Built with ❤️ on <span className="text-yellow-400 font-medium">Celo</span>
      </footer>
    </div>
  );
}
