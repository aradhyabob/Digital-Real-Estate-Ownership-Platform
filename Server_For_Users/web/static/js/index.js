async function connectToBlockchain() {
  let connectBtn = document.getElementById("connectBtn");
  let notifyUser = document.getElementById("notifyUser");

  if (window.ethereum) {
    window.web3 = new Web3(ethereum);

    try {
      showTransactionLoading();

      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await web3.eth.getAccounts();
      let userAddress = accounts[0];
      window.localStorage.setItem("userAddress", userAddress);

      connectBtn.innerText = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      connectBtn.disabled = true; // Disable button after connection
      connectBtn.classList.add("btn-success");

      notifyUser.innerHTML = `✅ Wallet Connected: <strong>${userAddress}</strong>`;
      notifyUser.className = "alert alert-success";
      notifyUser.style.display = "block";

      // Check if the user is registered
      let contractABI = JSON.parse(window.localStorage.Users_ContractABI);
      let contractAddress = window.localStorage.Users_ContractAddress;
      let contract = new window.web3.eth.Contract(contractABI, contractAddress);

      let userDetails = await contract.methods.users(userAddress).call();

      setTimeout(() => {
        if (userDetails["userID"] === userAddress) {
          window.location.href = "/dashboard"; // Redirect to Dashboard
        } else {
          window.location.href = "/register"; // Redirect to Register
        }
      }, 2000);

    } catch (error) {
      console.log(error);
      notifyUser.innerHTML = `❌ ${showError(error)}`;
      notifyUser.className = "alert alert-danger";
      notifyUser.style.display = "block";
    }finally {
      connectBtn.disabled = false;
      connectBtn.innerText = "Connect Wallet";
    }
  } else {
    notifyUser.innerText = "⚠️ Please install MetaMask!";
    notifyUser.className = "alert alert-warning";
    notifyUser.style.display = "block";
  }
}



// Auto-refresh the feed every 10 seconds
async function loadTransactions() {
  if (typeof web3 !== "undefined") {
      const web3Instance = new Web3(web3.currentProvider);
      
      const latestBlock = await web3Instance.eth.getBlockNumber();
      const transactionList = document.getElementById("transactionList");

      transactionList.innerHTML = ""; // Clear old transactions

      for (let i = latestBlock; i > latestBlock - 5; i--) { // Fetch last 5 blocks
          let block = await web3Instance.eth.getBlock(i, true);
          if (block && block.transactions.length > 0) {
              block.transactions.forEach((tx) => {
                  let li = document.createElement("li");
                  li.className = "list-group-item bg-secondary text-white";
                  li.innerHTML = `<strong>From:</strong> ${tx.from} <br> 
                                  <strong>To:</strong> ${tx.to} <br> 
                                  <strong>Value:</strong> ${web3Instance.utils.fromWei(tx.value, "ether")} ETH`;
                  transactionList.appendChild(li);
              });
          }
      }
  } else {
      console.error("Web3 not detected. Install MetaMask.");
  }
}

// Refresh transactions every 10 seconds
setInterval(loadTransactions, 10000);


document.addEventListener("DOMContentLoaded", function () {
  console.log("Bootstrap:", bootstrap); // Check if Bootstrap is loaded

  var transactionModal = new bootstrap.Modal(document.getElementById('transactionModal'));

  document.getElementById('toggleFeedBtn').addEventListener('click', function () {
      transactionModal.show();
  });
});
