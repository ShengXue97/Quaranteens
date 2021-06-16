/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const createForum = /* GraphQL */ `
  mutation CreateForum(
    $input: CreateForumInput!
    $condition: ModelForumConditionInput
  ) {
    createForum(input: $input, condition: $condition) {
      id
      title
      content
      userID
      votes
      comments
    }
  }
`;
export const updateForum = /* GraphQL */ `
  mutation UpdateForum(
    $input: UpdateForumInput!
    $condition: ModelForumConditionInput
  ) {
    updateForum(input: $input, condition: $condition) {
      id
      title
      content
      userID
      votes
      comments
    }
  }
`;
export const deleteForum = /* GraphQL */ `
  mutation DeleteForum(
    $input: DeleteForumInput!
    $condition: ModelForumConditionInput
  ) {
    deleteForum(input: $input, condition: $condition) {
      id
      title
      content
      userID
      votes
      comments
    }
  }
`;
