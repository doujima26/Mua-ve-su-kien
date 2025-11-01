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
    if (!isConnected) return "⚠️ Kết nối ví để mua vé";
    if (isPending) return "⏳ Đang chờ xác nhận...";
    if (isLoading) return "🔄 Đang xử lý...";
    if (isSuccess) return "✅ Đúc thành công!";
    return "🎟️ Nhận vé NFT ngay";
  };

  const getButtonClass = () => {
    if (!isConnected || isPending || isLoading) {
      return "bg-gray-600 text-gray-300 cursor-not-allowed opacity-70";
    }
    if (isSuccess) {
      return "bg-green-500 text-white cursor-default";
    }
    return "bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-300 hover:to-orange-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-1";
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.button
        whileHover={isConnected && !isPending && !isLoading && !isSuccess ? { scale: 1.05 } : {}}
        whileTap={isConnected && !isPending && !isLoading && !isSuccess ? { scale: 0.98 } : {}}
        onClick={handleMint}
        disabled={!isConnected || isPending || isLoading || isSuccess}
        className={`px-12 py-5 rounded-full text-xl font-extrabold tracking-wider transition-all duration-300 flex items-center gap-3 ${getButtonClass()}`}
      >
        <span className="drop-shadow-md">{getButtonText()}</span>
        {isPending || isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : null}
      </motion.button>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-900/80 backdrop-blur-sm border border-green-400 rounded-xl p-4 max-w-md mx-auto"
        >
          <p className="text-green-300 font-medium text-lg leading-relaxed">
            🎉 <strong>Vé NFT đã được đúc thành công!</strong><br />
            <a
              href={`https://celo-sepolia.blockscout.com/tx/${data}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-yellow-400 underline hover:text-yellow-300 font-semibold transition"
            >
              Xem giao dịch trên Blockscout →
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
      className="min-h-screen flex flex-col text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/chaotan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-5 md:p-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-lg">
              🎓 Phenikaa NFT Event
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 p-1 rounded-full shadow-lg">
            <div className="bg-black rounded-full px-1 py-1">
              <ConnectButton
                accountStatus="address"
                showBalance={false}
                chainStatus="icon"
              />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-orange-600/95 via-orange-700/95 to-red-800/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-yellow-400/30 max-w-3xl w-full"
        >
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-black text-center mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-100 drop-shadow-2xl">
              Chào Tân K19
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-yellow-100 font-bold">Sự Kiện 2025</span>
          </h2>

          {/* Description Box */}
          <div className="bg-white/10 backdrop-blur-md border border-yellow-300/40 rounded-2xl p-6 md:p-8 mb-10 shadow-inner">
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium text-center">
              🌟 <strong>Chào mừng các tân sinh viên K19!</strong><br />
              Nhận ngay <span className="text-yellow-300 font-bold">vé NFT độc quyền</span> để tham dự
              <br />
              <span className="text-orange-200 text-xl font-bold">Sự kiện Chào tân 2025</span>
            </p>
            <p className="text-sm md:text-base text-gray-300 mt-4 text-center">
              Kết nối ví <strong className="text-yellow-400">Celo Sepolia</strong> để nhận vé kỹ thuật số!
            </p>
          </div>

          {/* Mint Button */}
          <MintButton />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 text-sm md:text-base bg-black/70 backdrop-blur-sm border-t border-orange-500/30">
        <p>
          © 2025{" "}
          <span className="text-orange-400 font-bold">Phenikaa NFT Ticket</span> | 
          Built with ❤️ on{" "}
          <span className="text-yellow-400 font-semibold">Celo Sepolia</span>
        </p>
      </footer>
    </div>
  );
}