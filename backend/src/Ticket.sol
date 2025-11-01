// SPDX-License-Identifier: MIT
// Chỉ định phiên bản trình biên dịch Solidity
pragma solidity ^0.8.20;

/*
 * ----- PHẦN IMPORT (ĐÃ SỬA LỖI) -----
 * Chúng ta chỉ nhập những thứ thật sự cần thiết.
 * Lưu ý: Chúng ta SẼ KHÔNG import Counters.sol nữa.
 */

// 1. ERC721.sol: Hợp đồng NFT tiêu chuẩn
import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

// 2. Ownable.sol: Hợp đồng để quản lý "chủ sở hữu"
import "openzeppelin-contracts/contracts/access/Ownable.sol";

/**
 * @title Ticket
 * Đây là hợp đồng NFT của chúng ta (Phiên bản không cần Counters.sol)
 */
contract Ticket is ERC721, Ownable {

    // ----- BỘ ĐẾM ID MỚI -----
    // Thay vì dùng thư viện, chúng ta tự tạo một biến đếm.
    // Nó bắt đầu từ 0 và chúng ta sẽ tăng nó lên 1, 2, 3...
    uint256 private _nextTokenId;

    /**
     * @dev Đây là hàm khởi tạo (constructor).
     * (Hàm khởi tạo này dùng cho OpenZeppelin v5)
     */
    constructor(address initialOwner)
        ERC721("My Event Ticket", "MET") // Tên và Ký hiệu của NFT
        Ownable(initialOwner) // Đặt "chủ sở hữu" hợp đồng là người triển khai
    {}

    /**
     * @dev Đây là hàm chính của chúng ta: mintTicket (Đúc Vé)
     * Nó chỉ có thể được gọi bởi "chủ sở hữu" (nhờ có modifier "onlyOwner").
     * Nó nhận một tham số là "to" (địa chỉ ví sẽ nhận vé).
     * Nó trả về ID của vé mới được tạo.
     */
    function mintTicket(address to) public onlyOwner returns (uint256) {
        
        // ----- LOGIC BỘ ĐẾM MỚI -----
        // 1. Tăng bộ đếm lên 1 (lần đầu gọi, nó sẽ từ 0 -> 1)
        _nextTokenId++;
        
        // 2. Lấy ID mới
        uint256 newItemId = _nextTokenId;

        // _safeMint là hàm CỐT LÕI từ ERC721.sol.
        // Nó tạo ra NFT mới (với ID là newItemId)
        // và gán quyền sở hữu cho địa chỉ "to".
        _safeMint(to, newItemId);

        // Trả về ID của vé vừa tạo để người gọi biết.
        return newItemId;
    }
}

