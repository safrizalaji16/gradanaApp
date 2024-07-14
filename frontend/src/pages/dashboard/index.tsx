import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/header";
import { dateFormater } from "@/helpers/dateFormater";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { sortingData } from "@/helpers/sortingData";

const Dashboard = () => {
  const [saldo, setSaldo] = useState(0);
  const [saldoHistories, setSaldoHistories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState<"topup" | "withdraw">(
    "topup"
  );
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/users/logged-in");

      setSaldo(data.saldo);
      const sortedHistories = sortingData(data.saldoHistories, "desc");
      setSaldoHistories(sortedHistories);
    } catch (error) {
      console.error("Error fetching saldo:", error);
      setError("Failed to fetch saldo. Please try again later.");
    }
  };

  const openModal = (type: "topup" | "withdraw") => {
    setTransactionType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAmount(0);
    setError(null);
  };

  const handleTransaction = async () => {
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    const id = localStorage.getItem("id");
    try {
      const response = await axios.post(`/api/histories/${id}`, {
        amount,
        type: transactionType,
      });

      if (response.status === 200) {
        fetchUser();
        closeModal();
      }
    } catch (error) {
      console.error(
        `Error ${
          transactionType === "topup" ? "topping up" : "withdrawing"
        } saldo:`,
        error
      );
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Transaction failed");
      } else {
        setError("An error occurred during the transaction");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />

      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => openModal("topup")}
          >
            Deposit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => openModal("withdraw")}
          >
            Withdrawal
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
        <p className="text-xl">Rp {saldo.toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
        {saldoHistories.length > 0 ? (
          <ul>
            {saldoHistories.map((transaction) => (
              <li key={transaction._id}>
                {dateFormater(transaction.createdAt)} -{" "}
                {capitalizeFirstLetter(transaction.type)} - Rp{" "}
                {transaction.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transaction history yet.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {transactionType === "topup" ? "Add Funds" : "Withdraw Funds"}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`bg-${
                  transactionType === "topup" ? "green" : "red"
                }-500 hover:bg-${
                  transactionType === "topup" ? "green" : "red"
                }-700 text-white font-bold py-2 px-4 rounded`}
                onClick={handleTransaction}
              >
                {transactionType === "topup" ? "Deposit" : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
