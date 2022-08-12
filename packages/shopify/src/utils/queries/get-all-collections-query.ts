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
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          # products(first: 1) {
          #   node {
          #     id
          #   }
          # }
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
