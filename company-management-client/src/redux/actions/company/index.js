export const fetchCompany = id => {
  return fetch(`http://localhost:1337/companies/${id}`, {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`
    }
  })
    .then(res => res.json())
    .then(companies => {
      return {
        type: 'FETCH_COMPANY',
        payload: { companies }
      }
    })
};

export const fetchCompanies = () => {
  return function (dispatch) {
    return fetch(
      `http://localhost:1337/companies/`,
      {
        headers: {
        authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`
        }
      }
    )
    .then(res => res.json())
    .then(companies => {
      dispatch({
        type: 'FETCH_COMPANIES',
        payload: { companies }
      })
    })
  }
};
