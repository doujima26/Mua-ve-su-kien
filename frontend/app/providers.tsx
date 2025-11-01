// ĐÁNH DẤU ĐÂY LÀ CLIENT COMPONENT
"use client"; 

// 1. Imports
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { celoSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';

// 2. Cấu hình
const config = getDefaultConfig({
  appName: 'My Ticket dApp',
  
  // ----- DÁN PROJECT ID CỦA BẠN VÀO ĐÂY (Từ Bước 4 trước đó) -----
  projectId: '4ee6c92ea429b1025048b39680e3a285', 
  // -----------------------------------------

  chains: [celoSepolia], // <-- Bảo nó dùng mạng Celo Sepolia
  ssr: true, // Vì chúng ta dùng Next.js
});

const queryClient = new QueryClient();

// 3. Tạo Provider Component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
