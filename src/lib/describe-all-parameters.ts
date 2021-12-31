import * as AWS from 'aws-sdk';

export default async function describeAllParameters(
  ssm: AWS.SSM,
  filters: AWS.SSM.ParameterStringFilterList
): Promise<AWS.SSM.ParameterMetadata[]> {
  let result = await ssm
    .describeParameters({
      ParameterFilters: filters,
    })
    .promise();

  if (result.NextToken) {
    let rset = result.Parameters?.slice();
    while (result.NextToken) {
      // eslint-disable-next-line no-await-in-loop
      result = await ssm
        .describeParameters({
          ParameterFilters: filters,
          NextToken: result.NextToken,
        })
        .promise();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rset = rset?.concat(result.Parameters!);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rset!;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result.Parameters!;
}
