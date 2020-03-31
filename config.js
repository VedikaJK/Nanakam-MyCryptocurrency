//this file will store all hard-coded values
const MINE_Rate = 1000; // 1 sec
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA ={
    timestamp: 1,
    lastHash: '-----',
    hash:'00000',
    data: [],
    difficulty : INITIAL_DIFFICULTY,
    nonce : 0
};

const STARTING_BALANCE = 1000;

const REWARD_INPUT ={address: '*authorized-reward*'};

const MINING_REWARD = 50;

module.exports={ GENESIS_DATA,MINE_Rate, STARTING_BALANCE,REWARD_INPUT,MINING_REWARD};