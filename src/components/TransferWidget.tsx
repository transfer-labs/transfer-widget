import React, { useMemo, useState, FunctionComponent } from "react";
import ActionButton, { ActionButtonProps } from "./ActionButton";
import TextButton, { TextButtonProps } from "./TextButton";
import TokenNetworkInput, {TokenNetworkInputProps} from "./TokenNetworkInput";

export interface TransferWidgetProps {
  actionbutton: ActionButtonProps;
  fromtokennetworkinput: TokenNetworkInputProps;
  totokennetworkinput: TokenNetworkInputProps;
}

export const TransferWidget: FunctionComponent<TransferWidgetProps> = ({
  actionbutton, fromtokennetworkinput, totokennetworkinput
}) => {
  return (
    <div className="inline-flex flex-col py-5 px-6 gap-6 border rounded-lg border-border-color bg-modal-background  w-[475px]">
      <div className="flex flex-col gap-3">
        <p className="text-white font-manrope font-bold text-xl">Transfer</p>
         <TokenNetworkInput {...fromtokennetworkinput} />
         <TokenNetworkInput {...totokennetworkinput} />
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
