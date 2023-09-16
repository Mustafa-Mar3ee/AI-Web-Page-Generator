import { gql } from "@apollo/client";

export const _PromptSchema = {
    receivePrompt: gql`
    mutation ReceivePrompt($text: String!) {
      receivePrompt(text: $text)
    }
  `,
};