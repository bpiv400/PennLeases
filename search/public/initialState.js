
const page = 1;
const searchResults = fetch('/results?p=1').
  then(res => return res.json());

export { page, searchResults }
