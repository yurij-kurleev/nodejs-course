const fsAsync = require('fs').promises;
const stream = require('stream');

const mapRowOnHeader = (rowString, headersString) => {
  const headers = headersString.split(',')
  const row = rowString.split(',')
  return headers.reduce((item, header, index) => {
    item[header] = row[index];
    return item;
  }, {})
}

const readFile = async (path) => {
  try {
    const buffer = await fsAsync.readFile(path);
    const rawData = buffer.toString()
      .split('\r\n');
    const headers = rawData.shift();
    return rawData.map((row) => mapRowOnHeader(row, headers))
  } catch (error) {
    throw error;
  }
}

const writeFile = async (items, path) => {
  try {
    const header = Object.keys(items[0]).join(',')
    const body = items.reduce((accumulator, current) => {
      accumulator += '\r\n' + Object.values(current).join(',')
      return accumulator;
    }, '');
    await fsAsync.writeFile(path, `${header}${body}`)
  } catch (error) {
    throw error;
  }
}

const mapRowOnHeaderTransformStream = new stream.Transform({
  transform(chunk, encoding, callback) {
    const rawHeader = 'id,title,description,location,timestamp';
    const chunkString = chunk
      .toString()
      .replace(rawHeader, '');
    // split each line and filter out empty lines
    const rows = chunkString
      .split('\r\n')
      .filter((row) => row);
    const events = rows.map((row) => mapRowOnHeader(row, rawHeader));
    callback(null, JSON.stringify(events));
  }
})

module.exports = {
  readFile,
  writeFile,
  mapRowOnHeaderTransformStream,
};
