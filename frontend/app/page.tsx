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
    if (!isConnected || isPending || isLoading) return;
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "mintTicket",
      args: [address!],
    });
  };

  const getButtonText = () => {
    if (!isConnected) return "Kết nối ví để nhận vé";
    if (isPending) return "Đang chờ xác nhận...";
    if (isLoading) return "Đang xử lý...";
    if (isSuccess) return "Đúc thành công!";
    return "Nhận vé NFT ngay";
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.button
        whileHover={isConnected && !isPending && !isLoading && !isSuccess ? { scale: 1.06 } : {}}
        whileTap={isConnected && !isPending && !isLoading && !isSuccess ? { scale: 0.97 } : {}}
        onClick={handleMint}
        disabled={!isConnected || isPending || isLoading || isSuccess}
        className={`relative px-14 py-6 rounded-2xl text-2xl font-black tracking-wide transition-all duration-300 flex items-center gap-3 overflow-hidden
          ${!isConnected || isPending || isLoading
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : isSuccess
            ? "bg-emerald-600 text-white"
            : "bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-2xl hover:shadow-amber-500/50"
          }`}
      >
        <span className="relative z-10 drop-shadow-lg">{getButtonText()}</span>
        {(isPending || isLoading) && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
          />
        )}
        {/* Glow effect */}
        {isConnected && !isPending && !isLoading && !isSuccess && (
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity rounded-2xl" />
        )}
      </motion.button>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/90 backdrop-blur-md border-2 border-emerald-400 rounded-2xl p-5 max-w-lg mx-auto shadow-xl"
        >
          <p className="text-emerald-200 font-bold text-xl text-center">
            Vé NFT đã được đúc thành công!
          </p>
          <a
            href={`https://celo-sepolia.blockscout.com/tx/${data}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-amber-400 underline hover:text-amber-300 font-semibold text-center"
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
    <div
      className="min-h-screen flex flex-col text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/chaotan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-5 md:p-8">
        <motion.h1
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-black"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 drop-shadow-2xl">
            Phenikaa NFT Event
          </span>
        </motion.h1>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-gradient-to-r from-orange-600 to-amber-500 p-1.5 rounded-full shadow-xl"
        >
          <div className="bg-black/90 rounded-full px-2 py-1.5 backdrop-blur">
            <ConnectButton
              accountStatus="address"
              showBalance={false}
              chainStatus="icon"
            />
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-orange-600/98 via-orange-700/98 to-amber-700/98 backdrop-blur-2xl p-10 md:p-14 rounded-3xl shadow-2xl border-4 border-amber-300/50 max-w-4xl w-full"
        >
          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-black text-center mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100 drop-shadow-2xl">
              Chào Tân K19
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-amber-100 font-bold mt-2 block">
              Sự Kiện 2025
            </span>
          </h2>

          {/* Description Box - NỀN CAM ĐẬM */}
          <div className="bg-gradient-to-r from-amber-600/95 to-orange-600/95 backdrop-blur-xl border-2 border-amber-300/60 rounded-2xl p-8 md:p-10 mb-12 shadow-xl">
            <p className="text-xl md:text-2xl text-white font-bold leading-relaxed text-center drop-shadow-lg">
              Chào mừng các tân sinh viên K19!<br />
              Nhận ngay <span className="text-yellow-200">vé NFT độc quyền</span> để tham dự
              <br />
              <span className="text-amber-100 text-2xl md:text-3xl">Sự kiện Chào tân 2025</span>
            </p>
            <p className="text-base md:text-lg text-amber-100 mt-5 text-center font-semibold">
              Kết nối ví <span className="text-yellow-300">Celo Sepolia</span> để nhận vé kỹ thuật số!
            </p>
          </div>

          {/* Mint Button */}
          <MintButton />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-sm md:text-base bg-black/80 backdrop-blur-sm border-t-2 border-amber-500/40">
        <p className="font-bold">
          © 2025{" "}
          <span className="text-orange-400">Phenikaa NFT Ticket</span> | 
          Built with <span className="text-red-500">❤️</span> on{" "}
          <span className="text-amber-400">Celo Sepolia</span>
        </p>
      </footer>
    </div>
  );
}