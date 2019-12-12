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

const CREATE_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!,
    $last_name: String!,
    $position: String!,
    $companyId: ID!,
  ) {
    createEmployee(input: {
      data: {
        first_name: $first_name,
        last_name: $last_name,
        position: $position,
        company: $companyId
      }
    }) {
      employee {
        first_name 
        last_name 
        position
        company {
          id
          name
          address
          description
        }
      }
    }
  }  
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee (
    $id: ID!,
    $first_name: String!,
    $last_name: String!,
    $position: String!
  ) {
    updateEmployee(input: {
      where: {
        id: $id,
      },
      data: {
        first_name: $first_name,
        last_name: $last_name,
        position: $position
      }
    }) {
      employee {
        first_name 
        last_name 
        position 
      }
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteCompany( $id: ID! )
  {
    deleteEmployee(input: {
      where: {
        id: $id,
      }
    }) {
      employee {
        first_name
        last_name 
        position 
      }
    }
  }  
`;

export default {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
}
