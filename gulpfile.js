require('ts-node').register({ project: './gulp' });
const glob = require('glob');
const files = glob.sync('./gulp/tasks/*.ts');
files.forEach(require);