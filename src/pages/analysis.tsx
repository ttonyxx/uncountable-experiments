import RootLayout from "@/components/Layout";
import BarChart from "@/components/BarChart";
import { Spinner } from "flowbite-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDataContext } from "@/context/DataProvider";
import { EXPERIMENT_OUTPUTS } from "@/utils/constants";

export default function Analysis() {
  const { experiments } = useDataContext();
  const [rangesMap, setRangesMap] = useState(new Map());

  useEffect(() => {
    const temp = new Map();

    EXPERIMENT_OUTPUTS.forEach((output) => {
      temp.set(output, {
        valid: false,
        lower: null,
        upper: null,
      });
    });

    setRangesMap(temp);
  }, [experiments]);

  const handleChange = (type: string, output: string, val: string) => {
    const temp = new Map(rangesMap);

    temp.get(output)[type] = val;
    temp.get(output).valid = isValid(output);

    setRangesMap(temp);
  };

  const isValid = useCallback(
    (output: string) => {
      const lower = rangesMap.get(output).lower;
      const upper = rangesMap.get(output).upper;
      return lower && upper && parseInt(lower) < parseInt(upper);
    },
    [rangesMap]
  );

  const matchingExperiments = useMemo(() => {
    if (!experiments || rangesMap.size == 0) return [];
    const res = [];

    for (const experimentId in experiments) {
      let match = true;
      for (const output of EXPERIMENT_OUTPUTS) {
        if (rangesMap.get(output).valid) {
          const val = experiments[experimentId].outputs[output];
          if (
            val > rangesMap.get(output).upper ||
            val < rangesMap.get(output).lower
          ) {
            match = false;
          }
        }
      }
      if (match) res.push(experimentId)
    }
    console.log(res)
    return res;
  }, [rangesMap, experiments]);

  return (
    <RootLayout home={false}>
      {!experiments || rangesMap.size == 0 ? (
        <Spinner color="info" aria-label="info spinner example" />
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-7 text-2xl font-bold">Enter some ranges</div>
          <div>
            <div className="relative rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-white-500">
                <thead className="text-xs text-gray-100 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Lower
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Upper
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EXPERIMENT_OUTPUTS.map((item) => (
                    <tr
                      key={item}
                      className="bg-gray-600 border-b border-gray-500"
                    >
                      <th
                        scope="row"
                        className={`text-gray-${
                          rangesMap.get(item).valid ? 200 : 800
                        } px-6 py-4 font-medium whitespace-nowrap transition-all`}
                      >
                        {item}
                      </th>
                      <td className="px-6 py-4">
                        <input
                          onChange={(event) =>
                            handleChange("lower", item, event.target.value)
                          }
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          onChange={(event) =>
                            handleChange("upper", item, event.target.value)
                          }
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-10">
              {matchingExperiments.map((id, i) => (
                <BarChart
                  key={i}
                  id={`input-${id}`}
                  label="Input"
                  inputs={experiments[id].inputs}
                  color="rgb(109, 253, 181)"
                ></BarChart>
              ))}
            </div>
          </div>
        </div>
      )}
    </RootLayout>
  );
}
