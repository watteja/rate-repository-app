import { gql } from "@apollo/client";

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    id
    fullName
    language
    description
    stargazersCount
    reviewCount
    forksCount
    ratingAverage
    ownerAvatarUrl
  }
`;
