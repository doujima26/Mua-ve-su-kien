// ĐÁNH DẤU ĐÂY LÀ CLIENT COMPONENT (Vì nó dùng hooks)
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// Đường dẫn import chính xác (giả sử thư mục 'constants' ở thư mục gốc)
import { contractAddress, contractAbi } from "../constants/contract"; 
import { useState } from "react";

// === THÀNH PHẦN NÚT MINT MỚI (Dùng Tailwind CSS) ===
function MintButton() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const { data, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: data });

  const handleMint = async () => {
    if (!isConnected) {
      alert("Vui lòng kết nối ví của bạn trước!");
      return;
    }
    
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "mintTicket",
      args: [address as `0x${string}`], // Phải ép kiểu (cast) 'address'
    });
  };

  const buttonText = (isPending || isLoading) ? "Đang xử lý..." : (isSuccess ? "Đúc thành công!" : "Mint Ticket (Đúc vé)");

  return (
    <div className="mt-8 text-center">
      <button
        disabled={isPending || isLoading}
        onClick={handleMint}
        className="px-8 py-4 font-bold text-white transition-all duration-500 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 bg-size-200 hover:bg-pos-100 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>

      {isSuccess && (
        <div className="mt-4 text-green-600">
          Đúc vé thành công! 
          <a 
            href={`https://alfajores.celoscan.io/tx/${data}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
             Xem giao dịch trên Celoscan
          </a>
        </div>
      )}
      {(isPending || isLoading) && data && (
        <div className="mt-4 text-yellow-600">
          Đang chờ xác nhận giao dịch... 
          <a 
            href={`https://alfajores.celoscan.io/tx/${data}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            (Xem trên Celoscan)
          </a>
        </div>
      )}
    </div>
  );
}

// === TRANG CHỦ ===
export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
          <p className="fixed top-0 left-0 flex justify-center w-full pt-8 pb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Chào mừng đến với dApp đúc vé NFT!
          </p>
          <div className="fixed bottom-0 left-0 flex items-end justify-center w-full h-48 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <ConnectButton />
          </div>
        </div>

        <div className="relative flex flex-col place-items-center">
          <h1 className="text-4xl font-bold text-center lg:text-6xl">
            My Event Ticket dApp
          </h1>
          <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-400">
            Kết nối ví Celo Sepolia của bạn và nhấn nút bên dưới để đúc một vé.
          </p>
          
          <MintButton />
          
        </div>

        <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
          <a
            href="https://docs.celo.org/developer"
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Celo Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Tìm hiểu tài liệu chuyên sâu về Celo.
            </p>
          </a>

          <a
            href={`https://alfajores.celoscan.io/address/${contractAddress}`}
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Hợp đồng{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Xem hợp đồng đã xác minh trên Celoscan.
            </p>
          </a>
          
          <a
            href="https://github.com/rainbow-me/rainbowkit"
            className="px-5 py-4 transition-colors border border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              RainbowKit{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Tìm hiểu về thư viện kết nối ví này.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
