import CrudRepository from "crud-repository";
import async from "async";

export default class AllRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "", includes: [] });
  }

  getAxieDetails = async id => {
    const result = await this.$axios.$post(
      `${this.resource}`,
      '{"operationName":"GetAxieDetail","variables":{"axieId":"' +
        parseInt(id) +
        '"},"query":"query GetAxieDetail($axieId: ID!) {\\n  axie(axieId: $axieId) {\\n    ...AxieDetail\\n    __typename\\n  }\\n}\\n\\nfragment AxieDetail on Axie {\\n  id\\n  image\\n  class\\n  name\\n  genes\\n  owner\\n  birthDate\\n  bodyShape\\n  class\\n  sireId\\n  sireClass\\n  matronId\\n  matronClass\\n  stage\\n  title\\n  breedCount\\n  level\\n  figure {\\n    atlas\\n    model\\n    image\\n    __typename\\n  }\\n  parts {\\n    ...AxiePart\\n    __typename\\n  }\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  auction {\\n    ...AxieAuction\\n    __typename\\n  }\\n  ownerProfile {\\n    name\\n    __typename\\n  }\\n  battleInfo {\\n    ...AxieBattleInfo\\n    __typename\\n  }\\n  children {\\n    id\\n    name\\n    class\\n    image\\n    title\\n    stage\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieBattleInfo on AxieBattleInfo {\\n  banned\\n  banUntil\\n  level\\n  __typename\\n}\\n\\nfragment AxiePart on AxiePart {\\n  id\\n  name\\n  class\\n  type\\n  specialGenes\\n  stage\\n  abilities {\\n    ...AxieCardAbility\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieCardAbility on AxieCardAbility {\\n  id\\n  name\\n  attack\\n  defense\\n  energy\\n  description\\n  backgroundUrl\\n  effectIconUrl\\n  __typename\\n}\\n\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\\nfragment AxieAuction on Auction {\\n  startingPrice\\n  endingPrice\\n  startingTimestamp\\n  endingTimestamp\\n  duration\\n  timeLeft\\n  currentPrice\\n  currentPriceUSD\\n  suggestedPrice\\n  seller\\n  listingIndex\\n  __typename\\n}\\n"}', //
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );

    return result.data.axie;
  };

  getAxieBriefList = async variables => {
    const result = await this.$axios.$post(
      `${this.resource}`,
      JSON.stringify({
        operationName: "GetAxieBriefList",
        variables,
        query:
          "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  genes\n  sireId\n  matronId\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n    __typename\n  }\n  __typename\n}\n"
      }),
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );

    return result.data.axies;
  };

  getAxies = async variables => {
    let from = 0;
    const SIZE = 24 * 3;
    // const MAX = 100;
    // const SIZE = 100;

    const resAxies = await this.getAxieBriefList({
      ...variables,
      size: SIZE
    });

    const { results, total } = resAxies;

    let axies = [...results];

    // const arrayPages = new Array(Math.ceil((total - SIZE) / SIZE))
    //   .fill(1)
    //   .map((_, index) => (index + 1) * SIZE)

    // await arrayPages.reduce(async (previousPromise, from, index) => {
    //   await previousPromise;
    //   if (from < MAX) {
    //     const { results } = await this.getAxieBriefList({
    //       ...variables,
    //       size: SIZE,
    //       from
    //     });
    //     axies = [...axies, ...results];
    //   } else {
    //     // await previousPromise;
    //     // console.log("no entro");
    //   }
    // }, Promise.resolve());

    return axies;
  };
}
