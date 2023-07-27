export const getUserQuery = `
query GetUser($email: String!) {
    user(by: {email: $email}) {
      name
      email
      avatarUrl
      description
      id
    }
  }
`;

export const createUserMutation = `
mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
        user {
            name
            email
            avatarUrl
            description
            id
        }
    }
}

`;

export const createRecipeMutation = `
mutation CreateRecipe($input: RecipeCreateInput!) {
  recipeCreate(input: $input) {
    recipe {
      id
      title
      description
      createdBy {
        email
        name
      }
    }
  }
}
`;

export const RecipesQuery = `
query getRecipes($endCursor: String) {
  recipeSearch(first: 8, after: $endCursor) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        title
        description
        id
        image
        category
        createdBy {
          id
          name
          avatarUrl
        }
      }
    }
  }
}
`;

export const RecipesQueryByCategory = `
query getRecipes($category: String, $endCursor: String) {
  recipeSearch(first: 8, after: $endCursor, filter: {category: {eq: $category}}) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        title
        description
        id
        image
        category
        createdBy {
          id
          email
          name
          avatarUrl
        }
      }
    }
  }
}
`;

export const RecipesQueryByTitle = `
query getRecipes($title: String, $endCursor: String) {
  recipeSearch(first: 8, after: $endCursor, filter: {title: {regex: $title}}) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        title
        description
        id
        image
        category
        createdBy {
          id
          email
          name
          avatarUrl
        }
      }
    }
  }
}
`;

export const getRecipeByIdQuery = `
query GetRecipeById($id: ID!) {
  recipe(by: { id: $id }) {
    id
    title
    description
    image
    category
    createdBy {
      id
      name
      avatarUrl
    }
  }
}
`;

export const getRecipesOfUserQuery = `
query getUserRecipes($id: ID!, $last: Int!) {
  user(by: { id: $id }) {
    id
    name
    description
    avatarUrl
    recipes(last: $last) {
      edges {
        node {
          title
          description
          image
          category
          id
        }
      }
    }
  }
}
`;

export const deleteRecipeMutation = `
mutation DeleteRecipe($id: ID!) {
  recipeDelete(by: { id: $id }) {
    deletedId
  }
}
`;

export const updateRecipeMutation = `
mutation UpdateRecipe($id: ID!, $input: RecipeUpdateInput!) {
  recipeUpdate(by: { id: $id }, input: $input) {
    recipe {
      id
      title
      description
      createdBy {
        email
        name
      }
    }
  }
}
`;
