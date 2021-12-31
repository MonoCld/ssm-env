import * as AWS from 'aws-sdk';

export default async function getParameterValues(
  ssm: AWS.SSM,
  names: string[]
): Promise<AWS.SSM.Parameter[]> {
  let results: AWS.SSM.Parameter[] = [];
  for (let i = 0; i < names.length; i += 10) {
    // eslint-disable-next-line no-await-in-loop
    const response = await ssm
      .getParameters({
        Names: names.slice(i, i + 10),
        WithDecryption: true,
      })
      .promise();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    results = results.concat(response.Parameters!);
  }

  return results;
}
