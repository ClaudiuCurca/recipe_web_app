import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ min: 10 }).optional(),
    recipes: g
      .relation(() => Recipe)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Recipe = g
  .model("Recipe", {
    title: g.string().length({ min: 2, max: 20 }).search(),
    description: g.string().length({ min: 10 }),
    image: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

// const comment = g.model("Comment", {
//   post: g.relation(post),
//   body: g.string(),
//   likes: g.int().default(0),
//   author: g.relation(() => user).optional(),
// });

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(), // this makes all the functionality private but you can set different elements public
  },
});
