Vé Sự Kiện K19 Phenikaa

Chi tiết dự án (Project Details) 📝

Tên dự án (Project Name):

Vé Sự Kiện K19 Phenikaa (Phenikaa K19 NFT Ticket)

Về chúng tôi :

Team: 3

Thành viên:

Hoàng Hà Dũng

Nguyễn Văn Ngọc Anh

Mô tả dự án (Project Description):
Dự án này là một dApp đúc vé NFT (NFT Ticketing dApp) được xây dựng trên blockchain Celo sử dụng hợp đồng thông minh Solidity/Foundry. Nó nhằm mục đích đơn giản hóa việc phát hành vé sự kiện cho các sự kiện của trường (ví dụ: Chào tân K19 Phenikaa). dApp cho phép bất kỳ sinh viên nào cũng có thể kết nối ví MetaMask của họ (qua RainbowKit) trên mạng Celo Sepolia và đúc (mint) một vé NFT (tiêu chuẩn ERC721) miễn phí và duy nhất. Giao diện frontend được xây dựng bằng Next.js/React, cung cấp trải nghiệm người dùng mượt mà để tương tác với hợp đồng, đảm bảo tính minh bạch, loại bỏ vé giả và tạo ra một vật phẩm sưu tầm kỹ thuật số.

Tầm nhìn (Vision): ✨
Tầm nhìn của chúng tôi là cách mạng hóa cách thức tổ chức sự kiện tại các trường đại học bằng cách sử dụng vé NFT trên Celo. Điều này sẽ loại bỏ hoàn toàn nạn vé giả, giảm chi phí hành chính và cung cấp cho sinh viên quyền sở hữu kỹ thuật số thực sự đối với vé của họ. Bằng cách tự động hóa việc phát hành vé trên mạng Celo (vốn ưu tiên thiết bị di động), chúng tôi mong muốn cung cấp một công cụ minh bạch, hấp dẫn và dễ tiếp cận cho cộng đồng sinh viên, biến mỗi chiếc vé không chỉ là lối vào mà còn là một kỷ niệm chương (vật phẩm sưu tầm) vĩnh viễn.

Kế hoạch Phát triển Phần mềm (Software Development Plan) 🗺️

Thiết kế Hợp đồng & Logic Cốt lõi (Solidity/Foundry):

Khởi tạo dự án Foundry (forge init).

Tạo hợp đồng Ticket.sol kế thừa từ ERC721.sol (cho chức năng NFT) và Ownable.sol (để quản lý quyền sở hữu) của OpenZeppelin.

Cài đặt thư viện: forge install openzeppelin/openzeppelin-contracts.

Biến (Variables): Khởi tạo biến _nextTokenId (kiểu uint256) để làm bộ đếm ID vé.

Logic Đúc vé & Getters (Solidity/Foundry):

Hàm constructor(address initialOwner): Thiết lập Tên NFT ("Vé Chào Tân K19") và Ký hiệu ("PKT"), đồng thời đặt người triển khai làm initialOwner.

Hàm mintTicket(address to): (Công khai - public) Tăng _nextTokenId lên 1, sau đó gọi _safeMint(to, newItemId) để tạo ra NFT mới và gán nó cho địa chỉ to.

Hàm (Tùy chọn nâng cao): Viết hàm tokenURI(uint256 tokenId) để trả về metadata (siêu dữ liệu) và hình ảnh (ví dụ: SVG) được tạo on-chain.

Viết các bài kiểm thử (tests) cơ bản trong Solidity (forge test).

Triển khai Backend & Xác minh (Foundry CLI):

Biên dịch hợp đồng (forge build).

Thiết lập ví MetaMask với Celo Sepolia và lấy token CELO (Sepolia) từ Faucet.

Triển khai Ticket.sol lên Testnet bằng forge create, truyền vào địa chỉ ví của admin qua --constructor-args.

Lưu lại địa chỉ hợp đồng [CONTRACT_ADDRESS].

Sao chép (copy) ABI từ out/Ticket.sol/Ticket.json.

Xác minh hợp đồng trên Celoscan bằng forge verify-contract.

Thiết lập Frontend & Kết nối (Next.js/React):

Khởi tạo dự án Next.js (npx create-next-app@latest frontend).

Cài đặt các gói (dependencies) Web3: wagmi, viem, @rainbow-me/rainbowkit.

Tổ chức dự án dưới dạng "monorepo" (backend/ và frontend/).

