// Allow JSON files to be imported
declare module '*.json' {
  const value: any;
  export default value;
}