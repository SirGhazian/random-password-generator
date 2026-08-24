import { useState } from "react";
import HeaderLogo from "./headerLogo";

export default function MainGenerator() {
  const [isCopied, setIsCopied] = useState(false);

  const [password, setPassword] = useState("");
  const [pwLength, setPwLength] = useState(15);
  const [pwOption, setPwOption] = useState({
    alphabet: true,
    number: false,
    symbol: false,
  });

  function generatePassword() {
    const charsetAlphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsetNumber = "01234567890123456789";
    const charsetSymbol =
      "!@#$%^&*()-=_+[]{}|;:',.<>?/";

    let charset = "";
    let content = "";

    if (pwOption.alphabet)
      charset += charsetAlphabet;
    if (pwOption.number) charset += charsetNumber;
    if (pwOption.symbol) charset += charsetSymbol;

    for (
      let index = 0;
      index < pwLength;
      index++
    ) {
      content += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }

    // Set And Change Password
    setPassword(content);
    // Change Copy Button Color
    setIsCopied(false);
  }

  function copyText() {
    // Copy text
    navigator.clipboard.writeText(password);
    // Change Copy Button Color
    setIsCopied(true);
  }

  return (
    <>
      <div className="sm:w-full md:w-[40rem]">
        <div className="py-9 sm:px-8 md:px-24 mx-4 rounded-xl flex flex-col items-center justify-center bg-base-200 border-b-2 border-secondary">
          <div className="w-5 m-2">
            <HeaderLogo />
          </div>

          <p className="mb-6 font-semibold text-secondary">
            Password Randomizer
          </p>

          <div className="flex flex-row w-full">
            <div className="relative w-full h-12 mr-2">
              <input
                type="text"
                // If no value, input text is Password Goes Here
                // Prevent user to copy if no value, just like first render
                value={
                  !password
                    ? "Password Goes Here"
                    : password
                }
                className="input input-bordered input-accent h-full w-full"
                readOnly
              />
              <div className="absolute top-3 right-4"></div>
            </div>

            {/* --- BUTTON COPY --- */}
            <button
              // If no password, disable copy
              disabled={!password ? true : false}
              onClick={() => copyText()}
              className={`btn mr-2 ${
                isCopied
                  ? "btn-accent"
                  : "btn-secondary"
              }`}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
            {/* --- BUTTON COPY --- */}
          </div>

          {/* ----- SLIDER LENGTH ----- */}
          <div className="w-full mt-8 mb-10">
            <p className="mb-4">
              Password Length:{" "}
              <span className="font-bold">
                {pwLength}
              </span>
            </p>
            <input
              type="range"
              min="1"
              max="50"
              value={pwLength}
              className="range range-sm"
              onChange={(e) =>
                setPwLength(
                  Number(e.target.value)
                )
              }
            />
          </div>
          {/* ----- SLIDER LENGTH ----- */}

          {/* ------ TOGGLE INPUT CHARSET ------ */}
          <div className="w-full mb-12">
            <div className="form-control">
              {/* (Checkbox Alphabet) */}
              <label className="label cursor-pointer">
                <span className="label-text mr-4">
                  With Alphabet?
                </span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={pwOption.alphabet}
                  onChange={() =>
                    setPwOption({
                      ...pwOption,
                      alphabet:
                        !pwOption.alphabet,
                    })
                  }
                />
              </label>

              {/* (Checkbox Number) */}
              <label className="label cursor-pointer">
                <span className="label-text mr-4">
                  With Numeric?
                </span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={pwOption.number}
                  onChange={() =>
                    setPwOption({
                      ...pwOption,
                      number: !pwOption.number,
                    })
                  }
                />
              </label>

              {/* (Checkbox Symbol) */}
              <label className="label cursor-pointer">
                <span className="label-text mr-4">
                  With Symbol?
                </span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={pwOption.symbol}
                  onChange={() =>
                    setPwOption({
                      ...pwOption,
                      symbol: !pwOption.symbol,
                    })
                  }
                />
              </label>
            </div>
          </div>
          {/* ------ TOGGLE INPUT CHARSET ------ */}

          {/* ------ BUTTON GENERATE ------ */}
          <button
            onClick={() => generatePassword()}
            className="btn btn-secondary w-full"
          >
            <i className="fa-solid fa-arrows-rotate translate-y-[1.5px] mr-1" />
            <span>Generate</span>
          </button>
          {/* ------ BUTTON GENERATE ------ */}
        </div>
      </div>
    </>
  );
}
