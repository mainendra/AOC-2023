import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

const env = await load();
const session = env["SESSION"];

const day = Deno.args[0] || (new Date()).getDate();
const year = Deno.args[1] || (new Date()).getFullYear();

console.log(`Day: ${day}, Year: ${year}`);


const requestOptions = {
  method: 'GET',
  headers: new Headers({
    "Cookie": `session=${session}`
  })
};

const url = `https://adventofcode.com/${year}/day/${day}/input`;

console.log(url);

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => {
    Deno.writeTextFile("./input.txt", result);
  })
  .catch(error => console.log('error', error));
