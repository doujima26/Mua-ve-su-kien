Dự án Đúc vé NFT trên Celo (Full-Stack Monorepo)

Đây là một dự án full-stack "monorepo" để đúc vé sự kiện NFT trên mạng Celo.

🚀 Cấu trúc dự án

Dự án này bao gồm hai phần riêng biệt:

1. /backend (Hợp đồng thông minh)

Công nghệ: Foundry (Solidity)

Hợp đồng: backend/src/Ticket.sol

Mô tả: Đây là "nhà máy" ERC721 cho phép chủ sở hữu đúc (mint) các vé NFT mới.

2. /frontend (Giao diện dApp)

Công nghệ: Next.js, React, TypeScript, RainbowKit, wagmi

Mô tả: Đây là giao diện trang web (dApp) cho phép người dùng kết nối ví MetaMask và gọi hàm mintTicket từ hợp đồng.

Cách chạy dự án

Bạn cần chạy riêng biệt cả hai phần.

Chạy Backend (Foundry)

cd backend
forge test
# (Xem hướng dẫn trong README.md của backend để triển khai)


Chạy Frontend (Next.js)

cd frontend
npm install
npm run dev
# Mở http://localhost:3000
