import RootLayout from "@/components/Layout";
import BarChart from "@/components/BarChart";
import { Spinner } from "flowbite-react";
import { useMemo, useState } from "react";
import { Experiment, Experiments } from "../../types";
import Table from "@/components/Table";
import { useDataContext } from "@/context/DataProvider";

export default function Experiments() {
  const { experiments } = useDataContext()
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment>();

  const experimentIds = useMemo(
    () => (experiments ? Object.keys(experiments) : []),
    [experiments]
  );

  const handleExperimentSelect = (event: any) => {
    setSelectedExperiment(experiments![event.target.value]);
  };

  return (
    <RootLayout home={false}>
      {!experiments ? (
        <Spinner color="info" aria-label="info spinner example" />
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-64 mb-10">
            <select
              onChange={handleExperimentSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Select an experiment</option>
              {experimentIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>
          <div>
            {selectedExperiment ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row w-full justify-between gap-4">
                  <BarChart
                    id={`input`}
                    label="Input"
                    inputs={selectedExperiment.inputs}
                    color="rgb(109, 253, 181)"
                    reset={true}
                  ></BarChart>
                  <BarChart
                    id={`output`}
                    label="Output"
                    inputs={selectedExperiment.outputs}
                    color="rgb(255, 99, 132)"
                    reset={true}
                  ></BarChart>
                </div>
                <div className="flex flex-row justify-around">
                  <Table inputs={selectedExperiment.inputs}></Table>
                  <Table inputs={selectedExperiment.outputs}></Table>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </RootLayout>
  );
}
