# 🎟️ Vé Sự Kiện K19 Phenikaa (Phenikaa K19 NFT Ticket)

## 📝 Chi tiết dự án (Project Details)

### 🧾 Tên dự án (Project Name)
**Vé Sự Kiện K19 Phenikaa (Phenikaa K19 NFT Ticket)**

### 👥 Về chúng tôi (Who We Are)
**Team:** 2  
**Thành viên:**
- Hoàng Hà Dũng  
- Nguyễn Văn Ngọc Anh  

### 💡 Mô tả dự án (Project Description)
Dự án này là một **dApp đúc vé NFT (NFT Ticketing dApp)** được xây dựng trên **blockchain Celo** sử dụng **Solidity/Foundry**.  
Mục tiêu là đơn giản hóa việc phát hành vé cho các sự kiện của trường (ví dụ: **Chào tân K19 Phenikaa**).  
Người dùng có thể kết nối ví **MetaMask** thông qua **RainbowKit**, sau đó **đúc (mint)** một vé NFT duy nhất (chuẩn **ERC721**) miễn phí.  

Frontend được xây dựng bằng **Next.js/React**, giúp người dùng tương tác trực tiếp với hợp đồng thông minh.  
Giải pháp này đảm bảo:
- ✅ Loại bỏ vé giả  
- 💎 Cung cấp vật phẩm sưu tầm kỹ thuật số  
- 🔍 Minh bạch và tiện lợi cho sinh viên  

### 🌈 Tầm nhìn (Vision)
Tầm nhìn của chúng tôi là **cách mạng hóa quy trình phát hành vé sự kiện tại các trường đại học** thông qua công nghệ NFT.  
Hệ thống giúp:
- Loại bỏ vé giả  
- Giảm chi phí hành chính  
- Tạo ra kỷ niệm kỹ thuật số (sưu tầm NFT)  
Triển khai trên **Celo Network**, tối ưu cho thiết bị di động và thân thiện với môi trường.  

---

## 🗺️ Kế hoạch Phát triển Phần mềm (Software Development Plan)

### 🔧 1. Thiết kế Hợp đồng & Logic Cốt lõi (Solidity/Foundry)
- Khởi tạo dự án Foundry:
  ```bash
  forge init
Tạo hợp đồng Ticket.sol kế thừa:

ERC721.sol → chức năng NFT

Ownable.sol → quản lý quyền sở hữu

Cài đặt thư viện:

bash
Sao chép mã
forge install openzeppelin/openzeppelin-contracts
Biến chính:

solidity
Sao chép mã
uint256 private _nextTokenId;
🧠 2. Logic Đúc vé & Getters (Solidity/Foundry)
constructor(address initialOwner)
Thiết lập tên NFT "Vé Chào Tân K19" và ký hiệu "PKT".

function mintTicket(address to)
Tăng _nextTokenId và gọi _safeMint(to, newItemId).

function tokenURI(uint256 tokenId) (tùy chọn)
Trả về metadata và hình ảnh SVG tạo on-chain.

Viết kiểm thử:

bash
Sao chép mã
forge test
⚙️ 3. Triển khai Backend & Xác minh (Foundry CLI)
Biên dịch hợp đồng:

bash
Sao chép mã
forge build
Cấu hình MetaMask với Celo Sepolia và nhận CELO testnet.

Triển khai hợp đồng:

bash
Sao chép mã
forge create src/Ticket.sol:Ticket --rpc-url $CELO_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --constructor-args $YOUR_WALLET_ADDRESS
Lưu [CONTRACT_ADDRESS] sau khi triển khai.

Xác minh trên Celoscan:

bash
Sao chép mã
forge verify-contract
💻 4. Thiết lập Frontend (Next.js + RainbowKit + Wagmi)
Khởi tạo dự án:

bash
Sao chép mã
npx create-next-app@latest frontend
Cài đặt gói Web3:

bash
Sao chép mã
npm install wagmi viem @rainbow-me/rainbowkit
Cấu trúc monorepo:

bash
Sao chép mã
/backend
/frontend
Tạo app/providers.tsx với WagmiConfig và RainbowKitProvider.

🎨 5. Giao diện (UI) Frontend & Logic Tương tác
Tạo constants/contract.ts lưu địa chỉ hợp đồng và ABI.

Xây dựng app/page.tsx với:

Tiêu đề sự kiện

Ảnh banner

Nút Connect Wallet

Tạo component MintButton.tsx:

Dùng hook useWriteContract từ wagmi để gọi mintTicket(address!).

Hiển thị trạng thái Loading / Success.

Khi thành công → hiển thị link đến Celoscan.

🚀 6. Thử nghiệm & Triển khai (Vercel)
Chạy thử trên localhost:

bash
Sao chép mã
npm run dev
Debug giao dịch, kiểm tra trạng thái NFT trong ví MetaMask.

Đẩy code lên GitHub và triển khai bằng Vercel:

Root Directory: frontend

Thêm biến môi trường:

bash
Sao chép mã
NEXT_PUBLIC_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
🛠️ GitHub README Draft (Cài đặt)
📁 Cấu trúc Monorepo
bash
Sao chép mã
/backend   → Hợp đồng thông minh (Solidity/Foundry)
/frontend  → Ứng dụng dApp (Next.js/React)
⚙️ Điều kiện tiên quyết
Foundry (Rust): getfoundry.sh

Node.js (v20+): nodejs.org

Git: git-scm.com/downloads

MetaMask: metamask.io

🧩 Cài đặt Backend
bash
Sao chép mã
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_NAME>/backend
forge install
forge build
forge test
forge create src/Ticket.sol:Ticket --rpc-url $CELO_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --constructor-args $YOUR_WALLET_ADDRESS
🖥️ Cài đặt Frontend
bash
Sao chép mã
cd ../frontend
npm install
Tạo tệp .env.local:

bash
Sao chép mã
NEXT_PUBLIC_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
Cập nhật constants/contract.ts:

ts
Sao chép mã
export const contractAddress = "YOUR_CONTRACT_ADDRESS";
export const contractAbi = [ /* ABI content */ ];
Chạy server:

bash
Sao chép mã
npm run dev
Truy cập:

arduino
Sao chép mã
http://localhost:3000
✅ Hoàn thiện
Kết nối ví MetaMask

Nhấn "Mint Ticket" để đúc vé NFT

Xem giao dịch trên Celoscan

Lưu vé NFT trong ví CELO của bạn
