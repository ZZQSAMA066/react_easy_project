import fetchApi from '@/api/service/config';
import graphqlWrapper from '@/utils/queryGenerator'

async function allTests(parms = {}) {
  // const data = await graphqlWrapper(
  //   'allTests',
  //   `allTests($origin: String!) {
  //     allTests(origin: $origin) {
  //       id,
  //       title
  //     }
  //   }`,
  //   'query ', 
  //   {
  //     origin: parms.origin,
  //   },
  // );
  const date = await graphqlWrapper(
    'allCompanies',
    `allCompanies{
      allCompanies{
        id,
        name,
        industry
      }
    }`,
    'query'
  )
  //console.log(fetchApi(date));
  const result = fetchApi(date)
  //console.log(result);
  return result;
}

async function deleteTest(parms = {}) {
  console.log(parms);
  const data=await graphqlWrapper(
    'deleteTest',
    `deleteTest($id: ID!) {
      deleteTest(id: $id)
    }`,
    'mutation',
    {
      id:parms.id,
    },
  );
  const result=fetchApi(data);
  /*const result = await fetchApi({
      operationName: 'deleteTest',
      query: `mutation deleteTest($id: ID!) {
      deleteTest(id: $id)
    }`,
      variables: {
        ...parms,
      },
    },
    'deleteTest',
  );*/
  return result;
}

async function addCompany(parms={}){
  //console.log(parms);
  const data=await graphqlWrapper(
    'addCompany',
    `addCompany($name:String!,$industry:String!) {
      addCompany(name:$name,industry:$industry) {
        id,
        name,
        industry
      }
    }`,
    'mutation',
    {
      name:parms.name,
      industry:parms.industry
    },
  );
  const result=fetchApi(data);
  return result;
}

async function editCompany(parms={}){
  //console.log(parms);
  const data = await graphqlWrapper(
    'editCompany',
    `editCompany($name:String!,$industry:String!) {
      editCompany(name:$name,industry:$industry) {
        id,
        name,
        industry
      }
    }`,
    'mutation',
    {
      name:parms.name,
      industry:parms.industry
    },
  );
  const result=await fetchApi(data);
  return result;
}

export {
  allTests,
  deleteTest,
  addCompany,
  editCompany
};
