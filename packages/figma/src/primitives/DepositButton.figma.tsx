import figma from '@figma/code-connect';
import { DepositButton } from '@tomasz-wlodarczyk-pawatech/components/primitives/deposit-button/DepositButton';

figma.connect(DepositButton, '<FIGMA_DEPOSIT_BUTTON>', {
  props: {
    showChevron: figma.boolean('Icon', { true: true, false: false }),
  },
  example: ({ showChevron }) => <DepositButton balance="GH₵ 882.10" showChevron={showChevron} />,
});
