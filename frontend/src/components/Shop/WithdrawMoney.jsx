import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { loadSeller } from "../../redux/actions/seller";
import {AiOutlineDelete} from 'react-icons/ai';

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState(null);
  const [bankHolderName, setBankHolderName] = useState("");
  const [IFSC, setIFSC] = useState(null);
  const [withdrawAmount, setWithdrawAmount]=useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${server}/shop/update-payment-methods`,
        { bankName, accountNumber, bankHolderName, IFSC },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw method addedd successfully");
        setBankName("");
        setAccountNumber(null);
        setBankHolderName("");
        setIFSC(null);
        setOpen(false);
        setPaymentMethods(false);
        dispatch(loadSeller());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const withdrawHandler=()=>{
    if(withdrawAmount>seller?.balance || withdrawAmount<50){
      return toast.error("Account balance is less");
    }
    axios.post(`${server}/withdraw/create-withdraw-request`, {withdrawAmount}, {withCredentials:true}).then((res)=>{
      toast.success('Withdraw request made successfully');
      dispatch(loadSeller());
      setOpen(false);
    }).catch((error)=>{
      console.log(error);
    })
  }

  const handleDelete=()=>{
    axios.delete(`${server}/shop/delete-payment-method`,   { withCredentials: true }).then((res)=>{
      toast.success("Bank account deleted successfully");
      setOpen(false);
      dispatch(loadSeller());
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white w-[300px] flex flex-col items-center py-4 rounded">
        <div className="text-[18px] font-[600]">
          Available balance: {seller?.balance || 0.00}
        </div>
        <div
          className={`${styles.button} text-white`}
          onClick={() => (seller?.balance<50?toast.error('Available balance is less'):setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen bg-[#00000084] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white p-3">
            <div
              className="flex justify-end cursor-pointer"
              onClick={() => setOpen(false) || setPaymentMethods(false)}
            >
              <RxCross1 size={20} />
            </div>
            {paymentMethods ? (
              <div>
                <form action="" onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <label htmlFor="">
                      Bank Name <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter bank name..."
                      required
                      className={`${styles.input} mt-2`}
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">
                      Account number <span className="text-[red] mt-4">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter account number..."
                      required
                      className={`${styles.input} mt-2`}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">
                      Bank holder name<span className="text-[red]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter bank holder name..."
                      required
                      className={`${styles.input} mt-2`}
                      value={bankHolderName}
                      onChange={(e) => setBankHolderName(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">
                      IFSC code <span className="text-[red]">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter IFSC code..."
                      required
                      className={`${styles.input} mt-2`}
                      value={IFSC}
                      onChange={(e) => setIFSC(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <input
                      type="submit"
                      value="Add"
                      className={`${styles.button} text-white`}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col">
                <h3 className="text-[22px] font-Poppins">
                  Available Payment methods
                </h3>
                {seller && seller.withdrawMethods ? (
                  <div>
                    <div className='flex items-center'>
                      <div>
                        <h5 className="mt-2">
                          Bank name: {seller.withdrawMethods.bankName}
                        </h5>
                        <h5>
                          Account number:
                          {" *".repeat(
                            seller.withdrawMethods.accountNumber.length - 3
                          ) + seller.withdrawMethods.accountNumber.slice(-3)}
                        </h5>
                      </div>
                      <AiOutlineDelete size={20} className="ml-[12px] cursor-pointer" onClick={handleDelete}/>
                    </div>
                    <h5 className="mt-4">
                      Available balance: {seller?.balance || 0.00}
                    </h5>
                    <div className="mt-2 md:flex md:gap-[4px] md:items-center">
                      <input
                        type="number"
                        className={`${styles.input} !h-[40px]`}
                        placeholder="Enter amount..."
                        value={withdrawAmount}
                        onChange={(e)=>setWithdrawAmount(e.target.value)}
                      />
                      <div className={`${styles.button} text-white`} onClick={withdrawHandler}>
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-[18px] pt-2">
                      No withdraw methods available
                    </p>
                    <div
                      className={`${styles.button} text-white`}
                      onClick={() => setPaymentMethods(true)}
                    >
                      Add new
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
