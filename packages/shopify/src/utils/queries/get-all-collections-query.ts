const getSiteCollectionsQuery = /* GraphQL */ `
  query getSiteCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          image {
            id
            originalSrc
          }
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
