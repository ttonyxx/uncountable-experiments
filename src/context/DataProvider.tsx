import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { Experiments } from "../../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DataContext {
  experiments: Experiments | undefined;
}

const DataContext = createContext<DataContext>({experiments: undefined});

export function DataProvider({children} : {children: any}) {
  const { data, error } = useSWR("/api/staticdata", fetcher);
  const [experiments, setExperiments] = useState<Experiments>();

  useEffect(() => {
    if (data) {
      setExperiments(JSON.parse(data));
    }
  }, [data]);
  
  return (
    <DataContext.Provider value={{experiments}}>{children}</DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}