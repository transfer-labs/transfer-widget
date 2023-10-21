import React, { useMemo, useState, FunctionComponent } from "react";
import ActionButton, { ActionButtonProps } from "./ActionButton";
import TextButton, { TextButtonProps } from "./TextButton";

export interface TransferWidgetProps {
  actionbutton: ActionButtonProps;
}

export const TransferWidget: FunctionComponent<TransferWidgetProps> = ({
  actionbutton,
}) => {
  return (
    <div className="inline-flex flex-col py-5 px-6 gap-6 border rounded-lg border-border-color bg-modal-background  w-[450px]">
      <div className="flex flex-col gap-3">
        <p className="text-white font-manrope font-bold text-xl">Transfer</p>
        <div className="flex flex-col gap-1">
          <div className="flex px-4 py-3 flex-col gap-1 w-full  border rounded-lg border-border-color bg-component-background">
            <p className="text-white font-manrope text-lg font-medium">From</p>
            <div className="flex flex-row w-full items-center gap-1 ">
              <input
                className="bg-component-background text-white border-none outline-none text-3xl w-full"
                type="text"
                placeholder="0"
              />
              <div className="flex flex-row gap-2 items-center">
                <a href="#" className="text-unselected-text whitespace-nowrap">
                  Select source chain and token
                </a>
                <svg
                  width="43"
                  height="40"
                  viewBox="0 0 64 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M57.6155 36.7243C58.2024 34.4136 58.5143 31.9931 58.5143 29.4998C58.5143 13.3415 45.4154 0.242676 29.2571 0.242676C13.0989 0.242676 0 13.3415 0 29.4998C0 45.6581 13.0989 58.757 29.2571 58.757C34.4339 58.757 39.2966 57.4125 43.5152 55.0536C41.9733 53.0384 41.0571 50.519 41.0571 47.7855C41.0571 41.1739 46.4169 35.8141 53.0286 35.8141C54.6535 35.8141 56.2028 36.1378 57.6155 36.7243ZM57.3501 37.698C56.0239 37.1291 54.563 36.8141 53.0286 36.8141C46.9692 36.8141 42.0571 41.7262 42.0571 47.7855C42.0571 50.3359 42.9273 52.683 44.387 54.5462C50.5858 50.7936 55.2797 44.8047 57.3501 37.698Z"
                    fill="#242424"
                  />
                  <circle
                    cx="53.0286"
                    cy="47.7854"
                    r="10.9714"
                    fill="#242424"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex px-4 py-3 flex-col gap-1 w-full  border rounded-lg border-border-color bg-component-background">
            <p className="text-white font-manrope text-lg font-medium">To</p>
            <div className="flex flex-row w-full items-center gap-1 ">
              <input
                className="bg-component-background text-white border-none outline-none text-3xl w-full"
                type="text"
                placeholder="0"
              />
              <div className="flex flex-row gap-2 items-center">
                <a href="#" className="text-unselected-text whitespace-nowrap">
                  Select destination chain and token
                </a>
                <svg
                  width="43"
                  height="40"
                  viewBox="0 0 64 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M57.6155 36.7243C58.2024 34.4136 58.5143 31.9931 58.5143 29.4998C58.5143 13.3415 45.4154 0.242676 29.2571 0.242676C13.0989 0.242676 0 13.3415 0 29.4998C0 45.6581 13.0989 58.757 29.2571 58.757C34.4339 58.757 39.2966 57.4125 43.5152 55.0536C41.9733 53.0384 41.0571 50.519 41.0571 47.7855C41.0571 41.1739 46.4169 35.8141 53.0286 35.8141C54.6535 35.8141 56.2028 36.1378 57.6155 36.7243ZM57.3501 37.698C56.0239 37.1291 54.563 36.8141 53.0286 36.8141C46.9692 36.8141 42.0571 41.7262 42.0571 47.7855C42.0571 50.3359 42.9273 52.683 44.387 54.5462C50.5858 50.7936 55.2797 44.8047 57.3501 37.698Z"
                    fill="#242424"
                  />
                  <circle
                    cx="53.0286"
                    cy="47.7854"
                    r="10.9714"
                    fill="#242424"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActionButton {...actionbutton} />
    </div>
  );

  // return (
  //   <div>
  //     <ActionButton {...actionbutton} />
  //     <TextButton {...textbutton}/>
  //   </div>
  // )
};
