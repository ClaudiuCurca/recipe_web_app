import { RecipeForm } from "@/common.types";
import {
  RecipesQuery,
  RecipesQueryByCategory,
  RecipesQueryByTitle,
  createRecipeMutation,
  createUserMutation,
  deleteRecipeMutation,
  getRecipeByIdQuery,
  getRecipesOfUserQuery,
  getUserQuery,
  updateRecipeMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "1234";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const getUser = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email });
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createNewRecipe = async (
  form: RecipeForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createRecipeMutation, variables);
  }
};

export const fetchAllRecipes = async (
  category?: string | null,
  endCursor?: string
) => {
  client.setHeader("x-api-key", apiKey);

  if (category) {
    return makeGraphQLRequest(RecipesQueryByCategory, { category, endCursor });
  } else {
    return makeGraphQLRequest(RecipesQuery, { endCursor });
  }
};

export const fetchRecipesByTitle = async (
  searchTerm: string,
  endCursor?: string
) => {
  client.setHeader("x-api-key", apiKey);

  const title = `(?i).*${searchTerm}.*`;

  return makeGraphQLRequest(RecipesQueryByTitle, { title, endCursor });
};

export const getUserRecipes = async (id: string, last: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getRecipesOfUserQuery, { id, last });
};

export const getRecipeDetails = async (id: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getRecipeByIdQuery, { id });
};

export const updateRecipe = async (
  form: RecipeForm,
  recipeId: string,
  token: string
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...form, image: imageUrl.url };
    }
  }

  const variables = {
    id: recipeId,
    input: updatedForm,
  };

  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(updateRecipeMutation, variables);
};

export const deleteRecipe = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteRecipeMutation, { id });
};
