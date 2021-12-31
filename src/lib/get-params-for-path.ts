import * as AWS from 'aws-sdk';
import describeAllParameters from './describe-all-parameters';
import getParameterValues from './get-parameter-values';

export default async function getParamsForPath(
  ssm: AWS.SSM,
  path: string
): Promise<AWS.SSM.Parameter[]> {
  const requested = await describeAllParameters(ssm, [
    {
      Key: 'Name',
      Option: 'BeginsWith',
      Values: [path],
    },
  ]);

  const names = requested.map(r => r.Name);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return getParameterValues(ssm, names as any);
}
