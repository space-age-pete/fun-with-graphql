import { gql } from "@apollo/client";

//QUERIES:

export const FETCH_RACERS_QUERY = gql`
  query {
    racers {
      name
      car
      id
      wins
    }
  }
`;

//MUTATIONS:

export const REGISTER_RACER_MUTATION = gql`
  mutation makeRacer($name: String!, $car: String!) {
    registerRacer(name: $name, car: $car) {
      id
      name
      car
      wins
    }
  }
`;

export const INCREMENT_RACER_WINS_MUTATION = gql`
  mutation winRace($id: ID!) {
    winRace(id: $id) {
      id
      name
      car
      wins
    }
  }
`;

export const DELETE_RACER_MUTATION = gql`
  mutation killRacer($id: ID!) {
    killRacer(id: $id)
  }
`;
