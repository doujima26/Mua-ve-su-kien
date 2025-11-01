"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractAddress, contractAbi } from "../constants/contract";
import { useState } from "react";

function MintButton() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
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
    if (isPending) return "Đang chờ xác nhận...";
    if (isLoading) return "Đang xử lý giao dịch...";
    if (isSuccess) return "Đúc thành công!";
    return "🎟️ Mua vé ngay";
  };

  return (
    <div className="flex flex-col items-center">
      <button
        disabled={isPending || isLoading || !isConnected}
        onClick={handleMint}
        className={`px-6 py-3 rounded-xl text-white font-semibold transition-all 
          ${isPending || isLoading || !isConnected
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-400/50"
          }`}
      >
        {getButtonText()}
      </button>

      {isSuccess && (
        <div className="mt-4 text-center">
          <p className="text-green-400 font-medium">
            ✅ Đúc vé thành công!{" "}
            <a
              href={`https://celo-sepolia.blockscout.com/tx/${data}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange-400 hover:text-orange-300 font-semibold"
            >
              Xem trên Celoscan
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        backgroundImage: "url('/phenikaa-banner.png')", // 🔸 ĐỔI ĐƯỜNG DẪN ẢNH NỀN Ở ĐÂY
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black/60 backdrop-blur-sm shadow-md">
        <h1 className="text-2xl font-bold text-orange-400 drop-shadow-md">
          Phenikaa University NFT Event 🎓
        </h1>
        <div className="bg-white/10 rounded-lg px-3 py-1">
          <ConnectButton />
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="bg-black/70 rounded-2xl p-8 max-w-3xl text-center shadow-2xl">
          <img
            src="/event-banner.png" // 🔸 ĐỔI ẢNH SỰ KIỆN CỦA BẠN (có thể là ảnh trong /public)
            alt="Sự kiện Chào tân K19"
            className="rounded-xl mb-6 shadow-lg border border-orange-400/50"
          />
          <h2 className="text-3xl font-bold mb-3 text-orange-400">
            Vé Chào Tân K19 - Đại học Phenikaa
          </h2>
          <p className="text-gray-200 mb-8 leading-relaxed">
            Chào mừng các tân sinh viên K19! Đây là chiếc vé NFT độc nhất của bạn để tham dự sự kiện Chào tân 2025.  
            Kết nối ví Celo Sepolia của bạn và nhận vé ngay hôm nay!
          </p>

          <MintButton />
        </div>
      </main>

      <footer className="text-center py-4 text-gray-400 text-sm bg-black/60">
        © 2025 Phenikaa NFT Ticket | Built with ❤️ and Celo
      </footer>
    </div>
  );
}
