// // Reduced ABI for ERC1155 with just balanceOf 
// export const ERC1155ContractABI = [
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_owner",
//                 "type": "address"
//             },
//             {
//                 "name": "_id",
//                 "type": "uint256"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     }
// ];

// // Reduced ABI for ERC721 with just balanceOf 
// export const ERC721ContractABI = [
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_owner",
//                 "type": "address"
//             },
//             {
//                 "name": "_id",
//                 "type": "uint256"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     }
// ];

export const ERC721ContractABI = [
    "function balanceOf(address) view returns (uint)",
]
export const ERC1155ContractABI = [
    "function balanceOf(address, id) view returns (uint)",
]