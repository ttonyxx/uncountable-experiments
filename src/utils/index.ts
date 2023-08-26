import { Experiment } from "../../types"

export function parseExperimentDataJSON(data:any) {
  const json = JSON.parse(data)
  const res = new Map<String, any>()
  for (const [key, value] of Object.entries(json)) {
    res.set(key, value)
  }
  return res
}