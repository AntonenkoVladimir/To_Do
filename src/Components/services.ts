import {gql} from "@apollo/client";

export const tasksQuery = gql`
  query {
   allTasks {
      id,
      text,
      isCheck
    }
  }
`;

export const addTask = gql`
  mutation($text: String!) {
    addTask(text: $text, isCheck: false) {
      id,
      text,
      isCheck
    }
  }
`;

export const updateTask = gql`
  mutation($id: ID!, $text: String!, $isCheck: Boolean!) {
   updateTask(id: $id, text: $text, isCheck: $isCheck) {
      id,
      text,
      isCheck
    }
  }
`;

export const deleteTask = gql`
  mutation($id: ID!) {
   deleteTask(id: $id) {
      id
    }
  }
`;

