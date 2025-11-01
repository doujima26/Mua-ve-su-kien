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
        whileHover={{ scale: isPending || isLoading || !isConnected ? 1 : 1.06 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPending || isLoading || !isConnected}
        onClick={handleMint}
        className={`relative px-10 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-500 overflow-hidden
          ${
            isPending || isLoading || !isConnected
              ? "bg-gray-600/70 cursor-not-allowed text-gray-300"
              : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white shadow-[0_0_25px_rgba(255,120,0,0.5)] hover:shadow-[0_0_40px_rgba(255,180,70,0.8)]"
          }`}
      >
        {getButtonText()}
        <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-500 blur-md"></span>
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
              className="underline text-yellow-400 hover:text-yellow-300 font-semibold"
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
      className="min-h-screen text-white flex flex-col relative overflow-hidden font-sans"
      style={{
        backgroundImage: "url('/chaotan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hiệu ứng ánh sáng động */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-yellow-400/10 to-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Lớp mờ nền */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-yellow-400/20 shadow-[0_0_25px_rgba(255,200,50,0.2)]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 tracking-wide drop-shadow-lg">
          🎶 Phenikaa NFT Event
        </h1>
        <div className="bg-white/10 rounded-2xl px-4 py-2 shadow-md hover:bg-white/20 transition">
          <ConnectButton />
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 rounded-3xl p-10 max-w-3xl text-center shadow-[0_0_50px_rgba(255,180,0,0.2)] border border-yellow-400/30 backdrop-blur-lg"
        >
          <motion.img
            src="/event-banner.png"
            alt="Sự kiện Chào tân K19"
            className="rounded-2xl mb-8 shadow-[0_0_30px_rgba(255,150,0,0.4)] border border-yellow-400/40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />

          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 drop-shadow-[0_0_25px_rgba(255,180,100,0.6)]">
            Sự kiện Chào tân K19 - Phenikaa University
          </h2>

          <p className="text-gray-200 mb-10 leading-relaxed text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            🌟 Chào mừng các tân sinh viên K19!  
            Đây là chiếc vé NFT <span className="text-yellow-300 font-semibold">độc quyền</span> 
            để tham dự đại sự kiện <span className="text-orange-400 font-semibold">Chào tân 2025</span>.  
            Kết nối ví <span className="text-green-300 font-semibold">Celo Sepolia</span> và nhận vé kỹ thuật số của bạn ngay hôm nay!
          </p>

          <MintButton />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-400 text-sm bg-black/60 backdrop-blur-md border-t border-yellow-400/20">
        © 2025 <span className="text-yellow-400 font-semibold">Phenikaa NFT Ticket</span>  
        | Built with ❤️ on <span className="text-orange-400 font-medium">Celo</span>
      </footer>
    </div>
  );
}
