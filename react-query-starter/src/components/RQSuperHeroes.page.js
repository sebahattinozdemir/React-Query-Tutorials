import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  // used when open a modal or navigating the other page depends on the data status data is injected automotically when onSuccess
  const onSuccess = (data) => {
    console.log("Succesfuly gets the data", data);
  };

  const onError = (error) => {
    console.log("Error while getting data", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      cacheTime: 5000, // cacheTime is defaul 5 muntes
      staleTime: 5000, // use it when data does not change often it descreases the network request default 0
      refetchOnMount: true, // default true whenever component changes network request happen
      refetchOnWindowFocus: true, // async with real time data, default true whenever db changes ne request it is usded for realtime data
      refetchInterval: 2000, // get data every two seconds
      refetchIntervalInBackground: true, // to use it with refetchInterval Together
      enabled: false, // prevents automatically to fetching data by default true, if it is false data will not come,
      onSuccess: onSuccess,
      onError: onError,
      //data transformation,
    }
  );

  if (isLoading || isFetching) {
    return <h1>LOADING...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Data</button>
      {data?.data.map((hero) => (
        <p key={hero.name}>{hero.name}</p>
      ))}
    </>
  );
};
