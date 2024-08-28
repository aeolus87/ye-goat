import React from "react";

const KofiPage = () => {
  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400 sm:text-4xl">
            Support My Work
          </h2>
          <p className="mt-4 text-xl text-yellow-300">
            If you enjoy this content, consider buying me a coffee!
          </p>
        </div>
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="flex flex-nowrap space-x-4 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 no-scrollbar">
            {[1, 3, 5].map((amount) => (
              <div key={amount} className="w-64 flex-shrink-0 sm:w-auto">
                <div className="flow-root bg-yellow-400 rounded-lg shadow-lg px-6 pb-8 h-full">
                  <div className="pt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-yellow-800 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {amount} Coffee{amount > 1 ? "s" : ""}
                    </h3>
                    <p className="mt-5 text-base text-gray-900">
                      Support me with {amount} coffee{amount > 1 ? "s" : ""}!
                      Every bit helps and is greatly appreciated.
                    </p>
                    <div className="mt-6">
                      <a
                        href={`https://ko-fi.com/aeodev/donate?amount=${
                          amount * 3
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-800 hover:bg-orange-800"
                      >
                        Donate ${amount * 3}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KofiPage;
