import { PublicKey } from "@solana/web3.js";
import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaFluxbeamSubmitFeePaymentTool extends Tool {
  name = "solana_submit_fee_payment";
  description = `This tool can be used to submit a fee payment transaction.

  Inputs (input is a JSON string):
  quoteReq: object, e.g., { "quote": { "payer": "SomePubKeyString", "fee": 1000000 } } (required)
  priorityFee: number, e.g., 100000 (required)`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input);

      const signature = await this.solanaKit.fluxbeamSubmitFeePayment(
        this.solanaKit,
        parsedInput.quoteReq,
        parsedInput.priorityFee,
      );

      return JSON.stringify({
        status: "success",
        message: "Fee payment transaction submitted successfully",
        transaction: signature,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export class SolanaFluxbeamSubmitFeeClaimTool extends Tool {
  name = "solana_submit_fee_claim";
  description = `This tool can be used to submit a fee claim transaction.

  Inputs (input is a JSON string):
  payer: string, e.g., "SomePubKeyString" (required)
  mint: string, e.g., "SomeMintPubKeyString" (required)
  priorityFee: number, e.g., 100000 (required)`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input);

      const signature = await this.solanaKit.fluxbeamSubmitFeeClaim(
        this.solanaKit,
        new PublicKey(parsedInput.payer),
        new PublicKey(parsedInput.mint),
        parsedInput.priorityFee,
      );

      return JSON.stringify({
        status: "success",
        message: "Fee claim transaction submitted successfully",
        transaction: signature,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}