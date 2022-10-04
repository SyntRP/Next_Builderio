## Getting Started

First, run the development server:

```bash
npm run dev -- -p 3005
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

- In the root of your project, create a folder called `components`.
- Inside the `components` folder, create a file named `heading.tsx`
- Paste the following code in **heading.tsx**

```javascript
import { Builder } from "@builder.io/react";

export const Heading = (props) => (
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
```

- Have look at this [`documentation`](https://www.builder.io/blog/drag-drop-react) for more information.
