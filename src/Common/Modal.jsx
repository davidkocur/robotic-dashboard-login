import React from "react";
import Button from "./Button";

const Alert = ({ show, onClose }) => {
  const cssHidden = show ? "block" : "hidden";
  const ariaHidden = show ? "visible" : "hidden";
  const isOk = show === "ok";

  return (
    <div
      tabIndex="-1"
      className={`${cssHidden} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 h-full flex justify-center items-center`}
      aria-hidden={ariaHidden}
      role="modal"
      data-testid="alert-modal"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-gray-900 opacity-20 animation-fade-in"></div>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-sm shadow animation-scale-in">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-brand-fade hover:text-gray-800 rounded-md text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 w-14 h-14">
              {isOk ? (
                <svg
                  aria-hidden="true"
                  className="text-success"
                  fill="currentColor"
                  stroke="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="text-danger"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              {isOk ? "Success. You have been signed in." : "Whoops. Something went wrong..."}
            </h3>

            <Button
              type="button"
              name="confirm"
              onClick={onClose}
              secondary
              className="inline-block w-auto"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
