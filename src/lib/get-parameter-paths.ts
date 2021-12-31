// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getPaths(argv: any): any[] | null {
  const paths = argv.prefixPaths;

  if (!Array.isArray(paths)) {
    return null;
  }

  if (paths[0] === 'export') {
    paths.shift();
  }

  return paths;
}
