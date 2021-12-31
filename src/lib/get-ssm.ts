import { SSM } from 'aws-sdk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getSsm(argv: any): SSM {
  if (argv.awsDefaultRegion && argv.awsAccessKeyId && argv.awsSecretAccessKey) {
    return new SSM({
      region: argv.awsDefaultRegion,
      accessKeyId: argv.awsAccessKeyId,
      secretAccessKey: argv.awsSecretAccessKey,
      sessionToken: argv.awsSessionToken,
      endpoint: argv.awsEndpoint || undefined,
    });
  }
  return new SSM({ region: argv.awsDefaultRegion });
}
