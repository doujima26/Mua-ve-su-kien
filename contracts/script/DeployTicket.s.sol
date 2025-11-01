// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Nhập công cụ Script của Foundry và hợp đồng Ticket của chúng ta
import "forge-std/Script.sol";
import "../src/Ticket.sol";

contract DeployTicket is Script {
    function run() public {
        // 1. Đọc Private Key an toàn từ tệp .env
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        // 2. Đọc địa chỉ chủ sở hữu (INITIAL_OWNER) từ tệp .env
        address initialOwner = vm.envAddress("INITIAL_OWNER");

        // Bắt đầu "ghi" lên blockchain
        vm.startBroadcast(deployerKey);

        // 3. Chạy lệnh "new" (giống hệt hàm constructor của bạn)
        // Đây chính là lệnh "forge create" của bạn, nhưng bằng Solidity!
        Ticket ticket = new Ticket(initialOwner);

        // Kết thúc "ghi"
        vm.stopBroadcast();

        // (Tùy chọn) In ra địa chỉ hợp đồng đã triển khai
        console.log("Ticket contract deployed to:", address(ticket));
    }
}
