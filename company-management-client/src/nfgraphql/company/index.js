import gql from 'graphql-tag';

const QUERY_COMPANIES = gql`
  query {
    companies {
      id
      name
      address
      description
    }
  }
`;

const QUERY_COMPANY = gql`
  query QueryCompany($id: ID!) {
    company( id: $id ) {
      id
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

const CREATE_COMPANY = gql`
  mutation AddCompany(
    $name: String!,
    $description: String!,
    $address: String!
  ) {
    createCompany(input: {
      data: {
        name: $name,
        description: $description,
        address: $address
      }
    }) {
      company {
        name
        description
        address
      }
    }
  }  
`;

const UPDATE_COMPANY = gql`
  mutation UpdateCompany (
    $id: ID!,
    $name: String!,
    $description: String!,
    $address: String!
  ) {
    updateCompany(input: {
      where: {
        id: $id,
      },
      data: {
        name: $name,
        description: $description,
        address: $address
      }
    }) {
      company {
        name
        description
        address
      }
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation DeleteCompany( $id: ID! )
  {
    deleteCompany(input: {
      where: {
        id: $id,
      }
    }) {
      company {
        name
        description
        address
      }
    }
  }  
`;

export default {
  QUERY_COMPANIES,
  QUERY_COMPANY,
  CREATE_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY
}
