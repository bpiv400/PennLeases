
const page = 1;

const searchResults = fetch('/results?pg=1&lim=20&ord=-1&srt=date').
  then(function(res) {
    return (res.json());
  });

  export { page, searchResults }
