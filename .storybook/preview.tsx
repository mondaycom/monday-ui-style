import { Preview } from "@storybook/react";
import { DocsContainer, DocsPage, Unstyled } from "@storybook/blocks";
import {
  AnchorListItem,
  ComponentName,
  ComponentRules,
  DocFooter,
  Frame,
  FunctionArgument,
  FunctionArguments,
  LinkComponent,
  MultipleStoryElementsWrapper,
  Paragraph,
  RelatedComponent,
  RelatedComponents,
  SectionName,
  Title,
  UnstyledList,
  UnstyledListItem,
  UsageGuidelines
} from "vibe-storybook-components";
import { ComponentNameDecorator } from "../storybook/components";
import "../src/index.scss";

const preview: Preview = {
  parameters: {
    docs: {
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          <Unstyled>
            {children}
            {<DocFooter feedbackFormLink={"// TODO add feedbackFormLink"} />}
          </Unstyled>
        </DocsContainer>
      ),
      page: DocsPage,
      components: {
        h1: ComponentNameDecorator,
        ComponentName: ComponentNameDecorator,
        h2: SectionName,
        h3: Title,
        li: AnchorListItem,
        a: LinkComponent,
        p: Paragraph,
        SectionName,
        ComponentRules,
        UsageGuidelines,
        FunctionArguments,
        FunctionArgument,
        RelatedComponent,
        RelatedComponents,
        Frame,
        UnstyledList,
        UnstyledListItem
      }
    }
  },
  decorators: [
    (Story, { className }) => {
      return (
        <MultipleStoryElementsWrapper className={className}>
          <Story />
        </MultipleStoryElementsWrapper>
      );
    }
  ]
};

export default preview;
