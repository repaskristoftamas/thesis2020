@echo off
:start
cls
call npm install
cd node_modules/@openzeppelin/contracts/token/ERC20
del ERC20.sol
del IERC20.sol
cd..
cd..
cd..
cd..
cd..
copy "ERC20.sol" "node_modules/@openzeppelin/contracts/token/ERC20"
copy "IERC20.sol" "node_modules/@openzeppelin/contracts/token/ERC20"
call npm install -g ganache-cli
truffle compile