Tạo app/providers.tsx để bọc (wrap) ứng dụng, cấu hình WagmiConfig và RainbowKitProvider với mạng celoSepolia.

Giao diện (UI) Frontend & Logic Tương tác (Next.js/React):

Tạo tệp constants/contract.ts để lưu [CONTRACT_ADDRESS] và ABI đã sao chép ở Bước 3.

Thiết kế giao diện trong app/page.tsx (sử dụng Tailwind CSS) với tiêu đề, ảnh sự kiện, và ConnectButton (từ RainbowKit).

Tạo component MintButton sử dụng hook useWriteContract (từ wagmi) để gọi hàm mintTicket của hợp đồng, truyền vào địa chỉ ví của người dùng (address!) làm tham số args.

Hiển thị các trạng thái (Loading, Success) và link đến Celoscan khi đúc vé thành công.

Thử nghiệm & Triển khai (Vercel):

Thử nghiệm toàn bộ luồng (kết nối ví, đúc vé) trên localhost (npm run dev) với MetaMask.

Gỡ lỗi (debug) giao dịch.

Đẩy (push) monorepo lên GitHub.

Triển khai (Deploy) lên Vercel, đặt "Root Directory" thành frontend và thêm Biến Môi trường NEXT_PUBLIC_PROJECT_ID (từ WalletConnect).

GitHub Readme Draft (Cài đặt) 🛠️

# Vé Sự Kiện K19 Phenikaa (Full-stack Monorepo)

Đây là kho lưu trữ (repository) cho dApp Đúc vé NFT (Phenikaa K19 NFT Ticket), được xây dựng trên Celo.
Dự án được tổ chức dưới dạng monorepo:
* `/backend`: Hợp đồng thông minh (Solidity/Foundry).
* `/frontend`: Trang web dApp (Next.js/React).

## Điều kiện tiên quyết

* **Foundry (Rust):** [getfoundry.sh](https://getfoundry.sh/)
* **Node.js (v20+):** [nodejs.org](https://nodejs.org/)
* **Git:** [git-scm.com/downloads](https://git-scm.com/downloads)
* **Ví MetaMask:** [metamask.io](https://metamask.io/)

## Cài đặt Backend (Hợp đồng)

Phần này dùng để biên dịch và triển khai hợp đồng `Ticket.sol`.

1.  **Di chuyển vào thư mục backend:**
    ```bash
    git clone <YOUR_REPO_URL>
    cd <YOUR_REPO_NAME>/backend
    ```

2.  **Cài đặt thư viện (OpenZeppelin, Forge-Std):**
    ```bash
    forge install
    ```

3.  **Biên dịch hợp đồng:**
    ```bash
    forge build
    ```

4.  **(Tùy chọn) Chạy kiểm thử:**
    ```bash
    forge test
    ```

5.  **(Tùy chọn) Triển khai hợp đồng MỚI của riêng bạn:**
    *(Bạn sẽ cần Private Key và RPC URL của Celo Sepolia)*
    ```bash
    # (Ví dụ: đặt chúng vào tệp .env và chạy 'source .env')
    forge create src/Ticket.sol:Ticket --rpc-url $CELO_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --constructor-args $YOUR_WALLET_ADDRESS
    ```

## Cài đặt Frontend (Trang web dApp)

Phần này dùng để chạy trang web trên máy của bạn (localhost).

1.  **Di chuyển vào thư mục frontend:**
    ```bash
    cd ../frontend
    ```

2.  **Cài đặt tất cả các gói (dependencies):**
    ```bash
    npm install
    ```

3.  **Cấu hình Hợp đồng & API Key (RẤT QUAN TRỌNG):**

    * **Tạo tệp `.env.local`:**
        Tạo một tệp mới tên là `.env.local` trong thư mục `frontend` và thêm Project ID của bạn (lấy từ WalletConnect):
        ```
        NEXT_PUBLIC_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
        ```

    * **Cập nhật Hợp đồng:**
        Mở tệp `frontend/constants/contract.ts`:
        1.  Thay thế `contractAddress` bằng địa chỉ hợp đồng bạn đã triển khai (ở Bước 3 backend).
        2.  Sao chép (copy) `abi` mới nhất từ `backend/out/Ticket.sol/Ticket.json` và dán vào `contractAbi`.

4.  **Chạy máy chủ phát triển (development server):**
    ```bash
    npm run dev
    ```

5.  **Truy cập dApp:**
    Mở `http://localhost:3000` trong trình duyệt của bạn.
