/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import * as AWS from 'aws-sdk';

import getParamsForPath from './get-params-for-path';

export default function getParamsForPathArray(
  ssm: AWS.SSM,
  paths: string[]
): Promise<{}[]> {
  const varsOverEnv = process.env;
  const newVarsOnly = {};

  return paths.reduce(
    (pr, path) =>
      pr.then(async ([allVars, newVars]) => {
        const params = await getParamsForPath(ssm, path);

        params.forEach(p => {
          const name = p.Name?.split('/').pop()?.toUpperCase() || '';
          if (!newVars.hasOwnProperty(name)) {
            (newVars as any)[name] = p.Value;
          }
          if (!allVars.hasOwnProperty(name)) {
            (allVars as any)[name] = p.Value;
          }
        });
        return [allVars, newVars];
      }),
    Promise.resolve([varsOverEnv, newVarsOnly])
  );
}
