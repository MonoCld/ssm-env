/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

import getParamsForPathArray from '../lib/get-params-for-path-array';
import getSsm from '../lib/get-ssm';
import getPaths from '../lib/get-parameter-paths';

function writeDotenv(o: Object): void {
  for (const key in o) {
    process.stdout.write(`${key}=${JSON.stringify((o as any)[key])}\n`);
  }
  process.stdout.write('\n');
}

export default async function exportEnv(argv: any): Promise<void> {
  const ssm = getSsm(argv);

  const paths = getPaths(argv);

  if (!paths || !paths.length) {
    console.error('Missing prefix paths');
    return;
  }

  if (argv.verbose) {
    console.log('About to get ssm params', paths);
  }

  const [resultVarsOverEnv, resultNewVars] = await getParamsForPathArray(
    ssm,
    paths
  );

  if (argv.verbose) {
    console.log(resultNewVars);
  }

  const resultVars = argv.newEnv ? resultNewVars : resultVarsOverEnv;
  writeDotenv(resultVars);
}
