const path = require("path");
const glob = require("glob");

module.exports = {
    getEntries: (entryPath, prefix = '') => {
        let entries = {};
        let files = glob.sync(entryPath);
        for (const fileFullPath of files) {
          let extension = path.extname(fileFullPath);
          let filename = path.basename(fileFullPath, extension);
          entries[prefix + filename] = fileFullPath;
        }
      
        return entries;
      }
}