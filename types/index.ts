export interface Experiments {
  [key: string]: Experiment;
}

export interface Experiment {
  id?: string;
  inputs: ExperimentData;
  outputs: ExperimentData;
}

export type ExperimentData = {
  [key: string]: number;
};

