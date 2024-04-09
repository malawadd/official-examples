import React, { useState, useEffect } from "react";
import { useAccounts } from "../hooks/useAccounts";
import ClaimHello from "./ClaimHello";

const HelloTokenSection = () => {

  const { accounts, selectedAccount, setSelectedAccount } = useAccounts();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    setDropdownOpen(false);
    console.log(selectedAccount);
  };

  const renderAccountLabel = (account) => {
    const shortAddress = `${account.address.slice(
      0,
      4,
    )}...${account.address.slice(-6)}`;
    return `${account.label || "Account"} ${shortAddress}`;
  };

  return (
    <>
      <div className="heading-section">
        <h2>Get Your Hello Token</h2>
        <p className="get-hello-token-text">
          Claim your <span className="hello-token-pink">Hello Token</span>
        </p>
      </div>
      <div className="hello-token-container">
        <div className="hello-token-left-col">
          <h4>Have you Setup Dev Mode</h4>
          <p>
            In order to receive your{" "}
            <span className="hello-token-pink-sm">Hello Token</span> please set
            up Dev Mode first using the steps above.
          </p>
          {/* <!-- ************ Custom Select ****************** --> */}
          {accounts.length > 0 && (
            <>
              <div className="custom-select">
                <button
                  className="select-button"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  onClick={toggleDropdown}
                  aria-controls="select-dropdown"
                >
                  <span className="selected-value">
                    {selectedAccount
                      ? renderAccountLabel(
                          accounts.find(
                            (acc) => acc.address === selectedAccount,
                          ),
                        )
                      : "Select an Account"}
                  </span>
                  <span className="arrow"></span>
                </button>
                {dropdownOpen && (
                  <ul
                    className="select-dropdown"
                    role="listbox"
                    id="select-dropdown"
                  >
                    {accounts.map((account) => (
                      <li
                        key={account.address}
                        role="option"
                        onClick={() => handleSelectAccount(account.address)}
                      >
                        <label>{renderAccountLabel(account)}</label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ClaimHello selectedAccount={selectedAccount} />
            </>
          )}
        </div>
        {/* <!-- vert-bar --> */}
        <div
          style={{
            width: "0%",
            height: "100%",
            opacity: 0.3,
            boxShadow: "0px 5.25px 5.25px rgba(0, 0, 0, 0.25)",
            border: "1px solid white",
          }}
        ></div>
        {/* <!-- vert-bar --> */}
        <div className="hello-tokens">
          <img src="src/assets/hello-tokens.png" alt="hello tokens" />
        </div>
      </div>
    </>
  );
};

export default HelloTokenSection;
