import { Builder } from "@builder.io/react";
interface HeadingProps {
  color?: string;
  title?: string | number;
}
export const Heading = (props: HeadingProps) => (
  <h1 style={{ color: props.color }}>{props.title}</h1>
);

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: "I am a heading!",
    },
    {
      name: "color",
      type: "color",
      defaultValue: "black",
    },
  ],
});
