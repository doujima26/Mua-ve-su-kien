"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractAddress, contractAbi } from "../constants/contract";
import { motion } from "framer-motion";
import { useState } from "react";

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
        whileHover={{ scale: isPending || isLoading || !isConnected ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPending || isLoading || !isConnected}
        onClick={handleMint}
        className={`px-8 py-4 rounded-2xl text-lg font-semibold tracking-wide transition-all duration-300 
          ${
            isPending || isLoading || !isConnected
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-[0_0_25px_rgba(255,165,0,0.6)] text-white"
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
          <p className="text-green-400 font-medium">
            🎉 Vé NFT của bạn đã được đúc thành công!{" "}
            <a
              href={`https://celo-sepolia.blockscout.com/tx/${data}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange-400 hover:text-orange-300 font-semibold"
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
      {/* Hiệu ứng gradient động */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-400/10 to-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Lớp mờ nền */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md shadow-lg border-b border-orange-500/30">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 flex items-center gap-2">
          🎓 Phenikaa NFT Event
        </h1>
        <div className="bg-white/10 rounded-xl px-3 py-1 shadow-md hover:bg-white/20 transition">
          <ConnectButton />
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 rounded-3xl p-10 max-w-3xl text-center shadow-2xl border border-orange-400/30 backdrop-blur-md"
        >
          <motion.img
            src="/event-banner.png"
            alt="Sự kiện Chào tân K19"
            className="rounded-2xl mb-8 shadow-lg border border-orange-400/40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />

          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 drop-shadow-md">
            Vé Chào Tân K19 - Đại học Phenikaa
          </h2>

          <p className="text-gray-200 mb-10 leading-relaxed text-lg">
            🌟 Chào mừng các tân sinh viên K19!  
            Đây là chiếc vé NFT độc quyền để tham dự sự kiện **Chào tân 2025**.  
            Kết nối ví Celo Sepolia và nhận vé kỹ thuật số ngay hôm nay!
          </p>

          <MintButton />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-400 text-sm bg-black/50 backdrop-blur-sm border-t border-orange-400/20">
        © 2025 <span className="text-orange-400 font-semibold">Phenikaa NFT Ticket</span>  
        | Built with ❤️ on <span className="text-yellow-400 font-medium">Celo</span>
      </footer>
    </div>
  );
}
