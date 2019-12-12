import gql from 'graphql-tag';

const GET_COMPANY = gql`
  query getCompany($id: ID!) {
    company( id: $id ) {
      name
      employees {
        id
        first_name
        last_name
        position
      }
    }
  }
`;

export default {
  GET_COMPANY
}
